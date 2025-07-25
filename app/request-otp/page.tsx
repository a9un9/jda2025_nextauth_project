"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResendOTPPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    const res = await fetch("/api/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (!res.ok) {
      setError(data.error || "❌ Gagal mengirim OTP");
    } else {
      setMessage("✅ OTP baru telah dikirim. Silakan cek email Anda.");
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Kirim Ulang OTP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}

            <button
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 transition duration-200 disabled:opacity-50"
            >
            {isLoading ? (
                <>
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    ></circle>
                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
                Mengirim...
                </>
            ) : (
                "Kirim OTP Baru"
            )}
            </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Sudah punya OTP?{" "}
          
          <Link href="/verify-otp" className="text-indigo-600 hover:underline">
            Verifikasi di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
