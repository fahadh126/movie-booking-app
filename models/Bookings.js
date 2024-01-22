import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    
    movie : {
        type : mongoose.Types.ObjectId,
        requierd : true,
        ref : 'Movie'
    },
    date : {
        type : Date,
        requierd: true
    },
    seatNumber :{
        type : Number,
        requierd: true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        requierd : true
    }
})

export default mongoose.model('Bookings',bookingSchema)