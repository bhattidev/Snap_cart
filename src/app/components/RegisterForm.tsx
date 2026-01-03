"use client";

import googleLogo from "@/assets/google_logo.png";
import { motion } from "motion/react";
import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Leaf,
  Loader2,
  Lock,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {
  backStep: (step: number) => void;
};

const RegisterForm = ({ backStep }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // Auto login after successful registration
        try {
          const loginResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (loginResult?.ok) {
            // Force a full page reload to ensure session is properly loaded
            window.location.href = "/";
          } else {
            // Registration successful but login failed
            const errorMsg = loginResult?.error === "CredentialsSignin" 
              ? "Registration successful, but auto-login failed. Please login manually."
              : loginResult?.error || "Registration successful, but auto-login failed. Please login manually.";
            setError(errorMsg);
            setLoading(false);
            // Redirect to login after showing error
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          }
        } catch (loginError: any) {
          console.error("Auto-login error:", loginError);
          setError("Registration successful, but auto-login failed. Please login manually.");
          setLoading(false);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  const formValidation = name !== "" && email !== "" && password !== "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      {/* Back Button */}
      <button
        type="button"
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
        onClick={() => backStep(1)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      {/* Heading */}
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Create Account
      </motion.h1>

      <p className="text-gray-600 mb-8 flex items-center gap-1">
        Join Snapcart today <Leaf className="w-5 h-5 text-green-600" />
      </p>

      {/* Form */}
      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3.5 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <EyeIcon />}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={!formValidation || loading}
          className={`hover:cursor-pointer w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${
            formValidation
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
          <span className="flex-1 h-px bg-gray-200"></span>
          OR
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>
      </motion.form>

      {/* Google */}
      <button
        type="button"
        className="max-w-sm mt-5 hover:cursor-pointer w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <Image
          src={googleLogo}
          alt="Google Logo"
          width={20}
          style={{ height: "auto" }}
        />
        Continue with Google
      </button>

      {/* Login */}
      <p
        className="cursor-pointer text-gray-600 mt-6 text-sm flex items-center gap-1"
        onClick={() => router.push("/login")}
      >
        Already have an account? <LogIn className="w-4 h-4" />
        <span className="text-green-600">Sign In</span>
      </p>
    </div>
  );
};

export default RegisterForm;
