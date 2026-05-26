const {ChatGoogleGenerativeAI} = require("@langchain/google-genai")
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

// Note: @langchain/google nahi — @langchain/google-genai use karo Gemini ke liye
// npm install @langchain/google-genai

const extractJSON = (raw) => {
    // Method 1: ```json ``` block se nikalo
    const jsonBlockMatch = raw.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch) return jsonBlockMatch[1].trim();

    // Method 2: ``` ``` block se nikalo
    const codeBlockMatch = raw.match(/```\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) return codeBlockMatch[1].trim();

    // Method 3: seedha { } dhundo
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) return jsonMatch[0].trim();

    // Method 4: as-is return karo
    return raw.trim();
};

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
});

const SYSTEM_PROMPT = `You are India's expert scam detection AI.
Analyze the given content and respond ONLY in this exact JSON format, nothing else:
{
  "verdict": "SAFE" | "SUSPICIOUS" | "SCAM",
  "confidence": <number 0-100> %,
  "category": "Bank Fraud" | "Job Fraud" | "Phishing" | "OTP Scam" | "Other",
  "reasonHindi": "<Hindi mein explanation>",
  "reasonEnglish": "<English explanation>",
  "redFlags": ["<flag1>", "<flag2>"]
}`;

// ─── Text scan ───────────────────────────────────────────────
const detectScamFromText = async (next, message) => {
    try {
        const response = await model.invoke([
            new SystemMessage(SYSTEM_PROMPT),
            new HumanMessage(`Analyze this message for scam: "${message}"`),
        ]);

        const raw = response.content;

        // Gemini kabhi kabhi ```json ``` wrap karta hai — clean karo
        const cleaned = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleaned);
        return result;

    } catch (err) {
        console.log(err)
        next(err);
        return null;
    }
};

// ─── Image scan (ImageKit URL se) ────────────────────────────
const detectScamFromImage = async (next, imageUrl) => {
    try {
        const response = await model.invoke([
            new SystemMessage(SYSTEM_PROMPT),
            new HumanMessage({
                content: [
                    {
                        type: "image_url",
                        image_url: { url: imageUrl },
                    },
                    {
                        type: "text",
                        text: "Analyze this screenshot for scam content.",
                    },
                ],
            }),
        ]);

        const raw = response.content;
        const cleaned = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleaned);
        return result;

    } catch (err) {
         console.log(err)
        next(err);
        return null;
    }
};

// ─── URL scan ────────────────────────────────────────────────
const detectScamFromUrl = async (next, url) => {
    try {
        const response = await model.invoke([
            new SystemMessage(SYSTEM_PROMPT),
            new HumanMessage(
                `Analyze this URL for phishing or scam: "${url}". 
                 Check domain name, suspicious patterns, URL structure.`
            ),
        ]);

        const raw = response.content;

        // Gemini kabhi kabhi ```json ``` wrap karta hai — clean karo
        const cleaned = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleaned);
        return result;

    } catch (err) {
         console.log(err)
        next(err);
        return null;
    }
};

module.exports = {
    detectScamFromText,
    detectScamFromImage,
    detectScamFromUrl,
};