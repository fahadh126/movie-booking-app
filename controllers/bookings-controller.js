import Bookings from "../models/Bookings";

export const newBooking = async ( req, res ) =>{
    const {movie ,date ,seatNumber , user} = req.body;

    let newBooking;
    try{
        newBooking = new Bookings({
            movie,date : new Date(`${date}`),seatNumber, user
        })
        newBooking = await newBooking.save();
    }catch(err){
        console.log(err);
    }
    if(!newBooking){
        return res.status(500).json({message : "unable to create bookings"})
    }res.status(201).json({booking : newBooking})
}