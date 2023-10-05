import Link from "next/link";

export function Header() {
  return (
    <header className="h-20 w-full p-10 flex items-center space-x-10 border-b border-gray-200 text-black">
      <span className="text-lg font-black">🎨 Kaleidoscopik</span>
      <nav className="flex items-center space-x-4">
        <Link
          className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
          href="/create"
        >
          Create
        </Link>
        <Link
          className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
          href="/"
        >
          Explore
        </Link>
      </nav>
    </header>
  );
}
