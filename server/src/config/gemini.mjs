import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:'AIzaSyA8etGZwExRCjPbF0LSo-czB8huHFMuTKA'});

async function model(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:text|| "Explain how AI works in a few words",
  });
  console.log(response.text);
  return response.text
}

export {model}
  