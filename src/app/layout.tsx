
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from 'react'; // Keep Suspense import

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'GirlyCrafts Showcase',
  description: 'Handmade treasures for girls',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        {/* Header is now a Client Component, no Suspense needed here unless a parent Server Component passes searchParams */}
        <Header />
        {/* Adjusted main padding to match ShionHouse style - Removed container/max-width here, applied in pages/components */}
        <main className="flex-grow py-8 md:py-12">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
