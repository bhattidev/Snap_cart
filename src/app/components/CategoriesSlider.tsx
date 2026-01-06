"use client";
import {
  Apple,
  Baby,
  Beef,
  ChevronLeft,
  ChevronRight,
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
import { useEffect, useRef } from "react";
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
const CategoriesSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = direction === "left" ? -300 : 300;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const checkScroll = () => {
    if (!scrollRef.current) return;
  };
  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", checkScroll);
    return () => removeEventListener("scroll", checkScroll);
  }, []);
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
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg transition-all hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6 text-green-700" />
      </button>
      <div
        className="flex gap-6 overflow-x-auto px-10 pb-4 scrollbar-hiden scroll-smooth"
        ref={scrollRef}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, amount: 0.5 }}
              className={`${category.bg} min-w-[150px] md:min-w-[180px] flex flex-col items-center justify-center rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className="flex flex-col items-center justify-center p-5">
                <Icon className="w-10 h-10 text-green-700 mb-3" />
                <p className="text-center text-sm md:text-base font-semibold text-gray-700">
                  {category.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg transition-all hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6 text-green-700" />
      </button>
    </motion.div>
  );
};

export default CategoriesSlider;
