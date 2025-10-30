import 'dotenv/config';
import { createClerkClient } from "@clerk/express";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

const getAuthData = (req) => {
  if (!req) return {};
  if (typeof req.auth === "function") {
    return req.auth() || {};
  }
  return req.auth || {};
};

export const protectUser = async (req, res, next) =>{
  try{
    const { userId } = getAuthData(req);
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
    const { userId } = getAuthData(req);
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