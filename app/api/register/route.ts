import { prisma } from "@/lib/prisma";
import { sendEmailOTP } from "@/lib/mail";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
  }

    const now = new Date();
    const wibOffset = 7 * 60 * 60 * 1000; // +7 jam dalam milidetik
    const wibDate = new Date(now.getTime() + wibOffset);

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(wibDate.getTime() + 15 * 60 * 1000); // 15 menit

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      otp,
      otpExpiry,
      verified: false,
      createdAt: wibDate,
    },
  });

  await sendEmailOTP(email, otp); // Kirim email OTP

  return NextResponse.json({ message: "User created & OTP sent" });
}
