import "server-only";
import mongoose, { Schema, Model } from "mongoose";
import type { Registor } from "@/type/index";

const registorSchema = new Schema<Registor>({
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
const Registor: Model<Registor> =
  mongoose.models.Registor ||
  mongoose.model<Registor>("Registor", registorSchema);
export default Registor;
