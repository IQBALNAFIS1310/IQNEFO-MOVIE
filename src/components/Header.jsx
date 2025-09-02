import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "lucide-react"; // ikon user

const apiKey = "20294adf51756709c0db49a1d6218100";
const baseUrl = "https://api.themoviedb.org/3";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
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

  // 🔍 Ambil rekomendasi pencarian
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=1&include_adult=false`
        );
        const data = await res.json();
        setSuggestions(data.results?.slice(0, 6) || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/searching?q=${encodeURIComponent(query)}`);
    setSuggestions([]);
  };

  const handleSuggestionClick = (movie) => {
    setSuggestions([]);
    setQuery("");
    navigate(`/detail/${movie.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("informasiakun");
    setUser(null);
    navigate("/signin");
  };

  return (
    <>
      {/* 🔍 Header Bar */}
      <div className="bg-gray-900 text-white sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-red-500">
          IQNEFO | MOVIE
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex justify-center gap-6 text-white">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/popular" className="hover:text-red-400">Popular</Link>
          <Link to="/top" className="hover:text-red-400">Top Rated</Link>
          <Link to="/upcoming" className="hover:text-red-400">Upcoming</Link>
        </nav>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-sm ml-4">
          <input
            type="text"
            placeholder="Search movie..."
            className="px-3 py-2 rounded-lg text-white w-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 left-0 bg-gray-900 text-white rounded-lg shadow-lg w-full max-h-80 overflow-y-auto z-50">
              {suggestions.map((movie) => (
                <li
                  key={movie.id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(movie)}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "https://i.pinimg.com/1200x/9c/bd/11/9cbd11700ddf75bdb6eb22896966b056.jpg"
                    }
                    alt={movie.title}
                    className="w-8 h-12 object-cover rounded"
                  />
                  <span>{movie.title}</span>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* User / Login Button */}
        <div className="ml-4 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-red-500"
              >
                <User size={20} />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2 z-50">
                  <p className="px-4 py-2 border-b border-gray-700">
                    {user.username}
                  </p>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-2 border-t border-gray-700 z-50">
        <Link to="/" className="flex flex-col items-center text-sm">Home</Link>
        <Link to="/popular" className="flex flex-col items-center text-sm">Popular</Link>
        <Link to="/top" className="flex flex-col items-center text-sm">Top Rated</Link>
        <Link to="/upcoming" className="flex flex-col items-center text-sm">Upcoming</Link>
      </nav>
    </>
  );
}
