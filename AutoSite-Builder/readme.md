```markdown
# ✨ Gemini File Generator (Node.js + ESM)

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-blue)

🚀 This project demonstrates how to use **Google Gemini API** to automatically generate **HTML + CSS + JavaScript** files in a strict response format.

The script:

1. 📝 Defines a **system prompt** that instructs Gemini to reply with structured sections:  
   `START → THINK → OBSERVE → ACTION → OUTPUT`
2. 🤖 Sends the user’s request to Gemini and gets a **well-structured code response**.
3. 💾 Parses the output to extract two files:
   - `index.html` (with internal CSS for design)
   - `script.js` (with runnable JS code)
4. 📂 Saves the files locally and provides run instructions.

---

## 📸 Demo Workflow
```

System Prompt ➝ Gemini ➝ Structured Output ➝ Extract HTML/JS ➝ Save Files

```

- **Input**: "Create a small, beginner-friendly web page that explains what ReactJS is and includes a button toggle demo."
- **Output**: Beautiful `index.html` + `script.js` files generated automatically.

---

## ⚡ Features

- ✅ Structured prompt format with **START, THINK, OBSERVE, ACTION, OUTPUT**
- ✅ Auto-parses Gemini’s output to extract **HTML** and **JavaScript**
- ✅ Saves files directly to your project folder
- ✅ Internal CSS for **clean design** 🎨
- ✅ Fully **customizable prompts**

---

## 📂 Project Structure

```

📦 gemini-file-generator
┣ 📜 index.js # Main script (Node.js, ESM)
┣ 📜 index.html # Generated HTML (auto-saved)
┣ 📜 script.js # Generated JavaScript (auto-saved)
┣ 📜 package.json # Dependencies
┗ 📜 README.md # Project documentation

````

---

## 🔧 Installation & Setup

### 1️⃣ Clone this repo
```bash
git clone https://github.com/your-username/gemini-file-generator.git
cd gemini-file-generator
````

### 2️⃣ Install dependencies

```bash
npm install @google/generative-ai
```

### 3️⃣ Add your Gemini API Key

Replace the placeholder key inside **index.js**:

```js
const genai = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
```

👉 Get your key from [Google AI Studio](https://aistudio.google.com/).

---

## ▶️ Usage

Run the generator with a **custom user prompt**:

```bash
node index.js
```

Example user prompt inside the script:

```js
generateTextWithSystemPrompt(
  "Create a small, beginner-friendly web page with beautiful css for design that explains what ReactJS is and includes a button toggle demo."
);
```

### 💻 Running the generated files

1. Open `index.html` in your browser 🌐
2. The page will load with styled content and interactive JS 🎉

---

## 🛠️ How It Works

1. **System Prompt Design**
   Ensures Gemini always replies in the strict 5-section format.

2. **Gemini API Call**
   Uses `model.generateContent()` from `@google/generative-ai`.

3. **Output Parsing**
   Regex detects `html and `javascript fences.

4. **File Saving**

   - `index.html` is written to disk.
   - `script.js` is saved separately and linked in HTML.

---

## 📖 Example

✨ Example generated web page:

- Explains ReactJS in simple terms
- Styled with **internal CSS**
- Includes a **button toggle demo** powered by vanilla JS

---

## 📜 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute with attribution.

---

## 💡 Author

👨‍💻 Built by **Prajjal Dhar**
🌟 Contributions, feedback, and ⭐ stars are welcome!

```

```
