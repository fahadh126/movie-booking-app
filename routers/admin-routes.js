import express from "express";
import { addAdmin ,adminLogin, getAdmin } from "../controllers/admin-controller";

const adminRouter = express.Router()

adminRouter.post('/signup',addAdmin)
adminRouter.post('/login',adminLogin)
adminRouter.get('/',getAdmin)

export default adminRouter;