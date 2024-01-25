<p align="center" style="margin-top: 120px">

  <h3 align="center">Notion Whatsapp AI </h3>

  <p align="center">
   Elevate your notes on WhatsApp with AI enhancements, seamlessly synced to Notion. 🚀 Boost your productivity and creativity effortlessly! ✨
</p>

## About Notion Whatsapp AI 🏓

Transform your WhatsApp note-taking into a dynamic experience with AI enhancements. 
Enjoy the convenience of handling various content types – from text and images to files and links – all seamlessly integrated and pushed to the Notion API separately. 
Elevate your productivity and creativity effortlessly as your ideas seamlessly flow from WhatsApp to Notion. 
This robust integration ensures a smooth, all-encompassing note-taking journey, letting you focus on your thoughts while technology takes care of the rest. 
Dive into a new era of collaborative productivity with this comprehensive AI-powered solution.

## Contact me 💌

If you want to learn more about this project or have any questions, send me an email at (mailto:skushagra.sharma@gmail.com)
<br/><br/>

## Built with 🛠️

- TypeScript
- Gemini
- Twilio
- Notion API


## Getting Started 🚀

### Requirements

- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [npm](https://npm.io/) 

### Setup

1. Clone the repository

   ```sh
   git clone https://github.com/skushagra9/Whatsapp-AI-Bot.git
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Set up your .env file

   `cp .env.example .env`

4. Setup the env Variables 
  Create your google gemini key, twillio account sid and auth token.
  Also Create the NOTION_ACCESS_TOKEN .
  Useful links:
  Notion API - https://developers.notion.com/docs/create-a-notion-integration
  Twilio API - https://www.twilio.com/en-us
  Gemini - https://deepmind.google/technologies/gemini/#introduction

5. Now for NOTION_PAGE_ID, go to https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content,
   and follow the steps from there to create the page_id and give permissions.
   All the notes you will take on the whatsapp will get appended as pages to the page whose page_id you would set as NOTION_PAGE_ID.

6. Run the server
   ```sh
    yarn tsc
    node dist/index.js
   ```
    or you can use the
    ```sh
    npm start
   ```
7.Install ngork from https://ngrok.com/docs/getting-started/

8. Open another Terminal and run
   `ngrok http 3000`
    copy the link for the locally hosted server and paste in the twilio app 
    Open Your App> Develop > Messaging > Try It Ouy > Send a Whatsapp message > Go to the sandbox settings > paste the link on the demolink space



Currently notion api doesn't support uploading files and media
https://developers.notion.com/docs/working-with-files-and-media#uploading-files-and-media-via-the-notion-api
