import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { name, email, password } = await request.json();
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be atleast 6 character",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Register Error ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}

// api/auth/register
// db connect
// name, email, password
// email check
// password check 6 character
// password hash
// user create
