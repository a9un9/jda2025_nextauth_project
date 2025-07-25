"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
            } else {
                const data = await res.json();
                setError(data.error || "Registration failed");
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-teal-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-teal-600">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                "Register"
            )}
            </button>

        </form>
        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
function setMsg(arg0: any) {
    throw new Error("Function not implemented.");
}

