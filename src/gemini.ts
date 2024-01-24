import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'

    
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function generateAiContext(message:string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = message
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return (text);
   
}
