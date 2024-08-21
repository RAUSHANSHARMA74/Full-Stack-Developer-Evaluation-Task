import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import shopify from "./route/route.js";
import { connection } from "./config/connection.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", shopify);

const port = process.env.PORT || 3050;
app.listen(port, async () => {
    try {
        await connection
        console.log("connection to database")
    } catch (error) {
        console.log("Error while connecting to server");
    }
    console.log(`Server is running at http://localhost:${port}`);
});