import { newBooking } from "../controllers/bookings-controller";

import express  from "express";
 const bookingRouter = express.Router()

  bookingRouter.post('/',newBooking)


  export default bookingRouter;