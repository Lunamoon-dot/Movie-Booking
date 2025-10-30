import express from "express";
import { creatingBooking, getOccupiedSeats, confirmCheckoutSession } from "../Controllers/bookingController.js";
import { protectUser } from "../Middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/create', protectUser, creatingBooking);
bookingRouter.get('/seat/:showId',protectUser, getOccupiedSeats);
bookingRouter.post('/confirm', protectUser, confirmCheckoutSession);

export default bookingRouter;
