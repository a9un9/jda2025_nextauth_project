'use client';
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed">
      <div className="p-4 text-xl font-bold border-b">MyApp</div>
      <nav className="p-4 space-y-2">
        <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">🏠 Dashboard</Link>
        <Link href="/profile" className="block text-gray-700 hover:text-blue-600">👤 Profile</Link>
        <Link href="/settings" className="block text-gray-700 hover:text-blue-600">⚙️ Settings</Link>
      </nav>
    </aside>
  );
}
