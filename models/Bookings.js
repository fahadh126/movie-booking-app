import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    
    movie : {
        type : String,
        requierd : true
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
        type : String,
        requierd : true
    }
})

export default mongoose.model('Bookings',bookingSchema)