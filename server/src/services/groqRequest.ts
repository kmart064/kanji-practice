import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqPassage(prompt: string): Promise<string> {
  const chatResponse = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 2,
  });

  return (
    chatResponse.choices[0]?.message?.content ||
    "Error. Could not generate passage."
  );
}
