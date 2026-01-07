
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const translateText = async (text: string, targetLang: string = 'fr'): Promise<string> => {
    if (!API_KEY) {
        console.warn("VITE_GEMINI_API_KEY is missing. Returning original text.");
        return text; // Graceful fallback
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const prompt = `Translate the following text to ${targetLang}. Return ONLY the translated text, no explanation or markdown.\n\nText: "${text}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Fallback to original on error
    }
};
