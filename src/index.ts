import express from "express";
import 'dotenv/config';
import { createNotionPage } from './notion';
import { sendTextMessage } from './twilio';
import { generateAiContext } from './gemini'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

async function handleTextMessage(message: string) {
  console.log("Received text message:", message);
  const description = await generateAiContext(JSON.stringify({ message }))
  if (typeof description === 'string') {
    await createNotionPage(message, description.substring(0, 2000));
  } else {
    console.error('Description is not a string:', description);
  }
  sendTextMessage("Synced it to notion and Generated AI content");
}

export async function handleImageMessage(mediaUrl: string) {
  console.log("Received image message. Media URL:", mediaUrl);
  const description = await generateAiContext(JSON.stringify({ mediaUrl }))
  if (typeof description === 'string') {
    await createNotionPage(mediaUrl, description.substring(0, 2000));
  } else {
    console.error('Description is not a string:', description);
  }
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
