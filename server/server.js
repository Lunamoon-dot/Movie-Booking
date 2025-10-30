import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'; //can than duoi
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './Routes/showRoutes.js';
import bookingRouter from './Routes/bookingRoutes.js';
import adminRouter from './Routes/adminRoutes.js';
import userRouter from './Routes/userRoutes.js';
import { stripeWebhooks } from './Controllers/stripeWebhooks.js';

const app =express();
const PORT =3000;

// kiem tra xem ket noi duoc key chx
if (!process.env.TMDB_API_KEY || !process.env.MONGODB_URI || !process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  console.error('❌ Missing required environment variables!');
  process.exit(1);
}

await connectDB();//ket noi database

//Stripe
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)


//Middleware
app.use(express.json()); //Vi express default no chx hieu dc du lieu json nen minh cau hinh no nhu tren
app.use(cors());//Giup cho BE ket noi dc voi FE o cong khac
app.use(clerkMiddleware());

//API Routes
app.get('/', (req, res)=> res.send('Server is live!'));
app.use('/api/inngest',  serve({ client: inngest, functions }));
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

// Start server (for local development)
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });

// Export for Vercel serverless
export default app;