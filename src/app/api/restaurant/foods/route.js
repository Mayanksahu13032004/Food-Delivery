import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { FoodModel } from "@/app/lib/foodsModel";

const connectionStr = process.env.MONGO_URI;

export async function POST(request) {
    try {
        const payload = await request.json();

        if (!payload.name || !payload.price || !payload.path || !payload.description || !payload.resto_id) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Connect to MongoDB
        await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

        // Save new food item
        const food = new FoodModel(payload);
        const result = await food.save();

        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
