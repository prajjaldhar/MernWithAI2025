/**
 * Gemini file-generator example (Node.js, ESM)
 *
 * What this script does:
 * 1. Creates a detailed `systemPrompt` that instructs Gemini to respond in a strict format:
 *    START -> THINK -> OBSERVE -> ACTION -> OUTPUT
 *    - ACTION must contain two fenced code blocks: one for index.html and one for script.js
 * 2. Sends the system prompt + user prompt to Gemini via `model.generateContent()`.
 * 3. Prints raw model output and tries to extract and save the two files locally:
 *    - index.html
 *    - script.js
 *
 * Notes:
 * - The model output parsing is heuristic (tries to find ```html and ```javascript fences).
 * - Always inspect the model's output before running generated code on production systems.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Initialize Gemini client (put your real key here)
const genai = new GoogleGenerativeAI("");

/**
 * System prompt: instruct Gemini EXACTLY how to structure its reply.
 * The model should produce five labeled sections:
 * START, THINK, OBSERVE, ACTION, OUTPUT.
 *
 * ACTION must contain two fenced code blocks:
 *  - ```html  ... ```  (index.html full content)
 *  - ```javascript ... ``` (script.js full content)
 *
 * IMPORTANT: Ask Gemini to include only those five sections and nothing else.
 */
const systemPrompt = `
SYSTEM INSTRUCTION:
You are a code-generation assistant. Your job is to create two files: "index.html" and inside index.html create css design using style tag and "script.js".
You MUST follow this exact response structure and formatting (no extra sections or stray text):

START:
- Brief one-line summary of the task.

THINK:
- 1-3 short bullets describing the approach and what will be created.

OBSERVE:
- If any clarifying assumptions are necessary, list them here (e.g., "no framework used", "vanilla JS only").
- If nothing to ask, state assumptions clearly.

ACTION:
- Provide the actual file contents. MUST include exactly two fenced code blocks:
  1) An HTML code block labeled as html containing the full, runnable index.html with css to design the page
     -use internal css to design and beautify the page
     Example fence: \`\`\`html
     <!doctype html> ... 
     \`\`\`
  2) A JavaScript code block labeled as javascript containing the full script.js
     Example fence: \`\`\`javascript
     // script.js
     \`\`\`

- The HTML must link to the JavaScript file (e.g., <script src="script.js"></script>).
-The HTML must contain a style tag to put design in it (e.g., <style>
 .classname
 {
    margin:0,
    padding:0
    box-sizing:border-box
  }
</style>)
- Include meaningful, runnable code: a simple beautiful UI with design and JS that manipulates the DOM or demonstrates ReactJS conceptually (but no external build step).

OUTPUT:
- Short instructions on how to save the files and run them locally (2-3 lines).
- End with nothing else.

Do not output anything outside these five labeled sections. Follow the order strictly: START -> THINK -> OBSERVE -> ACTION -> OUTPUT.
`;

/**
 * generateTextWithSystemPrompt
 * - prompt: the user's request (e.g., "Create a small webpage that explains ReactJS and includes a demo")
 * - sends systemPrompt + user prompt to Gemini
 * - prints raw output and attempts to save index.html and script.js if present
 */
async function generateTextWithSystemPrompt(prompt) {
  try {
    // choose model
    const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // combine system + user prompt
    const fullPrompt = `${systemPrompt}\n\nUSER PROMPT:\n${prompt}`;

    // call Gemini
    const result = await model.generateContent(fullPrompt);

    // Extract the textual response
    const text = result.response.text();
    console.log("\n=== RAW MODEL OUTPUT ===\n");
    console.log(text);
    console.log("\n=== END RAW OUTPUT ===\n");

    // Try to find a fenced HTML code block: ```html ... ```
    const htmlFence = text.match(/```html\s*([\s\S]*?)```/i);
    // Try to find a fenced JS block: ```javascript ... ``` or ```js ... ```
    const jsFence =
      text.match(/```javascript\s*([\s\S]*?)```/i) ||
      text.match(/```js\s*([\s\S]*?)```/i);

    let htmlContent = null;
    let jsContent = null;

    if (htmlFence && htmlFence[1]) {
      htmlContent = htmlFence[1].trim();
    }

    if (jsFence && jsFence[1]) {
      jsContent = jsFence[1].trim();
    }

    // Heuristic fallback: if no fences found, try to locate <!-- index.html --> style or raw tags
    if (!htmlContent) {
      // Look for the first "<!doctype" or "<html" in the full text and capture until the next fenced block or end
      const rawHtml =
        text.match(/(<!(?:doctype|DOCTYPE)[\s\S]*?<\/html>)/i) ||
        text.match(/(<html[\s\S]*?<\/html>)/i);
      if (rawHtml && rawHtml[1]) htmlContent = rawHtml[1].trim();
    }

    if (!jsContent && !jsFence) {
      // Find common JS patterns (function, document., addEventListener) and grab a block around them
      const rawJs =
        text.match(/(\/\/\s*script\.js[\s\S]*$)/i) ||
        text.match(/(function[\s\S]*$)/i);
      if (rawJs && rawJs[1]) jsContent = rawJs[1].trim();
    }

    // Save files if we found content
    if (htmlContent) {
      fs.writeFileSync("index.html", htmlContent, "utf8");
      console.log("Saved index.html (length:", htmlContent.length, "chars )");
    } else {
      console.log("No index.html content detected in model output.");
    }

    if (jsContent) {
      fs.writeFileSync("script.js", jsContent, "utf8");
      console.log("Saved script.js (length:", jsContent.length, "chars )");
    } else {
      console.log("No script.js content detected in model output.");
    }

    // Summary message
    console.log(
      "\nDone. Inspect the saved files and the console output above."
    );
  } catch (err) {
    console.error("Error while generating or saving files:", err);
  }
}

/**
 * Example usage:
 * Ask Gemini to create a small, runnable page that explains ReactJS simply and has a short demo area.
 *
 * You can change the user prompt to whatever you want the generated files to implement.
 */
generateTextWithSystemPrompt(
  "Create a small, beginner-friendly web page with beautiful css for design that explains what ReactJS is (short explanation) and includes a tiny interactive demo style the button (vanilla JS toggling a paragraph). Keep it simple and runnable without any build tools."
);
