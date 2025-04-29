import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a clean default
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} antialiased flex flex-col min-h-screen bg-background`}>
        <Header />
        <main className="flex-grow container max-w-screen-2xl py-8">
          {children}
        </main>
        <Toaster /> {/* Add Toaster component */}
        <Footer />
      </body>
    </html>
  );
}
