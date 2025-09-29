import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, createContext } from "react";

export const CartContext = createContext();

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
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
