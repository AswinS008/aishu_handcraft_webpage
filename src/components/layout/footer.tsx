export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GirlyCrafts Showcase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
