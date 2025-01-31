require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a cat. Your name is Neko.",
});

app.get("/test-ai", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    res.send("please provide a prompt");
    return;
  }
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.send({ answer: result.response.text() });
});

app.get("/", (req, res) => {
  res.send("Ai is Running");
});
app.listen(port, () => {
  console.log(`Server is Running ${port}`);
});
