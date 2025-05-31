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
    origin: "http://localhost:5173", // replace with your frontend URL/port
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

const SYSTEM_PROMPT = `
You are an MCQ quiz generator API.

Respond ONLY in **valid JSON format**, no markdown or explanation.

You must output strictly in this JSON format

Example output format:

{
  "type": "mcq",
  "questions": [
    {
      "question": "What is JavaScript?",
      "options": ["A programming language", "A database", "A web server", "An OS"],
      "correctAnswer": "A programming language"
    }
  ]
}

Rules:
- Generate exactly 30 MCQ questions.
- Each must include: question, 4 options, correctAnswer.
- correctAnswer must match one of the options exactly.
- NO explanations or markdown.
- Only valid JSON response.
- The "correctAnswer" must match one of the 4 options exactly.
- NO explanations, markdown, comments, or extra text.
- Output pure JSON only — no code blocks, no markdown.
`;

const generateDynamicQuiz = async (userPrompt) => {
  const messages = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "user", parts: [{ text: userPrompt }] },
  ];

  try {
    const result = await model.generateContent({ contents: messages });
    let raw = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    raw = raw.replace(/```json|```/g, "").trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON content found.");

    const parsed = JSON.parse(jsonMatch[0]);

    if (
      parsed.type === "mcq" &&
      Array.isArray(parsed.questions) &&
      parsed.questions.length === 30
    ) {
      console.log(parsed);
      return parsed;
    } else {
      throw new Error("Invalid structure or incomplete data");
    }
  } catch (error) {
    throw new Error("Failed to generate quiz: " + error.message);
  }
};

// POST endpoint to dynamically generate quiz
app.post("/quiz", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ type: "error", message: "Prompt is required as a string." });
  }

  try {
    const quiz = await generateDynamicQuiz(prompt);
    console.log("quiz questions:", JSON.stringify(quiz.questions, null, 2));
    res.json(quiz);
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Quiz generation failed.",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
