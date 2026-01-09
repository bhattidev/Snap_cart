"use client";

import { ArrowLeft, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, scale } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cartData, subTotal, finalTotal, deliveryFee } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div className="w-[95%] sm:w-[90%] md:w-[80%] mx-auto mt-8 mb-24 relative">
      {/* Back */}
      <Link
        href="/"
        className="absolute -top-2 left-0 flex items-center gap-2 text-green-700 hover:text-green-800 font-medium"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 text-center mb-10"
      >
        🛒 Your Shopping Cart
      </motion.h2>

      {/* Empty Cart */}
      {cartData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white rounded-2xl shadow-md"
        >
          <ShoppingBasket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-6">
            Your cart is empty. Add some groceries to continue shopping!
          </p>
          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence>
              {cartData.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-md p-5 mb-4"
                >
                  <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-3"
                    />
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-4 flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.unit}</p>
                    <p className="text-green-700 font-bold">
                      Rs. {Number(item.price) * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-3 sm:mt-0 bg-gray-50 px-3 py-2 rounded-full">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="bg-white p-1.5 rounded-full border"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="bg-white p-1.5 rounded-full border"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="sm:ml-4 mt-3 sm:mt-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-24 border border-gray-100 flex flex-col"
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-gray-700 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span className="text-green-700 font-semibold">
                  Rs. {subTotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delievery Fee</span>
                <span className="text-green-700 font-semibold">
                  Rs. {deliveryFee}
                </span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-lg sm:text-xl">
                <span>Final Total</span>
                <span className="text-green-700 font-semibold">
                  Rs. {finalTotal}
                </span>
              </div>
            </div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-all font-semibold text-sm sm:text-base text-center"
              onClick={() => router.push("/user/checkout")}
            >
              Proceed to Checkout
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
