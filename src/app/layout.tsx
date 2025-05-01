
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

// Simple fallback while initial server components load or Suspense boundaries resolve
function GlobalLoadingFallback() {
  return (
     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
         {/* Basic spinner */}
         <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
     </div>
  );
}

// Fallback specifically for the Header during Suspense
function HeaderFallback() {
    // Render a placeholder matching the header's height and basic structure
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/40">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                {/* Placeholder elements matching header layout */}
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 bg-muted rounded-full animate-pulse"></div>
                    <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="flex-1 flex justify-center items-center px-2">
                    <div className="h-8 w-full max-w-md bg-muted rounded-full animate-pulse"></div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <div className="h-5 w-12 bg-muted rounded animate-pulse"></div>
                    <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
                    <div className="h-5 w-16 bg-muted rounded animate-pulse"></div>
                </div>
            </div>
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
        {/* Wrap Header in Suspense as it uses client hooks like useSearchParams */}
        <Suspense fallback={<HeaderFallback />}>
            <Header />
        </Suspense>
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

