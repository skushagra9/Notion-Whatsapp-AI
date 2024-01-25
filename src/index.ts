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
    // This approach creates 2 pages with the same title
  //   if (description.length > 2000) {
  //     for (let i = 0; i < description.length; i += 2000) {
  //         let chunk = description.substring(i, i + 2000);
  //         await createNotionPage(message, chunk);
  //     }
  // }else{
  //   await createNotionPage(message, description);
  // }
    await createNotionPage(message, description.substring(0,2000));
    sendTextMessage("Synced it to notion and Generated AI content");
    
    
}

export async function handleImageMessage(mediaUrl: string) {
  console.log("Received image message. Media URL:", mediaUrl);

  // logic to handle image messages here
  const description = await generateAiContext(mediaUrl)
  
// This approach creates 2 pages with the same title
//   if (description.length > 2000) {
//     for (let i = 0; i < description.length; i += 2000) {
//         let chunk = description.substring(i, i + 2000);
//         await createNotionPage(mediaUrl, chunk);
//     }
// }else{
//   await createNotionPage(mediaUrl, description);
// }
  await createNotionPage(mediaUrl, description.substring(0,2000));
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
