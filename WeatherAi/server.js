const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.use(express.json());
app.use(cors()); // Enable CORS for frontend usage

// Weather Data
const weatherData = {
  mohali: "14°C",
  bangalore: "20°C",
  chandigarh: "8°C",
  delhi: "12°C",
  patiala: "10°C",
};

// Function to get weather details
function getWeatherDetails(city) {
  return weatherData[city.toLowerCase()] || "Weather data not available";
}

// Rate Limiting Variables
const REQUEST_LIMIT = 3; // Max requests per minute
const REQUEST_INTERVAL = 60000; // 60 seconds
let requestCount = 0;
let lastRequestTime = Date.now();

// Middleware to enforce rate limiting
async function enforceRateLimit(req, res, next) {
  const now = Date.now();
  if (requestCount >= REQUEST_LIMIT) {
    const timePassed = now - lastRequestTime;
    if (timePassed < REQUEST_INTERVAL) {
      return res.status(429).json({
        type: "error",
        message: `Rate limit reached! Try again in ${
          (REQUEST_INTERVAL - timePassed) / 1000
        } seconds.`,
      });
    }
    requestCount = 0; // Reset counter
  }
  lastRequestTime = now;
  requestCount++;
  next();
}

// System Prompt for AI
const SYSTEM_PROMPT = `You are an AI Assistant that follows a structured approach:
1. If the user asks about the weather, use the available tool.
2. If the user asks about anything else, respond normally.

Available Tools:
- function getWeatherDetails(city: string): string
  - Accepts a city name and returns the weather.

Guidelines:
- If the query is related to weather, respond with:
  {"type": "action", "function": "getWeatherDetails", "input": "<city>"}.
- If the query is **not** related to weather, respond with:
  {"type": "response", "response": "<your message>"}. 

**Always return responses in JSON format.**`;

// AI Chat Endpoint
app.post("/chat", enforceRateLimit, async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res
      .status(400)
      .json({ type: "error", message: "Query is required." });
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
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Ensure JSON format consistency
    responseText = responseText.replace(/```json|```/g, "").trim();
    const jsonMatch = responseText.match(/\{[\s\S]*?\}/);

    if (!jsonMatch) {
      console.log("Invalid JSON response from AI:", responseText);
      return res
        .status(500)
        .json({ type: "error", message: "Invalid JSON response from AI." });
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    if (parsedResponse.type === "response") {
      console.log("Sending response:", parsedResponse);
      return res.json(parsedResponse);
    } else if (
      parsedResponse.type === "action" &&
      parsedResponse.function === "getWeatherDetails"
    ) {
      const cities = parsedResponse.input
        .toLowerCase()
        .split(",")
        .map((city) => city.trim());
      const weatherResults = cities.map((city) => ({
        city,
        weather: getWeatherDetails(city),
      }));
      console.log("Weather Data Sent:", weatherResults);
      return res.json({ type: "weather", data: weatherResults });
    } else {
      console.log("Unexpected response format:", parsedResponse);
      return res
        .status(500)
        .json({ type: "error", message: "Unexpected response format." });
    }
  } catch (error) {
    console.log("Error processing AI response:", error);
    if (error.status === 429) {
      return res.status(429).json({
        type: "error",
        message: "Too many requests! Try again later.",
      });
    }
    return res.status(500).json({
      type: "error",
      message: "Error processing AI response.",
      details: error.message,
    });
  }
});

// Weather API Endpoint
app.get("/weather", (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res
      .status(400)
      .json({ type: "error", message: "City is required." });
  }

  const weather = getWeatherDetails(city);
  res.json({ type: "weather", city, weather });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
