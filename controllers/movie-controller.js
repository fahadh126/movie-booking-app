import jwt from "jsonwebtoken"
import Movie from "../models/Movie";
import Admin from "../models/Admin";
import mongoose from "mongoose";

export const addMovie = async (req ,res)=>{
    const  extractedToken= req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim()=== ''){
        return res.status(404).json({message : 'token not found'})
    }
    
let adminId;
    // varify token
   jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) =>{
    if(err) {
        return res.status(400).json({message : `${err.message}`})
    }else{
        adminId = decrypted.id;
        return;
    }
   })
   //create movie
   const {title, description, releaseDate, posterUrl, featured, actors} = req.body;
   if(
    !title && title.trim()=== '' && 
   !description && description.trim()=== '' && 
   !posterUrl && posterUrl.trim()=== '')
   {
    return res.status(422).json({message : 'invalid inputs'})
   }

   let movie;  
   try{
    movie = new Movie({
        title,
        description,
        releaseDate: new Date(`${releaseDate}`),
        featured,
        actors,
        admin : adminId,
        posterUrl,

    })
    const session = await mongoose.startSession()
    const adminUser = await Admin.findById(adminId)
    session.startTransaction()
    await movie.save({ session })
    adminUser.addedMovies.push(movie)
    await adminUser.save({session})
    await session.commitTransaction(

    )
   }catch (err){
    console.log(err);
   }

   if(!movie){
    res.status(500).json({message : 'request failed'})
   }
   res.status(201).json({movie})
}

export const  getMovies = async (req, res)=>{

    let  movies;
    try{
        movies = await Movie.find()
    }
    catch(err) {
        console.log(err);
    }
    if(!movies){
        return res.status(500).json({message : 'request failed'})
    }
    res.status(200).json({movies})
};

export const getMovieById = async (req, res)=>{
    let movieId 
    try{
        movieId = await Movie.findById(req.params.id)
        console.log(movieId);
    }
    catch(err){
        console.log(err);
    }
    if(!movieId){
        return res.status(500).json({message: 'movie with this id cannot be find'})
    }
    res.status(200).json({movieId})
}