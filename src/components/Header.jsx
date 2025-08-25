import React, { useContext, useState } from "react";

// Jika Anda sudah punya CartContext di App.jsx, import seperti ini:
// import { CartContext } from "../App"; // sesuaikan path-nya

// Komponen Header sederhana dengan Tailwind CSS
// - Responsive (ada tombol menu untuk mobile)
// - Badge jumlah item keranjang (opsional via props)
// Cara pakai: <Header onCartClick={() => navigate('/cart')} cartCount={3} />
// Jika Anda ingin ambil dari Context, lihat komentar di bawah.

export default function Header({ brand = "IQNEFO | MOVIE", cartCount, onCartClick }) {
  const [open, setOpen] = useState(false);

  // ---- Contoh jika ingin ambil cartCount dari Context ----
  // const { keranjang } = useContext(CartContext);
  // const computedCartCount = typeof cartCount === "number" ? cartCount : (keranjang?.length || 0);
  // --------------------------------------------------------

  const computedCartCount = typeof cartCount === "number" ? cartCount : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border">
              {/* Logo minimal */}
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight">{brand}</span>
          </a>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="/" className="text-sm text-gray-700 hover:text-black">Beranda</a>
          <a href="/produk" className="text-sm text-gray-700 hover:text-black">Produk</a>
          <a href="/tentang" className="text-sm text-gray-700 hover:text-black">Tentang</a>
        </div>

        {/* Right: Cart & Menu */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCartClick}
            className="relative inline-flex items-center rounded-2xl border px-3 py-1.5 text-sm hover:shadow"
            aria-label="Buka keranjang"
          >
            <span className="mr-2">Keranjang</span>
            <span className="inline-flex min-w-[22px] items-center justify-center rounded-full border px-1.5 text-xs">
              {computedCartCount}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border"
            onClick={() => setOpen((s) => !s)}
            aria-label="Buka menu"
            aria-expanded={open}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2">
            <a onClick={() => setOpen(false)} href="/" className="rounded-xl px-2 py-2 text-sm hover:bg-gray-50">Beranda</a>
            <a onClick={() => setOpen(false)} href="/produk" className="rounded-xl px-2 py-2 text-sm hover:bg-gray-50">Produk</a>
            <a onClick={() => setOpen(false)} href="/tentang" className="rounded-xl px-2 py-2 text-sm hover:bg-gray-50">Tentang</a>
          </div>
        </div>
      )}
    </header>
  );
}
