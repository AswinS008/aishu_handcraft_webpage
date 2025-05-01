
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
  title: "Aishu's Handcraft", // Updated Title
  description: '🌺 Handmades and Customised..!!! 🎁 Return gifts..!!!', // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added suppressHydrationWarning back as removing it didn't fix the previous hydration issue,
    // and it's generally useful for things like theme switching or extensions modifying HTML.
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        {/* Re-evaluate padding: Header (h-16 = 4rem) + Tabs (~3rem) + buffer */}
        {/* Keeping it simple for now, adjust if overlap occurs */}
        <main className="flex-grow pt-[7rem] md:pt-[7rem] py-8 md:py-12"> {/* Simplified padding */}
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
