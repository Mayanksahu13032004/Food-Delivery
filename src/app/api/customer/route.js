// import { NextResponse } from "next/server";
// const connectionStr = process.env.MONGO_URI; // Ensure this is defined
// import mongoose from "mongoose";
// import { Restaurant } from "@/app/lib/restaurantmodel";
// import { Regex } from "lucide-react";
// export async function GET(request) {

//     let queryParams = request.nextUrl.searchParams
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });

//     console.log("All Query params", queryParams);
//     // any query is search according to the get in the bracket
//     console.log("query params loaction", queryParams.get('restaurant'));
//     let filter = {}
//     if (queryParams.get("locations")) {
//         let city = queryParams.get("locations");
//         filter = { city: { $regex: new RegExp(city, 'i') } };

//     }
//     else if (queryParams.get("restaurant")) {
//         let name = queryParams.get("restaurant");
//         filter = { name: { $regex: new RegExp(name, 'i') } };

//     }
//     let result = await Restaurant.find(filter);

//     return NextResponse.json({ success: true, result });
// }

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Restaurant } from "@/app/lib/restaurantmodel";

const connectionStr = process.env.MONGO_URI; 

export async function GET(request) {
    const queryParams = request.nextUrl.searchParams;
    await mongoose.connect(connectionStr, { useUnifiedTopology: true });
    
    console.log("Query Parameters:", queryParams);

    let filter = {};

    if (queryParams.get("location")) {
        const city = queryParams.get("location");
        filter.city = { $regex: new RegExp(city, "i") };
    }
    if (queryParams.get("restaurant")) {
        const name = queryParams.get("restaurant");
        filter.name = { $regex: new RegExp(name, "i") };
    }

    try {
        const result = await Restaurant.find(filter);
        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
