"use client";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  );
}
