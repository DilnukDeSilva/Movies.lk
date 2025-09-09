import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"


const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send('Movies API Server Running'));
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
