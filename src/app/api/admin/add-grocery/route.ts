import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await auth();

    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized: You are not admin" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const price = formData.get("price") as string;
    const file = formData.get("image") as Blob | null;

    // Validate required fields
    if (!name || !category || !unit || !price) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const priceValue = Number(price);
    if (isNaN(priceValue)) {
      return NextResponse.json(
        { message: "Price must be a number" },
        { status: 400 }
      );
    }

    if (!file || file.size === 0) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadOnCloudinary(file);
    if (!imageUrl) {
      return NextResponse.json(
        { message: "Failed to upload image" },
        { status: 500 }
      );
    }

    const grocery = await Grocery.create({
      name,
      category,
      unit,
      price: priceValue,
      image: imageUrl,
    });

    return NextResponse.json(grocery, { status: 201 });
  } catch (error: any) {
    console.error("Add grocery error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to add grocery" },
      { status: 500 }
    );
  }
}
