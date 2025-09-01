import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const apiKey = "20294adf51756709c0db49a1d6218100";
const baseUrl = "https://api.themoviedb.org/3";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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

  // Ambil rekomendasi pencarian
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

  return (
    <>
      {/* 🔍 Search Bar (selalu di atas) */}
      <div className="bg-gray-900 text-white sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-red-500">
          IQNEFO | MOVIE
        </Link>
        <form onSubmit={handleSubmit} className="relative w-full max-w-sm ml-4">
          <input
            type="text"
            placeholder="Search movie..."
            className="px-3 py-2 rounded-lg text-black w-full"
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
                        : "https://via.placeholder.com/50x75?text=No+Img"
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
      </div>

      {/* Bottom Navigation (mobile only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-2 border-t border-gray-700 z-50">
        <Link to="/" className="flex flex-col items-center text-sm">
          Home
        </Link>
        <Link to="/popular" className="flex flex-col items-center text-sm">
          Popular
        </Link>
        <Link to="/top-rated" className="flex flex-col items-center text-sm">
          Top Rated
        </Link>
        <Link to="/upcoming" className="flex flex-col items-center text-sm">
          Upcoming
        </Link>
      </nav>

      {/*  Desktop Navigation (hidden di mobile) */}
      <nav className="hidden lg:flex justify-center gap-6 bg-gray-800 text-white py-3">
        <Link to="/" className="hover:text-red-400">Home</Link>
        <Link to="/popular" className="hover:text-red-400">Popular</Link>
        <Link to="/top-rated" className="hover:text-red-400">Top Rated</Link>
        <Link to="/upcoming" className="hover:text-red-400">Upcoming</Link>
      </nav>
    </>
  );
}
