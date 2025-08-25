import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export default function App() {
  const savedCart = localStorage.getItem("keranjang");
  const [keranjang, setKeranjang] = useState(
    savedCart ? JSON.parse(savedCart) : []
  );

  // Simpan ke localStorage setiap kali keranjang berubah
  useEffect(() => {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }, [keranjang]);

  return (
    <CartContext.Provider value={{ keranjang, setKeranjang }}>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        {/* Konten halaman (akan berubah sesuai route) */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CartContext.Provider>
  );
}
