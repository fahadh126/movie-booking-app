import { deleteBooking, getBookingById, newBooking } from "../controllers/bookings-controller";

import express  from "express";
 const bookingRouter = express.Router()

  bookingRouter.post('/',newBooking);
  bookingRouter.get('/:id',getBookingById);
  bookingRouter.delete("/:id",deleteBooking);


  export default bookingRouter;