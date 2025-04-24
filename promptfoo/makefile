API_KEY := <YOUR API KEY>

.PHONY: raw
.PHONY: json
.PHONY: simulation

raw:
	OPENAI_API_KEY=$(API_KEY) promptfoo eval -c raw.yaml

json:
	OPENAI_API_KEY=$(API_KEY) promptfoo eval -c json.yaml

simulation:
	OPENAI_API_KEY=$(API_KEY) promptfoo eval -c simulation.yaml