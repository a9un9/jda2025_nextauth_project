'use client';
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md p-4 pl-72 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="text-right">
        <p className="text-gray-800 font-medium">{session?.user?.name}</p>
        <p className="text-gray-500 text-sm">{session?.user?.email}</p>
      </div>
    </header>
  );
}
