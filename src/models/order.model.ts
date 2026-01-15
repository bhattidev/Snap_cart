import mongoose, { Schema, Types } from "mongoose";

/* =======================
   Sub Interfaces
======================= */

interface IOrderItem {
  grocery: Types.ObjectId;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

interface IAddress {
  fullName: string;
  mobile: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  latitude?: number;
  longitude?: number;
}

/* =======================
   Main Interface
======================= */

export interface IOrder {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  items: IOrderItem[];
  isPaid: boolean;
  totalAmount: number;
  paymentMethod: "cod" | "online";
  address: IAddress;
  assignment?: Types.ObjectId | null;
  assignedDeliveryBoy?: Types.ObjectId;
  status: "pending" | "out_for_delivery" | "delivered";
  createdAt?: Date;
  updatedAt?: Date;
}

/* =======================
   Schema
======================= */

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        grocery: {
          type: Schema.Types.ObjectId,
          ref: "Grocery",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        unit: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    isPaid: {
      type: Boolean,
      default: false,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },

    address: {
      fullName: { type: String, required: true },
      mobile: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      fullAddress: { type: String, required: true },
      latitude: Number,
      longitude: Number,
    },

    assignment: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryAssignment",
      default: null,
    },

    assignedDeliveryBoy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "out_for_delivery", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

/* =======================
   Model
======================= */

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
