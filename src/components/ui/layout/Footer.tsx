import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-center gap-6">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/gallery" className="nav-link">
            Gallery
          </Link>
          <Link href="/upload" className="nav-link">
            Upload
          </Link>
        </nav>
      </div>
    </footer>
  );
}
