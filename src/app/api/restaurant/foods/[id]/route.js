import { FoodModel, foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Result } from "postcss";
const connectionStr = process.env.MONGO_URI; // Ensure this is defined

export async function GET(request,content) {
    const id=content.params.id;
    console.log("Id",id);
    let success=false;


    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    // const result=await foodSchema.find({name:'feriferi'});

    const result=await FoodModel.find({resto_id:id});
    if(result){
        success=true;
    }
    
    return NextResponse.json({result,success})
}

    export async function DELETE(request,content) {
        const id=content.params.id;
        console.log("id",id);
        
        let success=false;
        await mongoose.connect(connectionStr,{useNewUrlParser:true});
        const result=await FoodModel.deleteOne({_id:id});
        if(result.deletedCount>0){
            success=true;
        }
        return NextResponse.json({result,success});

    }