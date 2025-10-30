import 'dotenv/config';
import { createClerkClient } from "@clerk/express";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

export const protectUser = async (req, res, next) =>{
  try{
    console.log("protectUser - Request to:", req.path);
    console.log("protectUser - Headers:", req.headers.authorization);
    const authResult = req.auth();
    console.log("protectUser - Auth result:", authResult);
    const {userId} = authResult;
    console.log("protectUser - userId:", userId);
    if(!userId){
      console.log("protectUser - No userId, returning not authenticated");
      return res.json({success: false, message:"not authenticated"})
    }
    console.log("protectUser - Success, continuing to next");
    next();
  }
  catch(error){
    console.error("Error in protectUser:", error);
    console.error("Error stack:", error.stack);
    res.json({success:false, message: error.message})
  }
}

export const protectAdmin = async (req, res, next) =>{
  try{
    console.log("protectAdmin - Request to:", req.path);
    console.log("protectAdmin - Headers:", req.headers.authorization);
    const authResult = req.auth();
    console.log("protectAdmin - Auth result:", authResult);
    const {userId} = authResult;
    console.log("protectAdmin - userId:", userId);
    if(!userId){
      console.log("protectAdmin - No userId, returning not authenticated");
      return res.json({success: false, message:"not authenticated"})
    }
    
    const user = await clerkClient.users.getUser(userId);
    console.log("protectAdmin - User role:", user.privateMetadata?.role);
    
    if(user.privateMetadata?.role !== 'admin'){
      console.log("protectAdmin - Not admin, returning not authorized");
      return res.json({success: false, message:"not authorized"})
    }
    console.log("protectAdmin - Success, continuing to next");
    next();
  }
  catch(error){
    console.error("Error in protectAdmin:", error);
    console.error("Error stack:", error.stack);
    res.json({success:false, message: error.message})
  }
}