import nodemailer from "nodemailer";
import { emailTemplateFn } from "./htmlTempates/emailTemplate";
import FormData from "form-data";
import axios from "axios";
import crypto from "crypto";
import fs from "fs";

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

// Function to get MD5 hash of a file buffer
function getFileHash(fileBuffer: any) {
   return crypto.createHash("md5").update(fileBuffer).digest("hex");
}

// Function to upload file to Webflow
export async function uploadFileToWebflow(file: any) {
   const fileName = file.originalFilename;
   const filePath = file.filepath;

   const fileBuffer = fs.readFileSync(filePath);
   const fileHash = getFileHash(fileBuffer);

   // Step 1: Get upload details from Webflow
   const url = "https://api.webflow.com/v2/sites/6299d639266385b43ef0562f/assets";
   const uploadOptions = {
      method: "POST",
      headers: {
         accept: "application/json",
         "content-type": "application/json",
         authorization: `Bearer ${process.env.WEBHOOK_API_TOKEN}`,
      },
      data: {
         fileName,
         fileHash,
      },
   };

   try {
      const uploadDetailsResponse = await axios(url, uploadOptions);
      const uploadDetails = uploadDetailsResponse.data;

      // Step 2: Upload the file to the S3 endpoint
      const s3Endpoint = uploadDetails.uploadUrl;
      const form = new FormData();

      // Add form fields
      for (const key in uploadDetails.uploadDetails) {
         form.append(key, uploadDetails.uploadDetails[key]);
      }

      // Append the actual asset file to the FormData object
      form.append("file", fileBuffer, fileName);

      // Upload the file to S3
      const s3Response = await axios.post(s3Endpoint, form, {
         headers: {
            ...form.getHeaders(),
         },
      });

      if (s3Response.status === 201) {
         console.log("Upload successful.");
         // Return the file ID from Webflow response
         return s3Response.headers.location;
      } else {
         console.error("Upload failed with status:", s3Response.status);
         return null;
      }
   } catch (error) {
      console.error("Error uploading file:", error);
      return null;
   }
}
