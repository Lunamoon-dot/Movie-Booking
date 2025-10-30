import 'dotenv/config';
import Booking from "../model/Booking.js";
import { createClerkClient } from "@clerk/express";
import Movie from "../model/Movie.js";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

//API to Get User Booking
export const getUserBookings = async (req, res)=>{
  try {
      const user = req.auth().userId;
      
      const booking = await Booking.find({user}).populate({path: 'show', populate:{path: 'movie'}}).sort({createdAt: -1})
      res.json({success:true, booking});
  } catch (error) {
    console.error(error.message);
    res.json({success: false, message: error.message})
  }
}

//API to add Favorite Movie by using Clerk User Metadata
export const addFavorite = async (req, res)=>{
  try {
    const {movieId} =req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId)
    if(!user.privateMetadata.favorites){ //nếu trong favorites chx tồn tại movie nào thì tạo 1 mảng
      user.privateMetadata.favorites = [];
    } 
    if(!user.privateMetadata.favorites.includes(movieId)){
      user.privateMetadata.favorites.push(movieId); //đẩy movieId vào vì ở favorites controller mình sẽ từ id đó để trả lại moviedetail cho người dùng
    }
    else{
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item!==movieId);//filter sẽ trả lại 1 arr mà các item bên trong phải thỏa mãn điều kiện bên trong, do đó nếu item đã tồn tại thì sẽ bị loại bỏ
    }
    await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata})
    res.json({success: true, message: 'favorite updated'})
  } catch (error) {
    console.error(error.message);
    res.json({success: false, message: error.message}) 
  }
}

export const getFavorites = async (req, res)=>{
  try {
    const user = await clerkClient.users.getUser(req.auth().userId);
    const favorites = user.privateMetadata?.favorites || [];
    //get movies from database
    const movies = await Movie.find({_id:{$in: favorites}})
    res.json({success: true, movies})
  } catch (error) {
    console.error(error.message);
    res.json({success: false, message: error.message}) 
  }
}