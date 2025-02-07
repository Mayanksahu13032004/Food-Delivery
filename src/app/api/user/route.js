import { User } from "@/app/lib/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json(); // Parse the request body
        
        const newUser = new User({ name, email, password });
        await newUser.save();

        return NextResponse.json(
            { message: "User created successfully", user: newUser },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating user", error: error.message },
            { status: 500 }
        );
    }
}
