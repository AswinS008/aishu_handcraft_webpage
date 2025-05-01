
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react'; // Example icon

// Removed 'use client' as it's not strictly needed for this basic 404 page
// and might interfere with static generation or cause Suspense boundary issues during build.
export default function NotFound() {

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Frown className="w-16 h-16 text-destructive mb-6 animate-bounce" />
      <h1 className="text-4xl md:text-6xl font-bold text-destructive mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for seems to have wandered off.
      </p>
      <Button asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
      {/* If you needed the path (requires client-side logic, hence 'use client'):
      <p className="mt-4 text-sm text-muted-foreground">
        Attempted path: {typeof window !== 'undefined' ? window.location.pathname : ''}
      </p>
      */}
    </div>
  );
}
