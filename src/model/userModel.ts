import "server-only";
import mongoose, { Schema, Model } from "mongoose";
import type { Register } from "@/type/index";

const userSchema = new Schema<Register>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
});

// Reuse the model when Next.js reloads the file.
const User: Model<Register> =
  mongoose.models.User || mongoose.model<Register>("users", userSchema);

export default User;
