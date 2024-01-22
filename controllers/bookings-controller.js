import Bookings from "../models/Bookings";
import Movie from '../models/Movie';
import User from '../models/User'
import mongoose from "mongoose";

export const newBooking = async ( req, res ) =>{
    const {movie ,date ,seatNumber , user} = req.body;

    let existingMovie;
    let exisitingUser;
    try{
        existingMovie = await Movie.findById(movie)
        exisitingUser = await User.findById(user)
    }catch(err){
        console.log(err);
    }
    if(!existingMovie){
        res.status(404).json({message : 'movie with this id not found'})
    }
    if(!exisitingUser){
        res.status(404).json({message : 'user with this id cannot be found'})
    }
    let booking;
    try{
        booking = new Bookings({
            movie,
            date : new Date(`${date}`),
            seatNumber,
             user
        })

        const session =await mongoose.startSession()
        session.startTransaction();
        exisitingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await exisitingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session})
        session.commitTransaction()

    }catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(500).json({message : "unable to create bookings"})
    }res.status(201).json({booking})
};

export const getBookingById = async (req, res) =>{
    const id = req.params.id
   let bookingId 
   try{
    bookingId = await Bookings.findById(id)
   }catch(err) {
    console.log(err);
   }
   if(!bookingId){
    return res.status(500).json({message : 'booking with this id cannot be found'})
   }
   res.status(201).json({ bookingId })
}

export const deleteBooking = async (req,res) =>{
      
    let booking;
    try{
       booking = await Bookings.findByIdAndDelete(req.params.id).populate("user movie")
      const session= await mongoose.startSession()
       session.startTransaction()
       await booking.user.bookings.pull(booking)
       await booking.movie.bookings.pull(booking)
       await booking.movie.save({ session })
       await booking.user.save({session})
       session.commitTransaction()
    }catch (err){
        console.log(err);
    }if(!booking){
        return res.status(500).json({message: 'booking with this id cannot be deleted'})
    }
    res.status(201).json({message : 'booking deleted'})
}