import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Restaurant } from "@/app/lib/restaurantmodel"; // Ensure this is a model, not a schema
import "dotenv/config"; // Load environment variables

const connectionStr = process.env.MONGO_URI; // Ensure this is defined

async function connectDB() {
    if (!connectionStr) {
        throw new Error("MONGO_URI is not defined");
    }

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Optional in Mongoose 7+
        });
        console.log("MongoDB Connected");
    }
}

export async function GET() {
    try {
        await connectDB();

        const data = await Restaurant.find(); // Ensure Restaurant is a valid model

        return NextResponse.json({ result: true, data });
    } catch (error) {
        console.error("Connection error:", error.message);

        if (error.message.includes("IP that isn't whitelisted")) {
            console.log(
                "Ensure your IP is whitelisted in MongoDB Atlas: https://www.mongodb.com/docs/atlas/security-whitelist/"
            );
        }

        return NextResponse.json({ result: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const payload = await request.json();
        let result = null;
        let success = false;

        if (payload.login) {
            // Handle login
            result = await Restaurant.findOne({ email: payload.email, password: payload.password });
            if (result) success = true;
        } else {
            // Handle signup
            const restaurant = new Restaurant(payload);
            result = await restaurant.save();
            if (result) success = true;
        }

        return NextResponse.json({ result, success });
    } catch (error) {
        console.error("POST error:", error.message);
        return NextResponse.json({ result: false, error: error.message }, { status: 500 });
    }
}
