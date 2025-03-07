document.getElementById("calculate").addEventListener("click", calculateBMI);

async function generateAdvice(bmi) {
  try {
    const response = await fetch("http://localhost:3000/generate-advice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bmi }),
    });

    if (!response.ok) throw new Error("Failed to fetch advice.");

    const data = await response.json();
    console.log("AI Response:", data);

    return `
  <div class="flex flex-wrap items-center justify-center min-h-screen bg-gray-900 p-6">
    <!-- Best Exercise -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-red-500/40 rounded-xl shadow-lg shadow-red-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-red-400 drop-shadow-lg">🏋️‍♂️ Best Exercise</h2>
      <p class="text-gray-200 mt-2">${data.best_exercise || "Not Available"}</p>
    </div>

    <!-- Best Nutrients -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-green-500/40 rounded-xl shadow-lg shadow-green-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-green-400 drop-shadow-lg">🥗 Best Nutrients</h2>
      <p class="text-gray-200 mt-2">${
        Array.isArray(data.best_nutrients)
          ? data.best_nutrients.join(", ")
          : "Not Available"
      }</p>
    </div>

    <!-- Diet Chart Plan -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-yellow-500/40 rounded-xl shadow-lg shadow-yellow-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-yellow-400 drop-shadow-lg">🍽 Diet Plan</h2>
      <p class="text-gray-200 mt-2"><strong>Breakfast:</strong> ${
        data.diet_chart_plan?.breakfast || "Not Available"
      }</p>
      <p class="text-gray-200 mt-2"><strong>Lunch:</strong> ${
        data.diet_chart_plan?.lunch || "Not Available"
      }</p>
      <p class="text-gray-200 mt-2"><strong>Dinner:</strong> ${
        data.diet_chart_plan?.dinner || "Not Available"
      }</p>
      <p class="text-gray-200 mt-2"><strong>Snacks:</strong> ${
        data.diet_chart_plan?.snacks || "Not Available"
      }</p>
    </div>

    <!-- Goal Setting -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-blue-500/40 rounded-xl shadow-lg shadow-blue-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-blue-400 drop-shadow-lg">🎯 Goal Setting</h2>
      <p class="text-gray-200 mt-2">${data.goal_setting || "Not Available"}</p>
    </div>

    <!-- Sleep Recommendation -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-indigo-500/40 rounded-xl shadow-lg shadow-indigo-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-indigo-400 drop-shadow-lg">💤 Sleep Recommendation</h2>
      <p class="text-gray-200 mt-2"><strong>Duration:</strong> ${
        data.sleep_recommendation?.duration || "Not Available"
      }</p>
      <p class="text-gray-200 mt-2"><strong>Tips:</strong> ${
        data.sleep_recommendation?.recovery_tips?.join(", ") || "Not Available"
      }</p>
    </div>

    <!-- Common Health Risks -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-pink-500/40 rounded-xl shadow-lg shadow-pink-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-pink-400 drop-shadow-lg">⚠️ Health Risks</h2>
      <p class="text-gray-200 mt-2"><strong>Risks:</strong> ${
        data.common_health_risks?.risks?.join(", ") || "Not Available"
      }</p>
      <p class="text-gray-200 mt-2"><strong>Prevention:</strong> ${
        data.common_health_risks?.prevention_tips?.join(", ") || "Not Available"
      }</p>
    </div>

    <!-- Caloric Intake -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-cyan-500/40 rounded-xl shadow-lg shadow-cyan-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-cyan-400 drop-shadow-lg">🔥 Caloric Intake</h2>
      <p class="text-gray-200 mt-2">${
        data.caloric_intake || "Not Available"
      }</p>
    </div>

    <!-- Stress Management -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-teal-500/40 rounded-xl shadow-lg shadow-teal-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-teal-400 drop-shadow-lg">🧘 Stress Management</h2>
      <p class="text-gray-200 mt-2">${
        Array.isArray(data.stress_management)
          ? data.stress_management.join(", ")
          : "Not Available"
      }</p>
    </div>

    <!-- Lifestyle & Habits Enhancements -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-orange-500/40 rounded-xl shadow-lg shadow-orange-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-orange-400 drop-shadow-lg">🌅 Lifestyle & Habits</h2>
      <p class="text-gray-200 mt-2"><strong>Morning Routine:</strong> ${
        data["Lifestyle & Habits Enhancements"]?.morning_routine?.join(", ") ||
        "Not Available"
      }</p>
      <p class="text-gray-200 mt-2"><strong>Night Routine:</strong> ${
        data["Lifestyle & Habits Enhancements"]?.night_routine?.join(", ") ||
        "Not Available"
      }</p>
      <p class="text-gray-200 mt-2"><strong>Daily Activity:</strong> ${
        data["Lifestyle & Habits Enhancements"]?.daily_activity ||
        "Not Available"
      }</p>
    </div>

    <!-- Motivational Quote -->
    <div class="backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white/10 border border-purple-500/40 rounded-xl shadow-lg shadow-purple-500/30 p-6 m-4 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-purple-400 drop-shadow-lg">💡 Motivational Quote</h2>
      <p class="italic text-gray-200 mt-2">"${
        data.best_motivational_quotes || "Stay positive and keep going!"
      }"</p>
    </div>
  </div>
`;
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "<span class='text-red-500'>Error fetching health advice. Please try again later.</span>";
  }
}

async function calculateBMI() {
  let height = parseFloat(document.getElementById("height").value);
  let weight = parseFloat(document.getElementById("weight").value);
  let result = document.getElementById("result");
  let adviceDiv = document.getElementById("advice");

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    result.innerHTML = "❌ Please enter valid height and weight!";
    result.className = "text-red-500 font-semibold";
    return;
  }

  let bmi = (weight / (height / 100) ** 2).toFixed(1);
  let status = "";
  let color = "";

  if (bmi < 18.5) {
    status = "Underweight 😔";
    color = "text-yellow-400";
  } else if (bmi < 24.9) {
    status = "Normal Weight 😊";
    color = "text-green-400";
  } else if (bmi < 29.9) {
    status = "Overweight 😟";
    color = "text-orange-400";
  } else {
    status = "Obese 😨";
    color = "text-red-400";
  }

  result.innerHTML = `Your BMI is <strong>${bmi}</strong> <br> Status: <strong>${status}</strong>`;
  result.className = `${color} font-semibold`;

  // Show loading message
  adviceDiv.innerHTML =
    "<div class='block text-blue-500'>⏳ Generating personalized advice...</div>";

  // Fetch advice and update UI
  let advice = await generateAdvice(bmi);
  adviceDiv.innerHTML = `<strong class="text-5xl">Health Tips:</strong><br>${advice}`;
}
