import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessage {
  sender: "Human" | "Bot";
  text: string;
}

interface TokenUsage {
  bot: number;
  human: number;
  judge: number;
}

const LLMmodel = "gpt-4o-mini";

const callLLM = async (
  messages: Message[],
  systemPrompt: string,
  apiKey: string,
  model: string = LLMmodel
): Promise<{ content: string; usage: { total_tokens: number } }> => {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });

  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    usage: data.usage,
  };
};

function App() {
  const [chatbotPrompt, setChatbotPrompt] = useState<string>(
    `You are a helpful chatbot of a 4-stars hotel. Your job is to interact with human to provide relevant information they are looking for.
    You dont need to give long answer as human might not absorb all of that, just summarize your answer
    `
  );
  const [humanPrompt, setHumanPrompt] = useState<string>(
    `You are a tourist looking to book a hotel. Your job is to interact as a human traveler — not as a chatbot or assistant. Do not offer help or behave like an assistant.
    If the hotel chatbot asks a clarifying question (e.g., about your dates or preferences), respond briefly as a human would.
  `
  );
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_OPENAI_API_KEY
  );
  const [numTurns, setNumTurns] = useState<number>(3);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [rawMessages, setRawMessages] = useState<Message[]>([]);
  const [tokenUsage, setTokenUsage] = useState<TokenUsage>({
    bot: 0,
    human: 0,
    judge: 0,
  });
  const [judgeResult, setJudgeResult] = useState<string>("");
  const [running, setRunning] = useState<boolean>(false);

  const runSimulation = async () => {
    setConversation([]);
    setTokenUsage({ bot: 0, human: 0, judge: 0 });
    setRawMessages([]);
    setJudgeResult("");
    setRunning(true);

    const messages: Message[] = [];
    const logs: Message[] = [];
    let botTokens = 0;
    let humanTokens = 0;

    for (let i = 0; i < numTurns; i++) {
      const botRes = await callLLM(messages, chatbotPrompt, apiKey);
      const botMsg: Message = { role: "assistant", content: botRes.content };
      messages.push(botMsg);
      logs.push(botMsg);
      botTokens += botRes.usage.total_tokens;
      setConversation((prev) => [
        ...prev,
        { sender: "Bot", text: botMsg.content },
      ]);

      const humanRes = await callLLM(messages, humanPrompt, apiKey);
      const userMsg: Message = { role: "user", content: humanRes.content };
      messages.push(userMsg);
      logs.push(userMsg);
      humanTokens += humanRes.usage.total_tokens;
      setConversation((prev) => [
        ...prev,
        { sender: "Human", text: userMsg.content },
      ]);
    }

    setRawMessages(logs);
    setTokenUsage((prev) => ({ ...prev, bot: botTokens, human: humanTokens }));

    // Call Judge after the conversation is done
    const judgePrompt = `
    LLM CHAT LOGS
    ${logs}

    You are a strict evaluator. Read the entire conversation carefully and determine whether the assistant's responses contain any hallucinations — false, made-up, or confidently incorrect statements.
    IF it is not hallucinate, simply answer NO HALLUCINATE.
    BUT if it is, explain in detail your analysis.
    `;
    const judgeRes = await callLLM([], judgePrompt, apiKey);
    setJudgeResult(judgeRes.content);
    setTokenUsage((prev) => ({ ...prev, judge: judgeRes.usage.total_tokens }));

    setRunning(false);
  };

  const downloadLogs = () => {
    const blob = new Blob([JSON.stringify(rawMessages, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "conversation.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🤖 LLM Chatbot Simulation + Evaluation
      </h2>

      <label>🔑 OpenAI Key</label>
      <textarea
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        rows={2}
        style={{ width: "100%" }}
      />

      <label>🧑 Human Prompt</label>
      <textarea
        value={humanPrompt}
        onChange={(e) => setHumanPrompt(e.target.value)}
        rows={2}
        style={{ width: "100%" }}
      />

      <label>🤖 Chatbot Prompt</label>
      <textarea
        value={chatbotPrompt}
        onChange={(e) => setChatbotPrompt(e.target.value)}
        rows={2}
        style={{ width: "100%" }}
      />

      <label>🔁 Number of Turns</label>
      <input
        type="number"
        value={numTurns}
        min={1}
        max={20}
        onChange={(e) => setNumTurns(Number(e.target.value))}
      />

      <br />
      <br />
      <button disabled={running} onClick={runSimulation}>
        Run Simulation
      </button>
      <button onClick={downloadLogs} disabled={rawMessages.length === 0}>
        Download Logs
      </button>

      <div>
        <h3>📊 Token Usage</h3>
        <div>Bot: {tokenUsage.bot}</div>
        <div>Human: {tokenUsage.human}</div>
        <div>Judge: {tokenUsage.judge}</div>
      </div>

      <div>
        <h3>🧪 Auto-Evaluation</h3>
        <div
          style={{
            background: "#f0f0f0",
            padding: "0.5rem",
            borderRadius: "6px",
          }}
        >
          {judgeResult}
        </div>
      </div>

      <div>
        <h3>🗨️ Conversation</h3>
        <div
          style={{
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          {conversation.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === "Human" ? "right" : "left",
                margin: "1rem 0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: msg.sender === "Human" ? "#d1e7dd" : "#e2e3e5",
                  padding: "0.75rem 1rem",
                  borderRadius: "16px",
                  maxWidth: "60%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
