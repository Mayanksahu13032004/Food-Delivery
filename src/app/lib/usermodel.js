import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    city:{
      type:String,
    },
    address:{
      type:String,
    },
    contact:{
      type:Number
    }
   
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Check if the model is already compiled to prevent overwriting issues in development
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
