import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "20294adf51756709c0db49a1d6218100"; 
const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated";

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Top Rated Movies</h1>

      {/* Grid film */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            to={`/detail/${movie.id}`}
            key={movie.id}
            className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-400">
                ⭐ {movie.vote_average} | {movie.release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-lg font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
