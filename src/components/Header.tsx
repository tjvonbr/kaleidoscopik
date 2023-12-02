"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function Header() {
  const segment = useSelectedLayoutSegment();
  const isAuth = segment === "(auth)";

  return (
    <header
      className={cn(
        "absolute top-0 left-0 h-20 w-full p-10 flex flex-row justify-between items-center border-b border-gray-200 text-black z-50",
        isAuth ? "hidden" : ""
      )}
    >
      <div className="flex items-center space-x-10">
        <span className="text-lg font-black">🎨 Libello</span>
        <nav className="flex items-center space-x-4">
          <Link
            className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
            href="/explore"
          >
            Explore
          </Link>
          <Link
            className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
            href="/create"
          >
            Create
          </Link>
        </nav>
      </div>
      <Link
        href="/login"
        className="h-9 px-4 flex justify-center items-center bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300 rounded-md text-black text-sm"
      >
        Login
      </Link>
    </header>
  );
}
