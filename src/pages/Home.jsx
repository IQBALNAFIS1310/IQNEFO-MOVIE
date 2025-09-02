import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const apiKey = "20294adf51756709c0db49a1d6218100";
const baseUrl = "https://api.themoviedb.org/3";

export default function Home() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [currentGenre, setCurrentGenre] = useState(28); // Action default

    // Fetch Popular Movies
    useEffect(() => {
        fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = (data.results || []).filter((m) => !m.adult);
                setPopular(filtered);
            });
    }, []);


    // Fetch Top Rated Movies
    useEffect(() => {
        fetch(`${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = (data.results || []).filter((m) => !m.adult);
                setTopRated(filtered);
            });
    }, []);

    // Fetch Upcoming Movies (ambil 5 untuk slider)
    useEffect(() => {
        fetch(`${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = (data.results || []).filter((m) => !m.adult);
                setUpcoming(filtered.slice(1, 6));
            });
    }, []);

    // Fetch Movies by Genre
    useEffect(() => {
        const loadMovies = async () => {
            let allMovies = [];
            let page = 1;
            while (allMovies.length < 20 && page <= 5) {
                const res = await fetch(
                    `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
                );
                const data = await res.json();
                const filtered = data.results.filter((m) =>
                    m.genre_ids.includes(currentGenre)
                );
                allMovies = [...allMovies, ...filtered];
                page++;
            }
            setGenreMovies(allMovies.slice(0, 20));
        };
        loadMovies();
    }, [currentGenre]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide setiap 3 detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % upcoming.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [upcoming]);

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Upcoming Slider */}
            <section className="relative w-full overflow-hidden h-[100vh]">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        width: `${upcoming.length * 20}%`,
                        height: `90vh`,
                        transform: `translateX(-${currentSlide * (500 / upcoming.length)}%)`,
                    }}
                >
                    {upcoming.map((movie) => (
                        <div
                            key={movie.id}
                            className="w-full h-[60vh] flex-shrink-0 relative bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                                height: `100%`
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                                <h2 className="text-4xl font-bold">{movie.title}</h2>
                                <p className="mt-2 text-gray-300">{movie.overview}</p>
                                <p className="text-sm mt-1 text-gray-400">
                                    Release: {movie.release_date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Genre Filter */}
            <section className="px-6 py-6">
                <h2 className="text-2xl font-bold mb-4">🎭 Genre Movies</h2>
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setCurrentGenre(28)}
                        className={`px-4 py-2 rounded-lg ${currentGenre === 28 ? "bg-red-600" : "bg-gray-700"
                            }`}
                    >
                        Action
                    </button>
                    <button
                        onClick={() => setCurrentGenre(35)}
                        className={`px-4 py-2 rounded-lg ${currentGenre === 35 ? "bg-red-600" : "bg-gray-700"
                            }`}
                    >
                        Comedy
                    </button>
                    <button
                        onClick={() => setCurrentGenre(18)}
                        className={`px-4 py-2 rounded-lg ${currentGenre === 18 ? "bg-red-600" : "bg-gray-700"
                            }`}
                    >
                        Drama
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {genreMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            {/* Popular Movies */}
            <section className="px-6 py-6">
                <h2 className="text-2xl font-bold mb-4">🔥 Popular Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {popular.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            {/* Top Rated */}
            <section className="px-6 py-6">
                <h2 className="text-2xl font-bold mb-4">⭐ Top Rated</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {topRated.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
}

// Komponen Card Movie (klik kartu -> navigasi ke detail)
function MovieCard({ movie }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/detail/${movie.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") navigate(`/detail/${movie.id}`); }}
            className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex flex-col justify-end">
                <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-300">⭐ {movie.vote_average}</p>
            </div>
        </div>
    );
}