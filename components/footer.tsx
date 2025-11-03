export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 max-w-5xl">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Andy's Blog. All rights reserved.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          Built with Next.js 15 & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
