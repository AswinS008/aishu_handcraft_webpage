
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
  const [isLoading, setIsLoading] = useState(true); // Start as loading initially
  const [isClientRendered, setIsClientRendered] = useState(false); // Track client render
  const initialLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathname = useRef<string | null>(null); // Track previous pathname
  const isInitialLoad = useRef(true); // Track if it's the very first load

  useEffect(() => {
    // This effect runs only once on the client after the initial mount
    setIsClientRendered(true);

    // Show loading screen for a minimum duration on initial load
    initialLoadTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      isInitialLoad.current = false; // Mark initial load as complete
    }, 800); // Adjust duration as needed (e.g., 800ms)

    // Update previous pathname on mount
    previousPathname.current = pathname;

    return () => {
      if (initialLoadTimeoutRef.current) clearTimeout(initialLoadTimeoutRef.current);
    };
  }, []); // Empty dependency array ensures this runs only once on initial client mount

  useEffect(() => {
    // This effect runs on subsequent pathname changes (page navigations)
    if (isInitialLoad.current) {
      // Don't run this effect during the initial load handled by the first useEffect
      return;
    }

    // Clear previous navigation timeout if exists
    if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);

    const currentFullUrl = `${pathname}?${searchParams.toString()}`;
    const previousFullUrl = previousPathname.current ? `${previousPathname.current}?${searchParams.toString()}` : null;

    // Determine if it's a real page navigation vs just a query param change on the same page
    const isPageNavigation = pathname !== previousPathname.current;

    // Show loading only on actual page navigation
    if (isPageNavigation) {
      setIsLoading(true);

      // Set a timeout to hide the loader after a short duration for navigation
      navigationTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 400); // Adjust duration for navigation (e.g., 400ms)
    } else {
        // If it's not a page navigation (e.g., category change), ensure loading is false.
        // This prevents the loader from flashing during category changes.
        setIsLoading(false);
    }

    // Update previous pathname for the next effect run
    previousPathname.current = pathname;

    // Cleanup function for navigation timeout
    return () => {
      if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    };
  // Depend ONLY on pathname to detect actual page navigations after the initial load.
  }, [pathname]); // Depend on pathname

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Show loader if loading OR if it's the initial render on the client */}
        {(isLoading || !isClientRendered) && <ArtLoadingSpinner key="loading" />}
      </AnimatePresence>

      {/* Render children only after the client has rendered and initial load is complete */}
      {isClientRendered && !isLoading && (
        <div key={pathname}> {/* Use key based on pathname to ensure content remounts */}
          {children}
        </div>
      )}
      {/* Optionally, render children immediately but hidden while loading */}
      {/* <div style={{ visibility: isLoading ? 'hidden' : 'visible' }} key={pathname}>
          {children}
      </div> */}
    </>
  );
}
