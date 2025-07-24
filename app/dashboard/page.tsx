import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name} ({session?.user?.email})</p>
    </div>
  );
}
