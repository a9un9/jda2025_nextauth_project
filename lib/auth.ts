import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("Email tidak ditemukan");

        // // ✅ Tambahkan pengecekan jika belum verifikasi
        // if (!user.verified) {
        //   const now = new Date();
        //   if (!user.otpExpiry || user.otpExpiry < now) {
        //     throw new Error("OTP sudah kadaluarsa. Silakan minta ulang OTP.");
        //   } else {
        //     throw new Error("Akun belum diverifikasi. Silakan cek email Anda.");
        //   }
        // }
        if (!user.verified) {
            const now = new Date();
            const otpExpiry = user.otpExpiry ? new Date(user.otpExpiry) : null;

            if ((otpExpiry && now > otpExpiry)) {
                const error = new Error("otp_expired");
                error.name = "Redirect";
                throw error;
            }

            if (!user.verified) {
                const error = new Error("not_verified");
                error.name = "Redirect";
                throw error;
            }
        }

        const isMatch = await bcrypt.compare(credentials!.password, user.password);
        if (!isMatch) throw new Error("Password salah");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",         // halaman login custom
    error: "/login",          // redirect error ke login
  },
  secret: process.env.NEXTAUTH_SECRET,
};
