const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.use(express.json());
app.use(cors());

const QUESTION_CATEGORIES = [
  "DSA questions in JAVA",
  "DSA questions in Python",
  "DSA questions in C++",
  "DSA questions in JavaScript",
  "DSA questions in C",
  "Interview Questions in JS",
  "Interview Questions of React",
  "Interview Questions of Node",
  "Interview Questions of Express",
  "Interview Questions of MongoDB",
];

const SYSTEM_PROMPT = `
You are an AI that generates coding and interview questions along with their answers.

Guidelines:
- If the user asks for a category, return a JSON object:
  {
    "type": "questions",
    "questions": [
      {
        "question": "<Question>",
        "answer": "<Answer>",
        "pseudocode": "<Geeks for Geeks reference link>"
      }
    ]
  }
- Provide exactly 15 unique question-answer pairs per request.
- All output must be strictly valid JSON.
- If the query doesn't match any category, respond:
  {"type": "error", "message": "Invalid category"}

**Allowed Categories:**
${QUESTION_CATEGORIES.join("\n")}
`;

app.post("/chat", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res
      .status(400)
      .json({ type: "error", message: "Query is required." });
  }

  if (!QUESTION_CATEGORIES.includes(query)) {
    return res.json({
      type: "error",
      message: "Invalid category. Choose a valid category.",
    });
  }

  const messages = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "user", parts: [{ text: JSON.stringify({ category: query }) }] },
  ];

  try {
    const result = await model.generateContent({ contents: messages });

    let responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🧹 Step 1: Remove markdown blocks and backticks
    responseText = responseText.replace(/```json|```/g, "").trim();
    responseText = responseText.replace(/\\n/g, "").replace(/\r/g, "");

    // 🧹 Step 2: Try to extract JSON using regex
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({
        type: "error",
        message: "Invalid JSON response from AI.",
        raw: responseText,
      });
    }

    let jsonString = jsonMatch[0]
      .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      return res.status(500).json({
        type: "error",
        message: "JSON parsing failed.",
        raw: jsonString,
      });
    }
    console.log(parsed);
    if (parsed.type === "questions") {
      return res.json(parsed);
    } else {
      return res.status(500).json({
        type: "error",
        message: "Unexpected AI response structure.",
        raw: parsed,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      type: "error",
      message: "Failed to generate content.",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
