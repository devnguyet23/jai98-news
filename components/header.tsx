import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-5xl">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Jainews
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Trang chủ
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
