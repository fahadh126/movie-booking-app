import express from "express";
import { deleteUser, getAllUsers , logIn, signUp, updateUser} from "../controllers/user-controller";

const userRouter = express.Router()

userRouter.get('/',getAllUsers);
userRouter.post('/signup',signUp);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser)
userRouter.post('/login', logIn)

export default userRouter;

