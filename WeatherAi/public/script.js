const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const theme = document.getElementById("theme");

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  userInput.value = "";

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: message }),
    });

    const data = await response.json();
    if (data.type === "weather") {
      appendMessage(
        "Bot",
        `Weather: ${data.data.map((w) => `${w.city}: ${w.weather}`).join(", ")}`
      );
    } else {
      appendMessage("Bot", data.response || "Sorry, I didn't understand that.");
    }
  } catch (error) {
    appendMessage("Bot", "Error connecting to server.");
  }
}

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(
    "p-2",
    "rounded-lg",
    "mb-2",
    sender === "You" ? "bg-blue-700" : "bg-yellow-700"
  );
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function toggleTheme() {
  if (theme.classList.contains("bg-slate-900")) {
    // Switch to light theme
    theme.classList.replace("bg-slate-900", "bg-white");
    theme.classList.replace("text-white", "text-black");

    document
      .querySelector(".max-w-lg")
      .classList.replace("bg-slate-800", "bg-gray-200");
    document
      .getElementById("chatbox")
      .classList.replace("bg-slate-700", "bg-gray-100");
    document
      .getElementById("userInput")
      .classList.replace("bg-slate-700", "bg-gray-100");
    document
      .getElementById("userInput")
      .classList.replace("border-slate-600", "border-gray-400");
  } else {
    // Switch to dark theme
    theme.classList.replace("bg-white", "bg-slate-900");
    theme.classList.replace("text-black", "text-white");

    document
      .querySelector(".max-w-lg")
      .classList.replace("bg-gray-200", "bg-slate-800");
    document
      .getElementById("chatbox")
      .classList.replace("bg-gray-100", "bg-slate-700");
    document
      .getElementById("userInput")
      .classList.replace("bg-gray-100", "bg-slate-700");
    document
      .getElementById("userInput")
      .classList.replace("border-gray-400", "border-slate-600");
  }
}
