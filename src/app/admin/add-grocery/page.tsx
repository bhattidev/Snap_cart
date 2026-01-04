"use client";

import { ArrowLeft, Loader, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
const addGrocery = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState<string | null>();
  const [backendImage, setBackendImage] = useState<Blob | File | null>();
  const [loading, setLoading] = useState(false);
  const categories = [
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
  ];
  const units = ["kg", "g", "liter", "ml", "piece", "pack"];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setBackendImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDate = new FormData();
      formDate.append("name", name);
      formDate.append("category", category);
      formDate.append("price", price);
      formDate.append("unit", unit);
      if (backendImage) {
        formDate.append("image", backendImage);
      }

      const result = await axios.post("/api/admin/add-grocery", formDate);
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative">
      <Link
        href={"/"}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:flex">Back to Home</span>
      </Link>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-green-600 w-8 h-8" />
            <h1>Add Your Grocery</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Fill out details below to add a new grocery items
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div>
            <label htmlFor="" className="block text-gray-700 font-medium mb-1">
              Your Grocery Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="eg: sweets,milk ..."
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor=""
                className="block text-gray-700 font-medium mb-1"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option value={cat} key={index}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-gray-700 font-medium mb-1"
              >
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                name="unit"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white"
              >
                <option value="">Select Unit</option>
                {units.map((unit, index) => (
                  <option value={unit} key={index}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-gray-700 font-medium mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="eg. 120"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <label
              htmlFor="image"
              className="cursor-pointer  flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded-xl px-6 py-3 hover:bg-green-100 transition-all w-full sm:w-auto"
            >
              <Upload className="w-5 h-5" /> Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            {preview && (
              <Image
                src={preview}
                width={100}
                height={100}
                alt="image"
                className="rounded-xl shadow-md border border-gray-200 object-cover"
              />
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            className="mt-4 w-full bg-linear-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              "Add Grocery"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default addGrocery;
