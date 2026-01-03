import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          await connectDB();
          
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }
          
          const email = credentials.email as string;
          const password = credentials.password as string;
          
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid email or password");
          }
          
          // Check if user has a password (OAuth users might not have one)
          if (!user.password) {
            throw new Error("Please sign in with Google or reset your password");
          }
          
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new Error("Invalid email or password");
          }
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // token k ander user ka data dalta hai
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          if (!user.email) {
            return false;
          }
          
          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            dbUser = await User.create({
              name: user.name || "User",
              email: user.email,
              image: user.image,
              role: "user",
            });
          }
          
          user.id = dbUser._id.toString();
          user.role = dbUser.role;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
  secret: process.env.AUTH_SECRET,
});

// connect db
// email check
// password match
