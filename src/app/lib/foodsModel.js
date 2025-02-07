import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    path: { type: String, required: true },
    description: { type: String, required: true },
    resto_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Restaurant" } // Reference to restaurant
});

export const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);
