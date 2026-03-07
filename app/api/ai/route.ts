import OpenAI from "openai";
import context from "@/lib/context";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});


export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing");
      return Response.json({ error: "API configuration error" }, { status: 500 });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: context },
        { role: "user", content: message },
      ],
    });

    const answer = completion.choices[0]?.message?.content;

    if (!answer) {
      console.error("No answer returned from AI");
      return Response.json({ error: "No response from AI" }, { status: 500 });
    }

    return Response.json({
      answer: answer,
    });
  } catch (error) {
    console.error("AI API Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}