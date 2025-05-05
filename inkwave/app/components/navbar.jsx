"use client";

import Link from "next/link";
import { useState } from "react";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Publish", href: "/publish" },
    { name: "Account", href: "/account" },
  ];

  return (
    <nav className="bg-gray-900/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-4xl font-bold text-white tracking-tight">Inkwave</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-200 hover:text-indigo-400 transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
          <SignedOut>
            <SignInButton className="ml-4 px-10 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-colors font-semibold" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center text-gray-200 hover:text-indigo-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open menu"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block text-gray-200 hover:text-indigo-400 font-medium py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <button className="w-full px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 font-semibold transition-colors mt-2">
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

