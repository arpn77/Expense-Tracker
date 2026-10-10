import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, // Use the value from .env
    credentials: true, // Allow cookies and credentials
}));
app.use(express.json({ limit: '1mb' })); // Increase JSON payload size limit
app.use(express.urlencoded({ extended: true, limit: '1mb' })); // Increase URL-encoded payload size limit
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from './routes/user.routes.js';

app.use("/api/v1/users", userRouter);
import expanceRouter from './routes/Expance.routes.js';
app.use("/api/v1/expance", expanceRouter);
import tripRouter from './routes/Trip.routes.js';
app.use("/api/v1/trip", tripRouter);
import collectionRouter from './routes/collections.routes.js';
app.use("/api/v1/collection", collectionRouter);

export { app };
