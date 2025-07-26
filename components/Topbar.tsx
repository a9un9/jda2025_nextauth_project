"use client";

import { useSession, signOut } from "next-auth/react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{session?.user?.email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
