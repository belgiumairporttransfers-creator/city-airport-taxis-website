import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}
