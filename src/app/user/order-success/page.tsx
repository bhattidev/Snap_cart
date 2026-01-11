"use client";
import { Check, CheckCircle } from "lucide-react";
import { motion, spring } from "motion/react";
const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-linear-to-b from-green-50 to-white">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: spring,
          damping: 10,
          stiffness: 100,
        }}
        className="relative"
      >
        <CheckCircle className="text-green-600 w-24 h-24 md:w-28 md:h-28" />
        <motion.div>
          <div className="w-full h-full rounded-full"></div>
        </motion.div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-green-700 mt-6"
      >
        Order PLace Successfully
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="text-gray-600 mt-3 text-sm md:text-base max-w-md"
      >
        Thank you for shopping with us! Your order has been placed and is being
        processed. You can track its progress in your
        <span className="font-semibold text-green-700"> My Orders</span>{" "}
        section.
      </motion.p>
    </div>
  );
};

export default OrderSuccess;
