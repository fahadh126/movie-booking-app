import express from "express";
import { deleteUser, getAllUsers , getBookingOfUser, logIn, signUp, updateUser} from "../controllers/user-controller";

const userRouter = express.Router()

userRouter.get('/',getAllUsers);
userRouter.post('/signup',signUp);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser)
userRouter.post('/login', logIn);
userRouter.get('/bookings/:id',getBookingOfUser)

export default userRouter;

