"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Selamat datang, {session?.user?.email}</h1>

      {/* Tombol logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
