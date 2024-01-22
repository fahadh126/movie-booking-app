import Bookings from '../models/Bookings';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const  getAllUsers = async (req, res , next) => {
let users;
try {
    users = await User.find()
} catch ( err ) {
    return next(err);
}    
 if (!users){
    return res.status(500).json({message : 'unexpected error occured'})
 } 
 return res.status(200).json({ users })

};

export const signUp = async (req,res,next) => {
    const {name , email, password } = req.body;
    if(!name && name.trim()=== '' && 
    !email && email.trim()==='' && 
    !password && password.trim()==='')
     {
      return res.status(422).json({message : 'invalid inputs'})
    }
    const hashedPassword = bcrypt.hashSync(password)
    let user
    try {
        user = new User ({name , email ,password : hashedPassword})
        user = await user.save()

    } catch (err) {
      return next (err);      
    }
    if (!user){
        return res.status(500).json({message : 'unexpected error occured'})
    }
    return res.status(201).json({ user })
};

export const updateUser = async (req,res,next)=>{
    const id =req.params.id;
    const {name , email, password } = req.body;
    
    if(!name && name.trim()=== '' && 
    !email && email.trim()==='' && 
    !password && password.trim()==='')

    {
        return res.status(422).json({message : 'invalid inputs'})
    }
    const hashedPassword = bcrypt.hashSync(password) 

    let user;
    try{
        user = await User.findByIdAndUpdate(id,{name, email, password:hashedPassword})
    } catch(err){ 
      return next(err);
    }
    if(!user){
        return res.status(500).json({message : 'something went wrong'})
    }
    return res.status(200).json({message : 'update sucessfully'})
}

export const deleteUser = async (req,res,next) =>{
    const id = req.params.id
    let user 
    try{
        user = await User.findByIdAndDelete(id)
    }
    catch (err){
        return next (err)
    }
    if(!user){
        return res.status(500).json({message: 'user not found'})
    }
    return res.status(200).json({message : 'user deleted sucessfully'})
};

export const logIn = async ( req,res,next) =>{
    const { email, password} = req.body;
    if (!email && email.trim() === '' && !password && password.trim() === '') {
        return res.status(422).json({message: 'invalid inputs'});
    }
    let existingUser
    try{
        existingUser = await User.findOne({ email }) 
    }catch (err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message : 'email not found'})
    }
    const checkPassword = bcrypt.compareSync(password, existingUser.password)

    if(!checkPassword){
        return res.status(400).json({message : 'incorrect password'})
    }
    return res.status(200).json({message : 'log in sucessful'})


};

export const getBookingOfUser = async (req,res)=>{
    let userbookings
    try{
        userbookings = await Bookings.find({ user:req.params.id})
    }catch(err){
        console.log(err);
    }
    if(!userbookings){
        res.status(500).json({message : 'no bookings with this user'})
    }
    res.json({userbookings})
}