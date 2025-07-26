"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Selamat datang di Dashboard</h2>
      <p>Anda login sebagai <strong>{session?.user?.email}</strong>.</p>
    </DashboardLayout>
  );
}
