import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'
import express from "express";
import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

async function handleTextMessage(message: string) {
    console.log("Received text message:", message);

    // logic to handle text messages here

    client.messages.create({
        body: "Successfully received your text message",
        from: process.env.MY_TWILIO_NUM,
        to: process.env.MY_PERSONAL_NUM!
    });
}

async function handleImageMessage(mediaUrl: string) {

    console.log("Received image message. Media URL:", mediaUrl);

    // logic to handle image messages here

    client.messages.create({
        body: "Successfully received your image",
        from: process.env.MY_TWILIO_NUM,
        to: process.env.MY_PERSONAL_NUM!
    });
}

app.post('/', async (req, res) => {
    const { body } = req;

    if (body.NumMedia && parseInt(body.NumMedia) > 0) {
        const mediaUrl = body.MediaUrl0;
        await handleImageMessage(mediaUrl);
    } else {
        const message = body.Body;
        await handleTextMessage(message);
    }

    res.status(200).send(); 
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));
