import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
   createTableString,
   getGmailTransporter,
   getUrlExtension,
   sendEmail,
   uploadFileToWebflow,
} from "./helpers";
import formidable from "formidable";
import { applyEmailTemplateFull } from "./htmlTempates/apllyEmailFull";
import { applyEmailTemplateWithoutLinkedin } from "./htmlTempates/apllyEmailWithoutLinkedin";
import axios from "axios";

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
const MAX_VERCEL_FILE_SIZE_IN_REQUEST = 4000000;

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

app.post("/api/post-free-job", async (req, res, next) => {
   console.log("🚀 ~ app.post ~ headers", req.headers);
   console.log("🚀 ~ app.post ~ user-agent", req.headers["user-agent"]);

   const form = formidable();
   const companyCollectionId = "6299d6392663856bc2f0568a";
   const jobPostCollectionId = "6299d63926638511b6f05676";

   form.parse(req, async (err, fields, files) => {
      if (err) {
         next(err);
         return;
      }
      console.log("🚀 ~ form.parse ~ fields:", fields);

      if (!files?.logoFile?.length || !fields.timeZone?.length) {
         return res.status(400).send({ message: "Enter all required fields" });
      }
      if (files?.logoFile?.length && files.logoFile[0]?.size > MAX_VERCEL_FILE_SIZE_IN_REQUEST) {
         return res.status(413).send({ message: "Max file size error" });
      }
      const fullName = (fields?.fullName && fields.fullName[0]) || "Candidate";
      const email = fields?.email && fields.email[0];
      const logoFile = files.logoFile[0];
      const timeZone = fields.timeZone[0];

      const jobTitle = (fields?.jobTitle && fields.jobTitle[0]) || "N/A";
      const jobCategory = (fields?.jobCategory && fields.jobCategory[0]) || "N/A";
      const jobType = fields?.jobType && fields.jobType[0];
      const jobSalary = (fields?.jobSalary && fields.jobSalary[0]) || "";
      const showSalary = fields?.showSalary && fields.showSalary[0];
      const jobDescription = fields?.jobDescription && fields.jobDescription[0];
      const companyName = (fields?.companyName && fields.companyName[0]) || "N/A";
      const companyWebsite = fields?.companyWebsite && fields.companyWebsite[0];
      const linkedinPage = fields?.linkedinPage && fields.linkedinPage[0];
      const companyDescription = fields?.companyDescription && fields.companyDescription[0];
      const companyPerksAndBenefits =
         fields?.companyPerksAndBenefits && fields.companyPerksAndBenefits[0];
      const remote = fields?.remote && fields.remote[0];

      let fileFormat = getUrlExtension(logoFile.originalFilename);

      let companyCreated;
      let jobPostCreated;
      let timeZoneArray: any = [];
      let salary;

      if (jobSalary.length < 2) {
         salary = "";
      } else {
         salary = `$${jobSalary} USD`;
      }

      const makeid = (length: any) => {
         var result = "";
         var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
         var charactersLength = characters.length;
         for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
         return result;
      };

      const jobTypes: any = {
         full: "c0dd888f4cd03ba945520c799657f9a7",
         part: "672d5fa6c321fc864cfd815bddabd4c4",
      };
      const remoteStatus: any = {
         yes: "6340bf99aa99f016c8e83f58f9fd406f",
         no: "936c1fd466106f1366c0a4cf2000b655",
      };
      const category: any = {
         development: "6299d6392663851fa4f056fe",
         marketing: "6299d639266385cdb7f05701",
         support: "6299d6392663857fc1f05703",
         "business-development": "6304f722907a4ffc0e44d01a",
         "finance-legal": "6304f731ba0ce449f72c632d",
         management: "6304f4eb3c9402eca690ad0c",
         "hr-recruiting": "6307a1345394f2ca1fba72e0",
         "design-creative": "6304f48b7c43212ff1a68e20",
      };
      const timeZones: any = {
         "anywhere-in-the-world": "6299d639266385006ef056fa",
         usa: "6299d6392663854931f056f9",
         europe: "6299d6392663857904f056f8",
         сanada: "6299d63926638539dbf056f7",
         asia: "62b08c93e78f9ce631a77bc5",
         australia: "62b08cacd1cd09c652f2db8d",
         "latin-america": "62b08cbd1036bfbceecbf614",
         "middle-east": "62c5b8afd59dce0af20caeaf",
      };
      const webflowRadioData: any = {
         jobType: null,
         remote: null,
      };
      function parseJobDataFromWF() {
         if (jobType === "part-time") {
            webflowRadioData.jobType = jobTypes.part;
         } else if (jobType === "full-time") {
            webflowRadioData.jobType = jobTypes.full;
         }

         if (remote === "yes") {
            webflowRadioData.remote = remoteStatus.yes;
         } else if (remote === "no") {
            webflowRadioData.remote = remoteStatus.no;
         }
      }

      function updateTimeZoneArray() {
         if (timeZone.includes("Time-Zone-Anywhere-In-The-World")) {
            timeZoneArray = [...timeZoneArray, timeZones["anywhere-in-the-world"]];
         }
         if (timeZone.includes("Time-Zone-Usa")) {
            timeZoneArray = [...timeZoneArray, timeZones["usa"]];
         }
         if (timeZone.includes("Time-Zone-Europe")) {
            timeZoneArray = [...timeZoneArray, timeZones["europe"]];
         }
         if (timeZone.includes("Time-Zone-Canada")) {
            timeZoneArray = [...timeZoneArray, timeZones["сanada"]];
         }
         if (timeZone.includes("Time-Zone-Asia")) {
            timeZoneArray = [...timeZoneArray, timeZones["asia"]];
         }
         if (timeZone.includes("Time-Zone-Australia")) {
            timeZoneArray = [...timeZoneArray, timeZones["australia"]];
         }
         if (timeZone.includes("Time-Zone-Latin-America")) {
            timeZoneArray = [...timeZoneArray, timeZones["latin-america"]];
         }
         if (timeZone.includes("Time-Zone-Middle-East")) {
            timeZoneArray = [...timeZoneArray, timeZones["middle-east"]];
         }
      }

      let slug = companyName
         .toLowerCase()
         .replace(/ /g, "-")
         .replace(/[^\w-]+/g, "");
      const rndInt = Math.floor(Math.random() * 100) + 100;
      let uniqeID = makeid(21);

      const s3FileUrl = await uploadFileToWebflow(logoFile);

      const companyResponse = await axios.post(
         `https://api.webflow.com/v2/collections/${companyCollectionId}/items`,
         {
            isArchived: false,
            isDraft: true,
            fieldData: {
               slug: `${rndInt}-${slug}`,
               name: companyName,
               "company-website-link": companyWebsite,
               "company-linkedin-link": linkedinPage,
               "company-about": companyDescription,
               "company-logo-isotype": {
                  fileId: uniqeID,
                  url: s3FileUrl,
                  alt: null,
               },
               "company-perks-benefits-left-column": companyPerksAndBenefits,
               moderated: false,
            },
         },
         {
            headers: {
               accept: "application/json",
               "content-type": "application/json",
               authorization: `Bearer ${process.env.WEBHOOK_API_TOKEN}`,
            },
         }
      );
      companyCreated = companyResponse.data;

      // get company id
      const companyId = companyCreated.id;
      console.log(`Got here: companyData`, companyId);

      // if collection data exist - create webflow cms item (job post)

      // get company name and job title to convert it intro slug
      const slugCompany = companyName
         .toLowerCase()
         .replace(/ /g, "-")
         .replace(/[^\w-]+/g, "");

      const slugJobPost = jobTitle
         .toLowerCase()
         .replace(/ /g, "-")
         .replace(/[^\w-]+/g, "");

      // call all nedded functions
      parseJobDataFromWF();
      updateTimeZoneArray();
      //create job post

      const jobPostResponse = await axios.post(
         `https://api.webflow.com/v2/collections/${jobPostCollectionId}/items`,
         {
            isArchived: false,
            isDraft: true,
            fieldData: {
               slug: `${slugCompany}-${slugJobPost}`,
               name: jobTitle,
               remote: webflowRadioData.remote,
               "job-type": webflowRadioData.jobType,
               "job-description": jobDescription,
               "job-salary": salary,
               "job-company": companyId,
               "job-department": category[jobCategory],
               "job-application-link": companyWebsite,
               "show-salary": showSalary,
               "time-zone-2": timeZoneArray,
               "job-post-owner-email": email,
               moderated: false,
            },
         },
         {
            headers: {
               accept: "application/json",
               "content-type": "application/json",
               authorization: `Bearer ${process.env.WEBHOOK_API_TOKEN}`,
            },
         }
      );
      jobPostCreated = jobPostResponse.data;

      console.log(`companyCreated`, companyCreated);
      console.log(`jobPostCreated`, jobPostCreated);

      const tableString = createTableString({
         fullName,
         email,
         jobTitle,
         remote,
         jobCategory,
         jobType,
         timeZone,
         jobSalary,
         showSalary,
         jobDescription,
         companyName,
         companyWebsite,
         linkedinPage,
         companyDescription,
         companyPerksAndBenefits,
         logo: s3FileUrl,
      });

      await sendEmail(tableString, "Job post created");

      return res.status(200).send({ message: "success" });
   });
});

export default app;
