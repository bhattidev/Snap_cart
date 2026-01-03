"use client";

import axios from "axios";
import { ArrowRight, Bike, UserCog, UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const EditRoleMobile = () => {
  const router = useRouter();
  const roles = [
    { id: "admin", label: "Admin", icon: UserCog },
    { id: "user", label: "User", icon: UserIcon },
    { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
  ];

  const [selectRole, setSelectRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const { update } = useSession();

  const isValidMobile = /^03\d{9}$/.test(mobile);

  const handleEdit = async () => {
    if (!selectRole || !isValidMobile) return;

    try {
      setLoading(true);

      await axios.post("/api/user/edit-role-mobile", {
        role: selectRole,
        mobile,
      });
      await update({ role: selectRole });

      // Force a full page reload to refresh session
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 w-full">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-green-700 text-center mt-8"
      >
        Select Your Role
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectRole === role.id;

          return (
            <motion.div
              key={role.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectRole(role.id)}
              className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-green-600 bg-green-100 shadow-lg"
                    : "border-gray-300 bg-white hover:border-green-400"
                }`}
            >
              <Icon size={36} />
              <span className="mt-2 font-medium">{role.label}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center mt-10"
      >
        <label className="mb-2 font-medium text-gray-700">
          Enter Your Mobile Number
        </label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="03xxxxxxxxx"
          className="w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        disabled={!selectRole || !isValidMobile || loading}
        onClick={handleEdit}
        className={`w-60 mt-10 inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition
          ${
            selectRole && isValidMobile && !loading
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {loading ? (
          "Please wait..."
        ) : (
          <>
            Go to Home <ArrowRight />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default EditRoleMobile;
