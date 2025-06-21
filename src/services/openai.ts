"use server";

import { Ollama } from 'ollama';

export const PromptAndRespond = async (prompt: string): Promise<string> => {
    const ollamaUrl = 'http://127.0.0.1:11434';
    const ollama = new Ollama({ host: ollamaUrl })

    const payload = {
        model: 'moondream',
        messages: [{ role: 'user', content: prompt }]
    };

    const response = await ollama.chat(payload);

    return response.message.content;
};
