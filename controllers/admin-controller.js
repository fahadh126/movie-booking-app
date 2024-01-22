import Admin from "../models/Admin";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const addAdmin = async (req,res,next)=>{
    const { email, password } = req.body;
    if(!email && email.trim() === '' && !password && password.trim()=== ''){
      return res.status(422).json({message : 'invalid inputs'})
    }
    let existingAdmin
    try {
        existingAdmin = await Admin.findOne({email})
    }catch (err) {
      return  console.log(err);
    }
  if(existingAdmin){
   return res.status(400).json({message : 'admin already exist'})
  }

  let admin;
  const hashedPassword = bcrypt.hashSync(password);
  try{
    admin = new Admin({email, password : hashedPassword})
    admin = await admin.save()
    
  }catch ( err ) {
    return console.log(err);
  }
  if (!admin){
    res.status(500).json({message : "admin not found"})
  }res.status(200).json({admin})
  
}

export const adminLogin = async ( req,res)=>{
  const {email , password} = req.body

  if(!email && email.trim() === '' && !password && password.trim() === ''){
    res.status(422).json({message : 'invalid inputs'})
  }
  let existingAdmin
  try{
     existingAdmin = await Admin.findOne({email})
}catch(err){
  console.log(err);
}
 if(!existingAdmin){
  res.status(400).json({message : 'admin not found'})
 }
 const isPasswordCorrect = bcrypt.compareSync(password , existingAdmin.password)

 if(!isPasswordCorrect){
  res.status(500).json({message : 'incorrect password'})
 }

 const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
      expiresIn : '5d',
 })
 res.status(200).json({message : "login sucessful",token , id:existingAdmin._id})
}
 
export const getAdmin = async (req, res) =>{
  let allAdmin
  try{
    allAdmin = await Admin.find();
  }catch(err){
    console.log(err);
  }
   if(!allAdmin){
    res.status(500).json({message: 'admins not found'})
   }
   res.status(201).json({allAdmin})
}