import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import { emailTemplateFn } from "./emailTemplate";

const app = express();
dotenv.config();
app.use(
   cors({
      origin: "*",
      methods: "*",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
   })
);

// enable JSON body parser
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.post("/api/contact-form-submission", async (req, res) => {
   console.log("🚀 ~ app.post ~ headers", req.headers);
   console.log("🚀 ~ app.post ~ user-agent", req.headers["user-agent"]);

   if (!req.body.name || !req.body.email) {
      return res.status(400).send({ message: "Name and email are required" });
   }

   const tableString = createTableString(req.headers);

   await sendEmail(tableString, "Contact form submission request headers");

   await sendEmail(tableString, "Contact form submission");
   return res.status(200).send({ message: "success" });
});

export default app;

const createTableString = function (data: any): string {
   let tableString = '<table class="GeneratedTable">';
   tableString += "<tr><th>Field name</th><th>Value</th></tr>";

   // Iterate over the data object
   Object.entries(data).forEach(([key, value]) => {
      tableString += `<tr><td>${key}</td><td>${value}</td></tr>`;
   });

   tableString += "</table>";
   return tableString;
};

const getGmailTransporter = async function () {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
         user: process.env.GOOGLE_APP_EMAIL,
         pass: process.env.GOOGLE_APP_PASSWORD,
      },
   });
   await transporter.verify();

   return transporter;
};
const sendEmail = async function (emailBody: string, emailSubject: string) {
   const transporter = await getGmailTransporter();
   const emailTemplate = emailTemplateFn(emailBody);
   await transporter.sendMail({
      from: "ScaleJet <no-reply@scale-jet.com>",
      to: process.env.GOOGLE_EMAIL_TO,
      subject: emailSubject,
      text: "",
      html: emailTemplate,
   });
};
