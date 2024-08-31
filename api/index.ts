import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// enable JSON body parser
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.post("/contact-form-submission", (req, res) => {
   const { name, email } = req.body;
});

export default app;
