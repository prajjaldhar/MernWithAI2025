const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

async function generateFillerQuestions(topic, count) {
  const prompt = `
You are an MCQ quiz generator.

Generate exactly ${count} unique multiple-choice questions (MCQs) on the topic "${topic}". 

Each question must have:
- Exactly 4 options
- One correctAnswer that is among the options

Return ONLY a JSON like this:
{
  "questions": [
    {
      "question": "Your question?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    },
    ...
  ]
}
`;

  const messages = [{ role: "user", parts: [{ text: prompt }] }];
  try {
    const response = await model.generateContent({ contents: messages });
    const rawText =
      response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found from filler request");

    const data = JSON.parse(jsonMatch[0]);
    return data.questions || [];
  } catch (err) {
    console.error("❌ Filler generation failed:", err.message);
    return [];
  }
}

async function generateDynamicQuiz(topic, retries = 3) {
  const systemPrompt = `
You are an MCQ quiz generator API.

Return ONLY a single JSON object exactly in the following format. No markdown, no explanations, no extra text.

Topic: ${topic}

Output JSON format:

{
  "type": "mcq",
  "questions": [
    {
      "question": "Sample question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A"
    },
    ...
  ]
}

Rules:
- Generate exactly 30 multiple-choice questions on the topic "${topic}".
- Each question must have exactly 4 options.
- The correctAnswer must be one of the options exactly.
- Output ONLY the JSON, no markdown or other text.
- Escape any double quotes using backslash \\".
- Count exactly 30 questions before final response.
`;

  const messages = [
    {
      role: "user",
      parts: [{ text: systemPrompt + "\nGenerate the MCQs now." }],
    },
  ];

  let lastValidQuestions = [];

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await model.generateContent({ contents: messages });
      const rawText =
        response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleanedText = rawText.replace(/```json|```/g, "").trim();
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON object found in response.");

      const quizData = JSON.parse(jsonMatch[0]);

      if (quizData.type === "mcq" && Array.isArray(quizData.questions)) {
        const count = quizData.questions.length;

        if (count === 30) return quizData;

        if (count >= 25 && count < 30) {
          const missing = 30 - count;
          console.warn(
            `⚠️ Only ${count} questions. Asking Gemini for ${missing} filler questions...`
          );
          const fillerQuestions = await generateFillerQuestions(topic, missing);
          quizData.questions = [...quizData.questions, ...fillerQuestions];
          return quizData;
        }

        if (count > lastValidQuestions.length) {
          lastValidQuestions = quizData.questions;
        }

        throw new Error(`Only ${count} questions`);
      } else {
        throw new Error("Invalid quiz structure.");
      }
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error.message);

      if (attempt === retries) {
        if (lastValidQuestions.length >= 25) {
          const missing = 30 - lastValidQuestions.length;
          console.warn(
            `⚠️ Final fallback with ${lastValidQuestions.length} valid. Asking Gemini for ${missing} more...`
          );
          const fillerQuestions = await generateFillerQuestions(topic, missing);
          return {
            type: "mcq",
            questions: [...lastValidQuestions, ...fillerQuestions],
          };
        } else {
          throw new Error("Quiz generation failed: fewer than 25 questions.");
        }
      }
    }
  }
}

app.post("/quiz", async (req, res) => {
  const { prompt } = req.body;
  console.log("📢 Received prompt:", prompt);

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      type: "error",
      message: "Prompt is required and must be a string.",
    });
  }

  try {
    const quiz = await generateDynamicQuiz(prompt);
    console.log("✅ Quiz generated successfully.");
    res.json(quiz);
  } catch (err) {
    console.error("❌ Quiz generation failed:", err.message);
    res.status(500).json({
      type: "error",
      message: "Quiz generation failed.",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
