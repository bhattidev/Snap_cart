import User from "@/models/user.model";
import Order from "@/models/order.model";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, items, paymentMethod, totalAmount, address } =
      await req.json();

    // Validation
    if (
      !userId ||
      !items ||
      items.length === 0 ||
      !paymentMethod ||
      !totalAmount ||
      !address
    ) {
      return NextResponse.json(
        { message: "Please send all required fields" },
        { status: 400 }
      );
    }

    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create order
    const newOrder = await Order.create({
      user: userId,
      items,
      paymentMethod,
      totalAmount,
      address,
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while placing order",
      },
      { status: 500 }
    );
  }
}
