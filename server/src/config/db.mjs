import mongoose from "mongoose";
import { DB_NAME } from "../constants.mjs";

export const dbConnection = async () => {

    await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
    console.log("Mongoose Database Connected");

} 