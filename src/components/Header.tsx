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
        "w-full px-10 py-5 border-b flex flex-row justify-between items-center text-[#FF8ABE]",
        isAuth ? "hidden" : ""
      )}
    >
      <div className="flex items-center space-x-10">
        <Link className="text-2xl font-black" href="/">
          wetbrush
        </Link>
        <nav className="flex items-center space-x-10 font-medium">
          <Link
            className="text-sm font-medium hover:text-[#8450ff] transition-colors"
            href="/explore"
          >
            Explore
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#8450ff] transition-colors"
            href="/create"
          >
            Create
          </Link>
        </nav>
      </div>
      <Link
        href="/login"
        className="h-9 px-4 flex justify-center items-center bg-[#FF8ABE] hover:bg-[#FF8ABE]/90 transition-colors rounded-md text-white text-medium text-sm"
      >
        Login
      </Link>
    </header>
  );
}
