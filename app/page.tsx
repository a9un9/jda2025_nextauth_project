// // app/page.tsx
// import { redirect } from 'next/navigation';

// export default function Home() {
//   redirect('/login');
// }


// app/page.tsx
export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Selamat Datang</h1>
        <p className="text-gray-600">Ini adalah halaman publik tanpa login.</p>
      </div>
    </main>
  );
}
