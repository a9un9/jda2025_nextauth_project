import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/lib/auth"; // atau langsung definisikan di sini

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
