import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/model/userModel";

// add new user to database
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );
    }

    const isExistingPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isExistingPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Login successfully", role: existingUser.role },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred while registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const allUsers = await User.find();
  console.log("GET request received:", allUsers);
  return NextResponse.json(allUsers);
}
