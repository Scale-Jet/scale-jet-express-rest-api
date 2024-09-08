import nodemailer from "nodemailer";
import { emailTemplateFn } from "./htmlTempates/emailTemplate";

export const createTableString = function (data: any): string {
   let tableString = '<table class="GeneratedTable">';
   tableString += "<tr><th>Field name</th><th>Value</th></tr>";

   // Iterate over the data object
   Object.entries(data).forEach(([key, value]) => {
      tableString += `<tr><td>${key}</td><td>${value}</td></tr>`;
   });

   tableString += "</table>";
   return tableString;
};

export const getGmailTransporter = async function () {
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
export const sendEmail = async function (emailBody: string, emailSubject: string) {
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
export function getUrlExtension(url: any) {
   return url.split(/[#?]/)[0].split(".").pop().trim();
}
