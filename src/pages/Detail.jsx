import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "20294adf51756709c0db49a1d6218100";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const YT_EMBED = "https://www.youtube.com/embed/";

export default function Detail() {
  const { id } = useParams(); // ambil idMovie dari URL (misal /detail/12345)
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [similar, setSimilar] = useState([]);

  // Ambil detail + video
  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);

        const videoRes = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const videoData = await videoRes.json();
        if (videoData.results?.length > 0) {
          setVideoKey(videoData.results[videoData.results.length - 1].key);
        }
      } catch (err) {
        console.error("Error fetch movie detail:", err);
      }
    }
    fetchMovie();
  }, [id]);

  // Ambil cast
  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setCast(data.cast || []));
  }, [id]);

  // Ambil rekomendasi & similar
  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setRecommendations(data.results || []));

    fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setSimilar(data.results || []));
  }, [id]);

  if (!movie) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-end"
        style={{
          backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10 p-8 max-w-3xl">
          <h1 className="text-4xl font-bold">{movie.original_title}</h1>
          <p className="italic text-gray-300">{movie.tagline}</p>
          <p className="mt-4">{movie.overview}</p>
          <p className="mt-2 text-sm text-gray-400">Release: {movie.release_date}</p>
        </div>
      </section>

      {/* Trailer */}
      {videoKey && (
        <div className="w-full max-w-5xl mx-auto p-4">
          <iframe
            id="frame-embed"
            src={`${YT_EMBED}${videoKey}?autoplay=0`}
            className="w-full aspect-video rounded-lg shadow-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      )}

      {/* Cast */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {cast.slice(0, 10).map(c => (
            <div key={c.id} className="text-center">
              <img
                src={c.profile_path ? `${IMG_URL}${c.profile_path}` : "https://via.placeholder.com/150"}
                alt={c.original_name}
                className="rounded-lg w-full h-60 object-cover"
              />
              <p className="mt-2 font-semibold">{c.original_name}</p>
              <p className="text-sm text-gray-400">as {c.character}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {recommendations.map(m => (
            <Link to={`/detail/${m.id}`} key={m.id}>
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                <img src={`${IMG_URL}${m.poster_path}`} alt={m.title} />
                <p className="p-2 text-sm">{m.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Similar */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {similar.map(m => (
            <Link to={`/detail/${m.id}`} key={m.id}>
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                <img src={`${IMG_URL}${m.poster_path}`} alt={m.title} />
                <p className="p-2 text-sm">{m.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
