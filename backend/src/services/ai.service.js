const {ChatGoogleGenerativeAI} = require("@langchain/google-genai")
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
});

// Build language-aware system prompt
const buildSystemPrompt = (language = 'English') => {
    return `You are India's expert scam detection AI.
Analyze the given content and respond ONLY in this exact JSON format, nothing else.
IMPORTANT: Write the "reasonHindi" and "reasonEnglish" fields strictly in ${language} language.
{
  "verdict": "SAFE" | "SUSPICIOUS" | "SCAM",
  "confidence": <number 0-100>,
  "category": "Bank Fraud" | "Job Fraud" | "Phishing" | "OTP Scam" | "Other",
  "reasonHindi": "<Explanation in ${language}>",
  "reasonEnglish": "<Explanation in ${language}>",
  "redFlags": ["<flag1_in_${language}>", "<flag2_in_${language}>"]
}`;
};

// ─── Text scan ───────────────────────────────────────────────
const detectScamFromText = async (next, message, language = 'English') => {
    try {
        const response = await model.invoke([
            new SystemMessage(buildSystemPrompt(language)),
            new HumanMessage(`Analyze this message for scam: "${message}"`),
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

// ─── Image scan ────────────────────────────────────────────────
const detectScamFromImage = async (next, imageUrl, language = 'English') => {
    try {
        const response = await model.invoke([
            new SystemMessage(buildSystemPrompt(language)),
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
const detectScamFromUrl = async (next, url, language = 'English') => {
    try {
        const response = await model.invoke([
            new SystemMessage(buildSystemPrompt(language)),
            new HumanMessage(
                `Analyze this URL for phishing or scam: "${url}". 
                 Check domain name, suspicious patterns, URL structure.`
            ),
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

module.exports = {
    detectScamFromText,
    detectScamFromImage,
    detectScamFromUrl,
};
