
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        {/* Add padding top to account for fixed/sticky header AND sticky category tabs */}
        {/* Approx height of header (h-16 = 4rem) + height of tabs (py-3 + button height ~ 3rem) + some buffer */}
        <main className="flex-grow pt-[8rem] md:pt-[7.5rem] py-8 md:py-12"> {/* Adjusted padding-top */}
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
