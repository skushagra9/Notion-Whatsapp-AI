// index.ts
import express from "express";
import 'dotenv/config';
import { createNotionPage } from './notion';
import { sendTextMessage } from './twilio';
import {generateAiContext} from './gemini'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

async function handleTextMessage(message: string) {
    console.log("Received text message:", message);

    // logic to handle text messages here
    const description = await generateAiContext(message)
    sendTextMessage("Succesfully received your text message");
    await createNotionPage(message, description);
    sendTextMessage("Synced it to notion and Generated AI content");
    
    
}

export async function handleImageMessage(mediaUrl: string) {
  console.log("Received image message. Media URL:", mediaUrl);

  // logic to handle image messages here
  const description = await generateAiContext(mediaUrl)
    sendTextMessage("Succesfully received your text message");
    await createNotionPage(mediaUrl, description);
    sendTextMessage("Synced it to notion and Generated AI content");

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
