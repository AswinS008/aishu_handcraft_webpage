
'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingManagerProps {
  children: ReactNode;
}

// Art-themed Loading Spinner
function ArtLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Optional: Text or different art animation */}
       <motion.div
         className="relative w-24 h-4 overflow-hidden"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.1 }}
       >
         <div className="absolute left-0 top-0 h-full w-1 bg-primary animate-brush-stroke" style={{ animationDelay: '0s' }}></div>
         <div className="absolute left-0 top-0 h-full w-1 bg-secondary animate-brush-stroke" style={{ animationDelay: '0.2s' }}></div>
         <div className="absolute left-0 top-0 h-full w-1 bg-accent animate-brush-stroke" style={{ animationDelay: '0.4s' }}></div>
       </motion.div>
      <p className="text-muted-foreground mt-4 text-sm">Crafting your view...</p>
    </div>
  );
}


export default function LoadingManager({ children }: LoadingManagerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial page load
  const initialLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeouts on mount/cleanup
    if (initialLoadTimeoutRef.current) clearTimeout(initialLoadTimeoutRef.current);
    if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);

    if (isInitialLoad) {
        setIsLoading(true);
        // Keep loading screen for a minimum duration on initial load
        initialLoadTimeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            setIsInitialLoad(false); // Mark initial load as complete
        }, 800); // Adjust duration as needed (e.g., 800ms)
    } else {
        // For subsequent navigations
        setIsLoading(true);
        // Set a shorter timeout to hide loading screen after navigation starts
        // This assumes content loads relatively fast after navigation begins
        navigationTimeoutRef.current = setTimeout(() => {
            setIsLoading(false);
        }, 400); // Adjust duration (e.g., 400ms)
    }

    // Cleanup function
    return () => {
        if (initialLoadTimeoutRef.current) clearTimeout(initialLoadTimeoutRef.current);
        if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    };
  // Depend on pathname and searchParams to detect route changes
  }, [pathname, searchParams, isInitialLoad]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <ArtLoadingSpinner key="loading" />}
      </AnimatePresence>
      {/* Render children immediately, loading spinner overlays it */}
       <div key={`${pathname}?${searchParams.toString()}`}>
           {children}
       </div>
    </>
  );
}
