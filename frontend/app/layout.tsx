// app/layout.tsx
"use client"; // Ensure this is included if you're using hooks like useState, useEffect

import { AuthProvider } from '@/context/AuthContext';
import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <head>
          <Head>
            <title>Event Management Platform</title>
            {/* Add other meta tags here if needed */}
          </Head>
        </head>
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
