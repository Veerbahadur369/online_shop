import { Router } from "express";
import { sendEmail } from "../controllers/sendEmails.mjs";

const mailRoute =Router()
 
mailRoute.post('/sendEmail',sendEmail);



export{ mailRoute}