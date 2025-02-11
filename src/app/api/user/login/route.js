import { User } from "@/app/lib/usermodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const connectionStr = process.env.MONGO_URI; // Ensure this is defined

export async function POST(request) {

    const payload=await request.json();
    let success=false;
await mongoose.connect(connectionStr,{useNewUrlParser:true});
const result=await User.findOne({email:payload.email,password:payload.password});
if(result){
    success=true;
}

    return NextResponse.json({result,success});
}