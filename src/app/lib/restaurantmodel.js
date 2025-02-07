// const { default: mongoose } = require("mongoose");
import mongoose from "mongoose";



const restaurantModel=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contact:String,
});

export const Restaurant=mongoose.models.restaurantSchema || mongoose.model("restaurantSchema",restaurantModel)