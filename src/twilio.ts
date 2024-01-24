import twilio from 'twilio';

export const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendTextMessage(body: string) {
  await client.messages.create({
    body: "Successfully received your text message",
    from: process.env.MY_TWILIO_NUM,
    to: process.env.MY_PERSONAL_NUM!
  });
}
