"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      setMessage("Email tidak ditemukan. Silakan akses tautan dari email Anda.");
    }
  }, [email]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (otp.length !== 6) {
      setMessage("OTP harus 6 digit.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        if (data.error?.toLowerCase().includes("kadaluarsa")) {
          setMessage("OTP Anda sudah kadaluarsa. Silakan minta ulang.");
          setTimeout(() => {
            router.push(`/request-otp?email=${email}`);
          }, 2000);
        } else {
          setMessage(data.error || "OTP salah");
        }
      } else {
        setMessage("Verifikasi berhasil! Mengalihkan ke halaman login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-teal-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Verifikasi OTP
        </h2>

        {email && (
          <p className="text-sm text-gray-600 mb-4 text-center">
            Silakan masukkan OTP yang dikirim ke <br />
            <span className="font-medium text-blue-600">{email}</span>
          </p>
        )}

        <form onSubmit={handleVerify} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Masukkan OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            inputMode="numeric"
            maxLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.toLowerCase().includes("berhasil")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
