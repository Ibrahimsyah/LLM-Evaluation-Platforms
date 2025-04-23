API_KEY := <YOUR API KEY>

.PHONY: raw
.PHONY: json

raw:
	OPENAI_API_KEY=$(API_KEY) promptfoo eval -c raw.yaml

json:
	OPENAI_API_KEY=$(API_KEY) promptfoo eval -c json.yaml