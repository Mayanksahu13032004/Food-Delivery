import { Order } from "@/app/lib/ordersmodel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const connectionStr = process.env.MONGO_URI; 

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    const payload = await request.json(); // Extract entire request body
    console.log("Received Payload:", payload);

    let success = false;

    // ✅ Convert `deliveryBoy_id` to ObjectId
    // if (mongoose.Types.ObjectId.isValid(payload.deliveryBoy_id)) {
    //   payload.deliveryBoy_id = new mongoose.Types.ObjectId(payload.deliveryBoy_id);
    // } else {
    //   return NextResponse.json({ success: false, error: "Invalid deliveryBoy_id format" }, { status: 400 });
    // }

    const orderobj = new Order(payload);
    const result = await orderobj.save();

    if (result) success = true;

    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ success: false, error: "Failed to process the order" }, { status: 500 });
  }
}