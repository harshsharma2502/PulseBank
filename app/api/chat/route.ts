import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Format conversation history for Gemini
    const contents = [
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ]

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [
              {
                text: `You are Pulse Bot, an AI assistant for Pulse Bank - a blood donation platform. You are friendly, helpful, and knowledgeable about:
              
1. Blood donation guidelines and eligibility
2. Blood type compatibility
3. Hospital services and blood inventory management
4. Blood donation frequency and health precautions
5. Donor motivation and impact stories
6. Location-based blood donor matching
7. Emergency blood requests
8. General health and safety information

Always provide accurate, helpful information. Be empathetic when discussing health concerns. Encourage blood donation as a life-saving act. Keep responses concise and clear.`,
              },
            ],
          },
        }),
      },
    )

    const data = await response.json()

    // Extract text from Gemini response
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
