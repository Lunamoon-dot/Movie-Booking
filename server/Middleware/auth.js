import 'dotenv/config';
import { createClerkClient } from "@clerk/express";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

export const protectUser = async (req, res, next) =>{
  try{
    const {userId} = req.auth();
    if(!userId){
      return res.json({success: false, message:"not authenticated"})
    }
    next();
  }
  catch(error){
    console.error("Error in protectUser:", error.message);
    res.json({success:false, message: error.message})
  }
}

export const protectAdmin = async (req, res, next) =>{
  try{
    const {userId} = req.auth();
    if(!userId){
      return res.json({success: false, message:"not authenticated"})
    }
    
    const user = await clerkClient.users.getUser(userId);
    
    if(user.privateMetadata?.role !== 'admin'){
      return res.json({success: false, message:"not authorized"})
    }
    next();
  }
  catch(error){
    console.error("Error in protectAdmin:", error.message);
    res.json({success:false, message: error.message})
  }
}