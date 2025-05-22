import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

console.log("TOKEN", TOKEN);
console.log("ENDPOINT", ENDPOINT);

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Dalia",
};

const recipients = [{ email: "daliabedrosyan47@gmail.com" }];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log)
  .catch(console.error);
