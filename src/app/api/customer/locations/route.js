import { Restaurant } from "@/app/lib/restaurantmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const connectionStr = process.env.MONGO_URI; // Ensure this is defined

export async function GET() {
        await mongoose.connect(connectionStr,{useNewUrlParser:true});
        let result=await Restaurant.find();
        console.log("REsult",result);
        result=result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1))
        // remove duplicate 
        
        result=[...new Set(result.map((item)=>item))]
    return NextResponse.json({success:true,result});
}