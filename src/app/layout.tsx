
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Import Poppins font
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from 'react'; // Import Suspense for Header search state

// Configure Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Include desired weights
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
      {/* Apply Poppins font class to body */}
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen bg-background`}>
        {/* Wrap Header in Suspense if it needs to read searchParams directly */}
        <Suspense>
         <Header />
        </Suspense>
        <main className="flex-grow container max-w-screen-2xl py-8">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
