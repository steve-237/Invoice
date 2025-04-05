"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Layers } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const navLinks = [
    {
      href: "/",
      label: "Factures",
    },
  ];

  const isActiveLink = (href: string) =>
    pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

  const renderLinks = (classNames: string) =>
    navLinks.map(({ href, label }) => {
      return (
        <Link
          href={href}
          key={href}
          className={`btn-sm ${classNames} ${
            isActiveLink(href) ? "btn-accent" : ""
          }`}
        >
          {label}
        </Link>
      );
    });

  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-accent-content text-accent rounded-full p-2">
            <Layers className="h-6 w-6" />
          </div>
          <span className="ml-3 font-bold text-2xl italic">
            In<span>Voice</span>
          </span>
          <div>
            {renderLinks("btn")}
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
