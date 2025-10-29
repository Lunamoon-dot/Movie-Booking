import express from "express";
import { addFavorite, getFavorites, getUserBookings } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings);
userRouter.post('/update-favorite', addFavorite);
userRouter.get('/favorites', getFavorites);

export default userRouter;
