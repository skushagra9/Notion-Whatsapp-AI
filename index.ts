import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'
import express from "express";
import twilio from 'twilio'

const client = (twilio)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
    
// const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

// async function run(message:string) {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//     const prompt = message
  
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   client.messages
//     .create({
//         body: text,
//         from: process.env.MY_TWILIO_NUM,
//         to: process.env.MY_PERSONAL_NUM!
//     })
   
// }


app.post('/', async (req, res) => {
    const { body } = req;
    const message = body.Body;
    console.log(message)
    // run(message)
    
 });




app.listen(port, () => console.log(`Express app running on port ${port}!`));