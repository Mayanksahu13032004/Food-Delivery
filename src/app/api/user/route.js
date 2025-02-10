import mongoose from "mongoose";
import { User } from "@/app/lib/usermodel";
import { NextResponse } from "next/server";

const connectionStr = process.env.MONGO_URI;

export async function POST(request) {
    try {
        if (!connectionStr) {
            throw new Error("MONGO_URI is not defined.");
        }

        // Connect only if not already connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(connectionStr, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }

        // Parse the request body
        const payload = await request.json();

        // Ensure required fields are present
        if (!payload.name || !payload.email || !payload.password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // ✅ Check if user with the same email already exists
        const existingUser = await User.findOne({ email: payload.email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 409 }); // 409 Conflict
        }

        // Create and save the new user
        const newUser = new User({ ...payload });
        await newUser.save();

        return NextResponse.json({ success: true, user: newUser }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
