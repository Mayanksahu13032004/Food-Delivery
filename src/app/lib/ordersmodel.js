import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: mongoose.Schema.Types.ObjectId,
    foodItems: String,
    resto_id: mongoose.Schema.Types.ObjectId,
    deliveryBoy_id: Number, // ✅ Change from ObjectId to String
    status: String,
    amount: String,
  }
);

// Check if the model is already compiled to prevent overwriting issues in development
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
