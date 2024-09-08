import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createTableString, getGmailTransporter, getUrlExtension, sendEmail } from "./helpers";
import formidable from "formidable";
import { applyEmailTemplateFull } from "./htmlTempates/apllyEmailFull";
import { applyEmailTemplateWithoutLinkedin } from "./htmlTempates/apllyEmailWithoutLinkedin";

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

app.post("/api/apply-form-submission", async (req, res, next) => {
   const MAX_VERCEL_FILE_SIZE_IN_REQUEST = 4000000;
   console.log("🚀 ~ app.post ~ headers", req.headers);
   console.log("🚀 ~ app.post ~ user-agent", req.headers["user-agent"]);

   const form = formidable();

   form.parse(req, async (err, fields, files) => {
      if (err) {
         next(err);
         return;
      }
      console.log("🚀 ~ form.parse ~ fields:", fields);

      if (!files?.cv?.length || !fields.timeZone?.length) {
         return res.status(400).send({ message: "Enter all required fields" });
      }
      if (files?.cv?.length && files.cv[0]?.size > MAX_VERCEL_FILE_SIZE_IN_REQUEST) {
         return res.status(413).send({ message: "Max file size error" });
      }
      const fullName = (fields?.fullName && fields.fullName[0]) || "Candidate";
      const cv = files.cv[0];
      const timeZone = fields.timeZone[0];
      const potentialDate = (fields?.potentialDate && fields.potentialDate[0]) || "N/A";
      const positionName = (fields?.positionName && fields.positionName[0]) || "N/A";
      const ownerEmail = fields?.ownerEmail && fields.ownerEmail[0];
      const linkedin = fields?.linkedinUrl && fields.linkedinUrl[0];

      let fileFormat = getUrlExtension(cv.originalFilename);

      let emailTemplate;
      if (linkedin) {
         emailTemplate = applyEmailTemplateFull(
            fullName,
            timeZone,
            potentialDate,
            positionName,
            linkedin
         );
      } else {
         emailTemplate = applyEmailTemplateWithoutLinkedin(
            fullName,
            timeZone,
            potentialDate,
            positionName
         );
      }

      try {
         console.time("getGmailTransporter");
         const transporter = await getGmailTransporter();
         console.timeEnd("getGmailTransporter");

         console.time("transporter");
         await transporter.sendMail({
            from: "ScaleJet <no-reply@scale-jet.com>",
            to: ownerEmail,
            subject: `New Candidate: ${positionName} position`,
            text: "",
            html: emailTemplate,
            attachments: [
               {
                  filename: `Resume.${fileFormat}`,
                  path: cv.filepath,
               },
            ],
         });
         console.timeEnd("transporter");
      } catch (error) {
         console.error("Error sending email", error);
      }

      return res.status(200).send({ message: "success" });
   });
});

export default app;
