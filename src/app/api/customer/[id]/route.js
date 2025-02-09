import { Restaurant } from "@/app/lib/restaurantmodel";
import { NextResponse } from "next/server";
const connectionStr = process.env.MONGO_URI; // Ensure this is defined
import mongoose from "mongoose";
import { FoodModel } from "@/app/lib/foodsModel";
export async function GET(request,content) {
        // await mongoose.connect(connectionStr,{useNewUrlParser:true});
    
    console.log("id of the restsauran t",content.params.id);

const id=content.params.id;
await mongoose.connect(connectionStr,{useNewUrlParser:true});

const details=await Restaurant.findOne({_id:id})
const foodItems=await FoodModel.find({resto_id:id})

    return NextResponse.json({success:true,details,foodItems})
    
}