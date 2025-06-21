# Mycelia

### pnpm Command List
- I like pnpm, the choice is yours, otherwise install with `npm i -g pnpm`
- To retrieve your pnpm commands, run `pnpm akio`, this is an `npm|pnpm|yarn` script package I wrote. [Read the docs here]()

### Run Local Server
- To run development locally `pnpm i && pnpm dev`

### Ollama LLM local model
- I'm using Ollama local models with the annoying bad, but lightweight `moondream` model
```bash
curl -fsSL https://ollama.com/install.sh | sh # install script
pnpm ollama:serve # start local server
```
##### Install `moondream`
```bash
ollama -v # verify it's working
pnpm ollama:moondream # install the moondream model, only needs run once
```
##### Stop the ollama server
```bash
pnpm ollama:stop # stop the ollama server
```
