import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const apiKey = "20294adf51756709c0db49a1d6218100";
const baseUrl = "https://api.themoviedb.org/3";

export default function Searching() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return;
      try {
        const res = await fetch(
          `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=1&include_adult=false`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Error search:", err);
      }
    };
    fetchSearch();
  }, [query]);

  return (
    <div className="p-6 bg-gray-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Search result: {query}</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/detail/${movie.id}`}
              className="bg-gray-800 text-white rounded-lg overflow-hidden shadow hover:scale-105 transition block"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h2 className="text-sm font-semibold">{movie.title}</h2>
                <p className="text-xs text-gray-400">{movie.release_date}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
