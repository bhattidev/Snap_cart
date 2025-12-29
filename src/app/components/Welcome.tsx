"use client";

import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

type Props = {
  nextStep: (step: number) => void;
};

const Welcome = ({ nextStep }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      {/* Logo & Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <ShoppingBasket className="w-10 h-10 text-green-700" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
          Snapcart
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
      >
        Your one-step destination for fresh groceries, organic produce, and
        daily essentials right to your doorstep.
      </motion.p>

      {/* Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center justify-center mt-10"
      >
        <ShoppingBasket className="w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 50, // move 50px to the right
          }}
          transition={{
            duration: 3, // slow movement
            delay: 0.5,
            repeat: Infinity, // repeat indefinitely
            repeatType: "reverse", // back and forth
          }}
        >
          <Bike className="w-24 h-24 md:w-32 md:h-32 text-orange-500 drop-shadow-md" />
        </motion.div>
      </motion.div>

      {/* Next Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={() => nextStep(2)}
        className="hover:cursor-pointer inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 mt-10"
      >
        Next
        <ArrowRight />
      </motion.button>
    </div>
  );
};

export default React.memo(Welcome);
