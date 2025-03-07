const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" })); // Allow all origins

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const genai = new GoogleGenerativeAI("AIzaSyDuzpbFP8szmeOe0NPU98oepvGe74zmRiE");

app.post("/generate-advice", async (req, res) => {
  try {
    const { bmi } = req.body;
    const model = genai.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `My BMI is ${bmi}. Provide a structured JSON response with these keys:
    - best_exercise: Suggest the best exercise based on my BMI.
    - best_nutrients: List key nutrients beneficial for my BMI.
    - diet_chart_plan: Provide a simple diet plan.
    - goal_setting: Suggest a 30-day challenge to improve my health.
    - sleep_recommendation: Provide the ideal sleep duration and recovery tips.
    - common_health_risks: List potential health risks and prevention tips for my BMI category.
    - caloric_intake: Suggest an ideal daily caloric intake.
    - fitness_apps: Recommend the best apps for tracking diet and exercise with pros and cons.
    - stress_management: Provide mindfulness or relaxation techniques.
    - Lifestyle & Habits Enhancements:Suggest an ideal morning and night routine to support my health and fitness goals.Daily Activity Recommendation.
    - Books & Podcasts for Health Improvement:List top 3 books and top 3 podcasts that can help me improve my fitness and well-being.
    - best_motivational_quotes: Give a motivational quote to keep me inspired.
    
    Ensure the response is strictly in JSON format without extra text, markdown, or formatting.`;

    const result = await model.generateContent(prompt);

    // Debugging logs to check response structure
    console.log("Raw API Response:", JSON.stringify(result, null, 2));

    let responseText;

    // Check where the response is located
    if (result.candidates && result.candidates[0]?.content?.parts) {
      responseText = result.candidates[0].content.parts[0].text;
    } else if (result.response && typeof result.response.text === "function") {
      responseText = result.response.text();
    } else {
      throw new Error("Unexpected API response format.");
    }

    console.log("Extracted Response Text:", responseText);

    // ✅ Remove Markdown formatting (if present)
    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const structuredData = JSON.parse(responseText);
      console.log(structuredData);
      res.json(structuredData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({
        error: "Invalid JSON response from AI.",
        rawResponse: responseText,
      });
    }
  } catch (error) {
    console.error("Error generating advice:", error);
    res.status(500).json({ error: "Failed to generate advice." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
