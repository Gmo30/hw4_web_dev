import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';

import menuRoutes from "./routes/menuRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,            
}));

app.use("/api/menu", menuRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});