document.getElementById("fetch-btn").addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  const container = document.getElementById("questions-container");
  container.innerHTML = ""; // Clear previous results

  if (!category) {
    alert("Please select a category!");
    return;
  }

  // Show loading shimmer effect
  showLoadingShimmer(container);

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: category }),
    });

    const data = await response.json();

    if (data.type === "error") {
      container.innerHTML = `<p class="text-red-500">${data.message}</p>`;
      return;
    }

    // Remove shimmer effect and display questions
    container.innerHTML = "";
    data.questions.forEach((qa, index) => {
      const questionNumber = index + 1;
      const questionElement = document.createElement("div");
      questionElement.classList.add("bg-gray-700", "rounded", "mb-3", "p-4");

      questionElement.innerHTML = `
        <div class="flex justify-between items-center cursor-pointer" onclick="toggleAnswer(${index})">
            <h3 class="text-lg font-semibold">${questionNumber}. ${qa.question}</h3>
            <span class="text-blue-400">[+]</span>
        </div>
        <p id="answer-${index}" class="hidden mt-2 text-gray-300"><strong>Answer:</strong> ${qa.answer}</p>
        <pre id="pseudocode-${index}" class="hidden bg-gray-800 p-3 mt-2 rounded text-gray-300 overflow-auto">
<strong>Pseudocode:</strong> 
${qa.pseudocode}
        </pre>
      `;

      container.appendChild(questionElement);
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    container.innerHTML = `<p class="text-red-500">Failed to load questions.</p>`;
  }
});

// Function to show shimmer effect while loading
function showLoadingShimmer(container) {
  for (let i = 0; i < 3; i++) {
    const shimmer = document.createElement("div");
    shimmer.classList.add(
      "bg-gray-800",
      "rounded",
      "p-4",
      "animate-pulse",
      "mb-3"
    );

    shimmer.innerHTML = `
      <div class="h-6 bg-gray-700 w-3/4 rounded mb-2"></div>
      <div class="h-4 bg-gray-700 w-full rounded"></div>
    `;

    container.appendChild(shimmer);
  }
}

// Function to toggle answer and pseudocode visibility
function toggleAnswer(index) {
  document.getElementById(`answer-${index}`).classList.toggle("hidden");
  document.getElementById(`pseudocode-${index}`).classList.toggle("hidden");
}
