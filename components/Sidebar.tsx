import Link from "next/link";
import { Home, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-6 shadow-md hidden md:block">
      <h2 className="text-xl font-bold text-teal-600 mb-6">JDA App</h2>
      <nav className="space-y-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-teal-600">
          <Home size={18} /> Dashboard
        </Link>
        <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-teal-600">
          <User size={18} /> Profile
        </Link>
      </nav>
    </aside>
  );
}
