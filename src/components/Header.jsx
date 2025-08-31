import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("informasiakun");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("informasiakun");
    setUser(null);
    navigate("/signin");
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500">
          IQNEFO | MOVIE
        </Link>

        {/* Navbar */}
        <nav className="flex gap-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/popular" className="hover:text-red-400">Popular</Link>
          <Link to="/top-rated" className="hover:text-red-400">Top Rated</Link>
          <Link to="/upcoming" className="hover:text-red-400">Upcoming</Link>
        </nav>

        {/* Login / Username */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/signin"
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
