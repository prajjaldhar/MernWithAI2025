const readlineSync = require("readline-sync");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Function to get weather details
function getWeatherDetails(city) {
  city = city.toLowerCase();
  const weatherData = {
    mohali: "14°C",
    bangalore: "20°C",
    chandigarh: "8°C",
    delhi: "12°C",
    patiala: "10°C",
  };
  return weatherData[city] || "Weather data not available";
}

// Function to delay execution (for rate limiting)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Rate limiter variables
const REQUEST_LIMIT = 3; // Max requests per minute
const REQUEST_INTERVAL = 60000; // 60 seconds
let requestCount = 0;
let lastRequestTime = Date.now();

// Function to enforce rate limiting
async function enforceRateLimit() {
  const now = Date.now();
  if (requestCount >= REQUEST_LIMIT) {
    const timePassed = now - lastRequestTime;
    if (timePassed < REQUEST_INTERVAL) {
      const waitTime = REQUEST_INTERVAL - timePassed;
      console.log(
        JSON.stringify({
          type: "error",
          message: `Rate limit reached! Waiting ${waitTime / 1000} seconds...`,
        })
      );
      await delay(waitTime);
    }
    requestCount = 0; // Reset counter after waiting
  }
  lastRequestTime = Date.now();
  requestCount++;
}

// **Updated System Prompt**
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

async function chat() {
  const messages = [{ role: "user", parts: [{ text: SYSTEM_PROMPT }] }];

  while (true) {
    const query = readlineSync.question(">>> ");
    messages.push({
      role: "user",
      parts: [{ text: JSON.stringify({ type: "user", user: query }) }],
    });

    await enforceRateLimit(); // Ensure rate limit before making API call

    try {
      const result = await model.generateContent({ contents: messages });

      let responseText =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        console.log(
          JSON.stringify({
            type: "error",
            message: "AI did not return a response.",
          })
        );
        continue;
      }

      // Ensure JSON format consistency
      responseText = responseText.replace(/```json|```/g, "").trim();
      const jsonMatch = responseText.match(/\{[\s\S]*?\}/);

      if (!jsonMatch) {
        console.log(
          JSON.stringify({
            type: "error",
            message: "Invalid JSON response from AI.",
          })
        );
        continue;
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);

      if (parsedResponse.type === "response") {
        console.log(JSON.stringify(parsedResponse));
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

        console.log(JSON.stringify({ type: "weather", data: weatherResults }));
      } else {
        console.log(
          JSON.stringify({
            type: "error",
            message: "Unexpected response format.",
          })
        );
      }
    } catch (error) {
      if (error.status === 429) {
        console.log(
          JSON.stringify({
            type: "error",
            message: "Too many requests! Retrying in 10 seconds...",
          })
        );
        await delay(10000);
        continue; // Retry the request
      }
      console.log(
        JSON.stringify({
          type: "error",
          message: "Error parsing AI response.",
          details: error.message,
        })
      );
    }
  }
}

chat();
