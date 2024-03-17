"use client";

import { Icons } from "@/components/Icons";
import Link from "next/link";
import { MainNavigation } from "@/config/navigation";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { MainNavItem } from "@/types";

interface MainNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ children, items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex gap-6 md:gap-10 items-center">
      <Link
        className="hidden md:flex items-center font-black text-pink-500 sm:inline-block"
        href="/"
      >
        wetbrush
      </Link>
      {items.length > 0 ? (
        <nav className="hidden md:flex gap-6">
          {items.map((item, idx) => (
            <Link href={item.href} key={idx}>
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.settings />}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
