# LLM Evaluation Platform Research

## Goals
This research is conducted to analyze and compare some AI platforms for evaluating LLM prompt. The main focus is to find which platform has more ability to evaluate a LLM or prompt.

## Methodology
The research will be conducted by supplying a predefined prompt to each platform. We then give some inputs to it and check the result. We also define some answers as the groundtruth to the platform so it can compare and evaluate the result.

**Prompt**
```
Summarize the following article in exactly 3 concise bullet points, focusing only on the most important takeaways
Article:
{{input}}
```

**Input #1**

OpenAI released GPT-4, the next-generation language model, capable of multimodal input, including image understanding. It significantly improves reasoning and creativity in tasks such as coding, summarization, and language translation. The model is now accessible via ChatGPT Plus and API waitlist

**Output #1**

- OpenAI released GPT-4 with support for multimodal input, including image understanding.
- The model offers improved reasoning and creativity in various tasks like coding and translation.
- GPT-4 is available through ChatGPT Plus and the API waitlist.

**Input #2**

A new study shows that consistent 7–8 hours of sleep can reduce the risk of heart disease by up to 30%. Researchers analyzed over 100,000 participants across a decade. They emphasize that quality sleep should be considered as vital as exercise and diet.


**Output #2**

- Consistent 7–8 hours of sleep can reduce heart disease risk by up to 30%.
- The study analyzed data from over 100,000 participants over a decade.
- Sleep is highlighted as equally important as diet and exercise for heart health.


**Input #3**

Tesla reported record-breaking revenue in Q1 2025, driven by strong demand for its Model Y and expansion into the Southeast Asian market. However, profit margins dipped slightly due to rising material costs. Investors remain optimistic, citing Tesla's upcoming battery tech as a long-term growth factor.

**Output #3**

- Tesla reported record Q1 2025 revenue driven by Model Y and Southeast Asia growth.
- Profit margins slightly declined due to rising material costs.
- Investors are optimistic about Tesla’s future battery technology.

**Input #4**

PEKAN lalu, publik diramaikan berita sekitar 700 CPNS dosen yang mengundurkan diri. Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi, Rini Widyantini mengatakan, alasan pengunduran diri tersebut salah satunya karena ketidaksesuaian penempatan atau penugasan. Menurut Rini, seharusnya CPNS siap ditempatkan di mana saja di seluruh Indonesia. Fenomena pengunduran diri CPNS dosen tentunya perlu disikapi dengan bijak oleh pemerintah, yang tidak hanya sekadar “menyalahkan” pelamar karena tidak siap ditempatkan di mana saja. Pemerintah perlu melakukan evaluasi manajemen ASN secara menyeluruh, baik dari segi kebijakan rekrutmen, manajemen karier, maupun manajemen talenta.

**Output #4**

- Sekitar 700 CPNS dosen mengundurkan diri karena ketidaksesuaian penempatan atau penugasan.
- Pemerintah menekankan pentingnya kesiapan CPNS untuk ditempatkan di seluruh Indonesia.
- Fenomena ini mendorong evaluasi menyeluruh terhadap manajemen ASN, termasuk rekrutmen dan pengelolaan talenta.