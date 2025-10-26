import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'; //can than duoi
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const PORT = 3000;
const app =express();

await connectDB();


//Middleware
app.use(express.json()) //Vi express default no chx hieu dc du lieu json nen minh cau hinh no nhu tren
app.use(cors())//Giup cho BE ket noi dc voi FE o cong khac
app.use(clerkMiddleware())

//API Routes
app.get('/', (req, res)=> res.send('Server is live!'))
app.use('/api/inngest',  serve({ client: inngest, functions }))

app.listen(PORT, ()=> console.log(`Server listening at http://localhost:${PORT}`))