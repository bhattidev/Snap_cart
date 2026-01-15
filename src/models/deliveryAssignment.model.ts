import mongoose, { Schema, Types } from "mongoose";

/* =======================
   Interface
======================= */

export interface IDeliveryAssignment {
  _id?: Types.ObjectId;
  order: Types.ObjectId;
  broadcastedTo: Types.ObjectId[];
  assignTo?: Types.ObjectId | null;
  status: "broadcasted" | "assigned" | "completed";
  acceptedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/* =======================
   Schema
======================= */

const deliveryAssignmentSchema = new Schema<IDeliveryAssignment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    broadcastedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    assignTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["broadcasted", "assigned", "completed"],
      default: "broadcasted",
    },

    acceptedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

/* =======================
   Model
======================= */

const DeliveryAssignment =
  mongoose.models.DeliveryAssignment ||
  mongoose.model<IDeliveryAssignment>(
    "DeliveryAssignment",
    deliveryAssignmentSchema
  );

export default DeliveryAssignment;
