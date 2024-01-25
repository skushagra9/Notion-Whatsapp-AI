import { Client } from '@notionhq/client';

const notion_client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
const pageID = process.env.NOTION_PAGE_ID;

  export async function createNotionPage(message:string, description:string) {
    try {
      const response = await notion_client.pages.create({
        "parent": { "page_id": pageID! },
        "properties": {
            "title": {
          "title": [{ "type": "text", "text": { "content": message } }]
            }
        },
        "children": [
        {
          "object": "block",
          "type": "paragraph",
          "paragraph": {
            "rich_text": [{ "type": "text", "text": { "content": description } }]
          }
        }
      ]
      });
      console.log("Page created successfully:");
    } catch (error) {
      console.error("Error creating page:",error);
    }  
  }