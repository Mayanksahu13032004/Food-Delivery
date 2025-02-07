import { FoodModel } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const connectionStr = process.env.MONGO_URI; // Ensure this is defined

export async function GET(request, content) {
    const id = content.params.id;
    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await FoodModel.findOne({ _id: id });

    if (result) {
        success = true;
    }

    return NextResponse.json({ result, success });
}

// ✅ Remove the duplicate import of `mongoose`
// import { connectionStr } from "@/config/db"; // Already defined above

export async function PUT(request, content) {
    try {
        const id = content.params.id;
        const payload = await request.json();

        const result = await FoodModel.findOneAndUpdate(
            { _id: id },
            payload,
            { new: true } // ✅ Returns updated document
        );

        if (!result) {
            return NextResponse.json({ success: false, message: "Food item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error updating food item:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
