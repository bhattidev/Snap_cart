import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

// User -> /api/auth/sigin (NextAuth routh)
// Provider (Google/Credentials)
// JWT Token Generate
// Session Create hoti hai
// Frontend: useSession() sy access krty hain
