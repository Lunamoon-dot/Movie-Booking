import express from "express";
import { creatingBooking, getOccupiedSeats } from "../Controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/create', creatingBooking);
bookingRouter.get('/seat/:showId', getOccupiedSeats);

export default bookingRouter;
