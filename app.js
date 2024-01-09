import express from 'express';
import mongoose from 'mongoose';
import dotenv, { config } from 'dotenv'
import userRouter from './routers/user-routes';
import adminRouter from './routers/admin-routes';
import movieRouter from './routers/movie-routes';
import bookingRouter from './routers/booking-routes';
dotenv.config();
const app = express()

//middlewares
app.use(express.json())
app.use('/user', userRouter)
app.use ('/admin',adminRouter)
app.use('/movie',movieRouter)
app.use('/booking',bookingRouter)
 
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.fy8bxhj.mongodb.net/?retryWrites=true&w=majority`
).then(()=>
    app.listen(5000,() =>
    console.log('connected to database ,server is running'))
)
.catch((err) => console.log(err))





// c4aoaIki2YyZ0foQ