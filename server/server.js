import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const STORAGE_FILE = "./storage.json";
const cache = new Map();

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY ?? "",
});

function loadStorage() {
  if (!fs.existsSync(STORAGE_FILE)) fs.writeFileSync(STORAGE_FILE, "[]");
  return JSON.parse(fs.readFileSync(STORAGE_FILE, "utf8"));
}

function saveStorage(data) {
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
}

async function extractTextFromURL(url) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  return $("p")
    .map((_, el) => $(el).text())
    .get()
    .join(" ");
}

app.post("/api/summarize", async (req, res) => {
  try {
    const { text, url, style = "short" } = req.body;
    let inputText = text?.trim?.();

    if (!inputText && url) {
      if (cache.has(url)) return res.json(cache.get(url));
      inputText = await extractTextFromURL(url);
    }

    if (!inputText) {
      return res.status(400).json({ error: "No text or URL provided." });
    }

    const prompt = `
  You are a helpful AI assistant.
  Summarize the following content in a ${style} style.
  
  Style examples:
  - short → 2–3 concise sentences
  - detailed → 1–2 paragraphs
  - bullet → clear bullet points
  - casual → friendly, natural tone
  
  Content:
  ${inputText}
  `;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Correct summary extraction (Gemini SDK nested response)
    const summary =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim?.() ||
      result?.response?.text?.trim?.() ||
      result?.text?.trim?.() ||
      "No summary.";

    const summaries = loadStorage();
    const id = uuidv4();
    const record = {
      id,
      text: inputText.slice(0, 2000),
      summary,
      url,
      style,
      createdAt: new Date().toISOString(),
    };

    summaries.push(record);
    saveStorage(summaries);

    if (url) cache.set(url, record);

    res.json(record);
  } catch (err) {
    console.error("Error generating summary:", err);
    res.status(500).json({ error: "Failed to summarize." });
  }
});

app.get("/api/history", (req, res) => {
  const summaries = loadStorage().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(summaries);
});

app.get("/api/summary/:id", (req, res) => {
  const summaries = loadStorage();
  const found = summaries.find((s) => s.id === req.params.id);
  if (!found) return res.status(404).json({ error: "Not found" });
  res.json(found);
});


app.post("/api/rephrase", async (req, res) => {
  try {
    const { text, tone = "formal" } = req.body || {};
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }
    const prompt = `Rephrase the following summary in a ${tone} tone. Keep meaning.

Text:\n${text}`;
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const rephrased =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim?.() ||
      result?.response?.text?.trim?.() ||
      result?.text?.trim?.() ||
      "";
    res.json({ rephrased });
  } catch (err) {
    console.error("Error rephrasing:", err);
    res.status(500).json({ error: "Failed to rephrase." });
  }
});

app.post("/api/keywords", async (req, res) => {
  try {
    const { text, topN = 5 } = req.body || {};
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }
    const prompt = `Extract the top ${topN} keywords or entities from the text. Return a comma-separated list only, no explanations.

Text:\n${text}`;
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const raw =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim?.() ||
      result?.response?.text?.trim?.() ||
      result?.text?.trim?.() ||
      "";
    const keywords = raw
      .split(/[\n,]/)
      .map((k) => k.trim())
      .filter(Boolean)
      .slice(0, Number(topN) || 5);
    res.json({ keywords });
  } catch (err) {
    console.error("Error extracting keywords:", err);
    res.status(500).json({ error: "Failed to extract keywords." });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);