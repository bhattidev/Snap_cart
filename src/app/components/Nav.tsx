"use client";

import {
  ShoppingCartIcon,
  User,
  Search,
  Package,
  LogOut,
  Cross,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";

interface IUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: "User" | "Delivery Boy" | "Admin";
  image?: string;
}

const Nav = ({ user }: { user?: IUser }) => {
  const [open, setOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const profileDropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4 md:px-8 z-50">
      {/* LOGO */}
      <Link
        href="/"
        className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
      >
        Snapcart
      </Link>

      {/* SEARCH */}
      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md gap-2">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search groceries..."
          className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </form>

      <div className="flex items-center gap-3 md:gap-6 relative">
        <div
          onClick={() => setSearchBar((pre) => !pre)}
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition md:hidden"
        >
          <Search className="text-green-600 w-6 h-6" />
        </div>

        {/* CART */}
        <Link
          href="/cart"
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <ShoppingCartIcon className="text-green-600 w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow">
            0
          </span>
        </Link>

        {/* USER AVATAR */}
        <div ref={profileDropDown} className="relative">
          <div
            className="relative bg-white rounded-full w-11 h-11 overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user?.image ? (
              <Image
                src={user.image}
                alt="User"
                fill
                sizes="44px"
                className="object-cover rounded-full"
              />
            ) : (
              <User className="w-6 h-6 text-green-600 m-auto" />
            )}
          </div>

          <AnimatePresence>
            {open && user && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50"
              >
                <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-100">
                  <div className="relative w-10 h-10 rounded-full bg-green-100 overflow-hidden flex items-center justify-center">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="User"
                        fill
                        sizes="40px"
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-green-600" />
                    )}
                  </div>

                  <div>
                    <div className="text-gray-800 font-semibold">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>

                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium"
                >
                  <Package className="w-5 h-5 text-green-600" />
                  My Orders
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center w-full gap-2 text-left p-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {searchBar && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg z-40 flex items-center px-4 py-2"
              >
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <form action="" className="grow">
                  <input
                    type="text"
                    placeholder="Search Gloceries..."
                    className="w-full outline-none text-gray-700"
                  />
                </form>
                <button>
                  <X
                    className="text-gray-500 w-5 h-5"
                    onClick={() => setSearchBar(false)}
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Nav;
