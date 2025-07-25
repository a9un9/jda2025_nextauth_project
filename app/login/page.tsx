"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const [otpStatus, setOtpStatus] = useState<"expired" | "not_verified" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOtpStatus("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setIsLoading(false);
    if (res?.error) {
        if (res.error === "otp_expired") {
            setOtpStatus("expired");
        } else if (res.error === "not_verified") {
            setOtpStatus("not_verified");
        } else {
            setError(res.error);
        }
    } else {
        router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-teal-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-teal-600">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

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
                Processing...
                </>
            ) : (
                "Login"
            )}
            </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
        {otpStatus === "not_verified" && (
        <p className="text-sm text-yellow-600 mt-2">
            Akun belum diverifikasi.{" "}
            <Link
            href={`/verify-otp?email=${form.email}`}
            className="text-blue-600 hover:underline"
            >
            Klik di sini untuk verifikasi
            </Link>
        </p>
        )}

        {otpStatus === "expired" && (
        <p className="text-sm text-red-600 mt-2">
            OTP telah kadaluarsa.{" "}
            <Link
            href={`/request-otp?email=${form.email}`}
            className="text-blue-600 hover:underline"
            >
            Kirim ulang OTP
            </Link>
        </p>
        )}
      </div>
    </div>
  );
}
