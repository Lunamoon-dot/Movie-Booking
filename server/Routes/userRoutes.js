import express from "express";
import { addFavorite, getFavorites, getUserBookings } from "../Controllers/userController.js";
import { protectUser } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.get('/bookings', protectUser, getUserBookings);
userRouter.post('/update-favorite', protectUser, addFavorite);
userRouter.get('/favorites', protectUser, getFavorites);

export default userRouter;
