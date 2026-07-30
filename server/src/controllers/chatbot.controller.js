import dotenv from "dotenv";

dotenv.config();

const PLATFORM_CONTEXT = `
Platform Routes:

- Home:
https://rail-madad-green.vercel.app/

- File Complaint:
https://rail-madad-green.vercel.app/file-complaint

- Track Complaint:
https://rail-madad-green.vercel.app/track

- FAQ:
https://rail-madad-green.vercel.app/faq

- Privacy Policy:
https://rail-madad-green.vercel.app/privacy-policy

- Profile:
https://rail-madad-green.vercel.app/profile
`;

export const handleChatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // VALIDATION
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const systemPrompt = `
You are Rail Sahayak,
an official Indian Railways digital assistant.

Your purpose is to help users with:
- railway grievance support
- complaint filing guidance
- complaint tracking help
- platform navigation
- FAQ assistance
- railway support information

${PLATFORM_CONTEXT}

IMPORTANT RULES:

1. Only answer railway/platform related questions.

2. If user wants to:
- file complaint
- track complaint
- open FAQ
- view profile

then guide them using the correct platform routes.

3. Keep responses:
- concise
- professional
- citizen-friendly

4. Always provide direct guidance.

5. Never generate fake URLs.

6. Never answer unrelated questions.

If user asks unrelated questions,
politely reply:
"I am Rail Sahayak and can assist only with railway grievance and platform-related queries."

7. Do not behave like a casual AI chatbot.

8. Keep answers short unless explanation is necessary.
`;

    const rawResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY_CHATBOT}`,

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",

          messages: [
            {
              role: "system",
              content: systemPrompt,
            },

            {
              role: "user",
              content: message,
            },
          ],

          temperature: 0.4,

          max_tokens: 300,
        }),
      }
    );

    const response = await rawResponse.json();

    console.log("AI RESPONSE:", response);

    // SAFE RESPONSE EXTRACTION
    const aiReply =
      response?.choices?.[0]?.message?.content;

    if (!aiReply) {
      throw new Error(
        "Invalid response from OpenRouter API."
      );
    }

    return res.status(200).json({
      success: true,

      reply: aiReply.trim(),
    });
  } catch (error) {
    console.error(
      "Chatbot Error:",
      error.message
    );

    return res.status(500).json({
      success: false,

      reply:
        "Sorry, Rail Sahayak is currently unavailable. Please try again later.",
    });
  }
};