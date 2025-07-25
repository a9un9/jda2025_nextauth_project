import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email dan OTP wajib diisi" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.otp || !user.otpExpiry) {
    return NextResponse.json({ error: "Data OTP tidak ditemukan" }, { status: 404 });
  }

  const now = new Date();
  const expiredAt = new Date(user.otpExpiry);

  if (now > expiredAt) {
    return NextResponse.json({ error: "OTP sudah kadaluarsa" }, { status: 400 });
  }

  if (user.otp !== otp) {
    return NextResponse.json({ error: "OTP salah" }, { status: 400 });
  }

  // ✅ Update hanya kalau OTP valid dan belum kadaluarsa
  await prisma.user.update({
    where: { email },
    data: {
      otp: null,
      otpExpiry: null,
      verified: true,
    },
  });

  return NextResponse.json({ message: "OTP berhasil diverifikasi" });
}
