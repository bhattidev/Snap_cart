import mongoose from "mongoose";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const grocerySchema = new mongoose.Schema<IGrocery>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Fruits, Vegetables & Organic",
        "Dairy & Eggs",
        "Rice, Atta, Grains & Pulses",
        "Meat & Seafood",
        "Bakery & Bread",
        "Beverages",
        "Cooking Oils, Ghee & Spices",
        "Noodles, Pasta & Sauces",
        "Frozen Foods",
        "Personal & Baby Care",
        "Health & Wellness",
        "Household Cleaning",
      ],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "liter", "ml", "piece", "pack"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Grocery =
  mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);
export default Grocery;
