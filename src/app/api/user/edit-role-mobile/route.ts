import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// GET: Get user checkout info
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    // Send user data for checkout
    return NextResponse.json({ userData: user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Fetching checkout info failed", error: String(error) },
      { status: 500 }
    );
  }
}

// POST: Update user's mobile or role
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { mobile, role } = body;

    if (!mobile) {
      return NextResponse.json(
        { message: "Mobile is required" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { mobile, ...(role && { role }) },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    return NextResponse.json({ userData: user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Edit role & mobile failed", error: String(error) },
      { status: 500 }
    );
  }
}
