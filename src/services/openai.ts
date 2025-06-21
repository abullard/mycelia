import OpenAI from "openai";
const client = new OpenAI();

// TODO AJB 06/21/2025: need to get the API key in here, its in your env vars
export const PromptAndRespond = async (prompt: string): Promise<string> => {
    const response = await client.responses.create({
        model: "gpt-4.1",
        input: prompt
    });
    
    return response.output_text;
};
