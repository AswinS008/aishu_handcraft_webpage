
import type { Metadata } from 'next';
import { Poppins, Montserrat, Caveat } from 'next/font/google'; // Import Montserrat and Caveat
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from 'react';
import LoadingManager from '@/components/layout/loading-manager'; // Import LoadingManager

// Default font (adjust weights as needed)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins', // Assign CSS variable for Poppins
});

// Secondary/Heading font (adjust weights as needed)
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-montserrat', // Assign CSS variable for Montserrat
});

// Funky/Logo font
const caveat = Caveat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // Choose weights
    variable: '--font-caveat', // Assign CSS variable for Caveat
});


export const metadata: Metadata = {
  title: "Aishu's Handcraft", // Updated Title
  description: '🌺 Handmades and Customised..!!! 🎁 Return gifts..!!!', // Updated Description
};

// Simple fallback while initial server components load
function GlobalLoadingFallback() {
  return (
     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
         {/* You can put a very basic spinner or logo here if desired */}
         <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
     </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added suppressHydrationWarning back as removing it didn't fix the previous hydration issue,
    // and it's generally useful for things like theme switching or extensions modifying HTML.
    <html lang="en" suppressHydrationWarning={true}>
       {/* Combine font variables */}
       <body className={`${poppins.variable} ${montserrat.variable} ${caveat.variable} font-sans antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        {/* Adjusted top padding for dynamic island header (h-16 = 4rem) + buffer */}
        <main className="flex-grow pt-[5rem] md:pt-[5.5rem] py-8 md:py-12"> {/* Adjusted padding-top */}
           {/* Wrap children with LoadingManager to show loading screen on route changes */}
           <LoadingManager>
             {/* Add Suspense boundary around children */}
             <Suspense fallback={<GlobalLoadingFallback />}>
                 {children}
             </Suspense>
           </LoadingManager>
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
