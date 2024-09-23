"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";

export function NavigationBarItem({
  href,
  label,
  icon,
  preSelected,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
  preSelected: boolean;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100/20 dark:hover:bg-gray-800/20 group rounded-lg",
        (!pathname && preSelected) ||
          (pathname &&
            pathname === href &&
            "bg-gray-100/20 dark:bg-gray-800/20")
      )}
    >
      {cloneElement(icon, {
        className: cn(
          "w-5 h-5 mt-2 text-gray-200 dark:text-gray-400 group-hover:text-gray-50 dark:group-hover:text-gray-50",
          (!pathname && preSelected) ||
            (pathname && pathname === href && "text-gray-50 dark:text-gray-50")
        ),
      })}
      <span
        className={cn(
          "text-xs mb-1 text-gray-200 dark:text-gray-400 group-hover:text-gray-50 dark:group-hover:text-gray-50",
          (!pathname && preSelected) ||
            (pathname && pathname === href && "text-gray-50 dark:text-gray-50")
        )}
      >
        {label}
      </span>
    </Link>
  );
}