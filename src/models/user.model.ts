import mongoose, { Schema, Types } from "mongoose";

/* =======================
   Interface
======================= */

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  createdAt?: Date;
  updatedAt?: Date;
}

/* =======================
   Schema
======================= */

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      select: false, // 🔐 security best practice
    },

    mobile: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin"],
      default: "user",
    },

    image: {
      type: String,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);

/* =======================
   Index
======================= */

userSchema.index({ location: "2dsphere" });

/* =======================
   Model
======================= */

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
