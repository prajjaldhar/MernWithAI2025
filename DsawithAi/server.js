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

// Allowed categories for question generation
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

// System Prompt for AI
const SYSTEM_PROMPT = `
You are an AI that generates coding and interview questions along with their answers.

Guidelines:
- If the user asks for a category, return a JSON object:
  {"type": "questions", "questions": [ {
   "question": "<Question>",
   "answer": "<Process to approach the answer>"
   }]
  }
- Provide exactly 15 unique question-answer pairs per request, mostly asked in interviews.
- Ensure questions are different for each request.
- If the query doesn't match any category, respond:
  {"type": "error", "message": "Invalid category"}

**Allowed Categories:**
- DSA questions in JAVA
- DSA questions in Python
- DSA questions in C++
- DSA questions in JavaScript
- DSA questions in C
- Interview Questions in JS
- Interview Questions of React
- Interview Questions of Express
- Interview Questions of MongoDB
`;

// AI Chat Endpoint
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
    {
      role: "user",
      parts: [{ text: JSON.stringify({ type: "user", user: query }) }],
    },
  ];

  try {
    const result = await model.generateContent({ contents: messages });

    let responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Raw AI Response:", responseText);

    // 🔹 Step 1: Remove Markdown-like formatting
    responseText = responseText.replace(/```json|```/g, "").trim();

    // 🔹 Step 2: Remove unwanted backticks and sanitize response
    responseText = responseText.replace(/`/g, '"');

    // 🔹 Step 3: Fix escaped newlines (\n, \t, \r)
    responseText = responseText
      .replace(/\\n/g, "")
      .replace(/\\t/g, "")
      .replace(/\r/g, "");

    // 🔹 Step 4: Fix problematic quotes inside JSON keys and values
    responseText = responseText.replace(
      /"\s*([a-zA-Z0-9_]+)\s*"\s*:\s*"([^"]*")/g,
      (_, key, value) => {
        return `"${key}": ${value.replace(/"/g, '\\"')}`;
      }
    );

    // 🔹 Step 5: Extract valid JSON string
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Invalid JSON response from AI:", responseText);
      return res
        .status(500)
        .json({ type: "error", message: "Invalid JSON response from AI." });
    }

    let jsonString = jsonMatch[0]
      .replace(/,(\s*])/g, "$1") // Removes extra commas before `]`
      .replace(/,(\s*})/g, "$1") // Removes extra commas before `}`
      .trim();

    console.log("Cleaned JSON Response:", jsonString); // Debugging

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonString);
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError.message);
      return res
        .status(500)
        .json({ type: "error", message: "AI response is not valid JSON." });
    }

    if (parsedResponse.type === "questions") {
      console.log("✅ Sending Questions with Answers:", parsedResponse);
      return res.json(parsedResponse);
    } else {
      console.error("Unexpected Response Format:", parsedResponse);
      return res
        .status(500)
        .json({ type: "error", message: "Unexpected AI response format." });
    }
  } catch (error) {
    console.error("Error processing AI response:", error);
    return res.status(500).json({
      type: "error",
      message: "Error processing AI response.",
      details: error.message,
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
