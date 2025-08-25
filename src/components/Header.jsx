import React, { useState } from "react";

export default function Header({
  brand = "IQNEFO | MOVIE",
  cartCount,
  onCartClick,
}) {
  const computedCartCount = typeof cartCount === "number" ? cartCount : 0;

  return (
    <>
      {/* Header atas (brand/logo saja) */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-2 text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5V6.75a.75.75 0 00-.75-.75h-7.5a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75V13.5m4.5-3l-3-3m3 3l-3 3m3-3h-7.5"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight">{brand}</span>
          </a>
        </nav>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 z-50 w-full border-t border-gray-800 bg-black/80 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2 text-gray-300">
          <a href="/" className="flex flex-col items-center text-sm hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l9-9 9 9M4 10v10h16V10" />
            </svg>
            Home
          </a>
          <a href="/popular" className="flex flex-col items-center text-sm hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Popular
          </a>
          <a href="/trending" className="flex flex-col items-center text-sm hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12h18M12 3v18" />
            </svg>
            Trending
          </a>
          <a href="/genre" className="flex flex-col items-center text-sm hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Genre
          </a>
          <button
            onClick={onCartClick}
            className="relative flex flex-col items-center text-sm hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h18l-1 13H4L3 3z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
            </svg>
            Watchlist
            {computedCartCount > 0 && (
              <span className="absolute top-0 right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {computedCartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Desktop Navigation (opsional di atas) */}
      <nav className="hidden md:flex items-center justify-center gap-6 py-2 border-b border-gray-800 bg-black/80 text-gray-300">
        <a href="/" className="hover:text-white">Home</a>
        <a href="/popular" className="hover:text-white">Popular</a>
        <a href="/trending" className="hover:text-white">Trending</a>
        <a href="/genre" className="hover:text-white">Genre</a>
        <button onClick={onCartClick} className="hover:text-white relative">
          Watchlist
          {computedCartCount > 0 && (
            <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {computedCartCount}
            </span>
          )}
        </button>
      </nav>
    </>
  );
}
