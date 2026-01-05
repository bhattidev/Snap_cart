"use client";
import {
  Apple,
  Baby,
  Beef,
  Coffee,
  Croissant,
  Droplet,
  HeartPulse,
  Milk,
  Snowflake,
  SprayCan,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
import { motion } from "motion/react";

const CategoriesSlider = () => {
  const categories = [
    {
      id: 1,
      name: "Fruits, Vegetables & Organic",
      icon: Apple,
      bg: "bg-green-100",
    },
    { id: 2, name: "Dairy & Eggs", icon: Milk, bg: "bg-blue-100" },
    {
      id: 3,
      name: "Rice, Atta, Grains & Pulses",
      icon: Wheat,
      bg: "bg-yellow-100",
    },
    { id: 4, name: "Meat & Seafood", icon: Beef, bg: "bg-red-100" },
    { id: 5, name: "Bakery & Bread", icon: Croissant, bg: "bg-orange-100" },
    { id: 6, name: "Beverages", icon: Coffee, bg: "bg-amber-100" },
    {
      id: 7,
      name: "Cooking Oils, Ghee & Spices",
      icon: Droplet,
      bg: "bg-lime-100",
    },
    {
      id: 8,
      name: "Noodles, Pasta & Sauces",
      icon: UtensilsCrossed,
      bg: "bg-purple-100",
    },
    { id: 9, name: "Frozen Foods", icon: Snowflake, bg: "bg-cyan-100" },
    { id: 10, name: "Personal & Baby Care", icon: Baby, bg: "bg-pink-100" },
    { id: 11, name: "Health & Wellness", icon: HeartPulse, bg: "bg-rose-100" },
    { id: 12, name: "Household Cleaning", icon: SprayCan, bg: "bg-sky-100" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
      className="w-[90%] md:w-[80%] mx-auto mt-10 relative"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
        🛒 Shop by category
      </h2>
      <div className="flex gap-6 overflow-x-auto px-10 pb-4 scrollbar-hiden scroll-smooth"></div>
    </motion.div>
  );
};

export default CategoriesSlider;
