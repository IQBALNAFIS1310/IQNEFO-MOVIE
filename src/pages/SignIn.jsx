import { useState, useEffect } from "react";
import { apiLogin } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [backgrounds, setBackgrounds] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiLogin(form);
    setMessage(JSON.stringify(res, null, 2));

    if (res.user) {
      localStorage.setItem(
        "informasiakun",
        JSON.stringify({
          id: res.user.id,
          username: res.user.username,
          name: res.user.name,
          email: res.user.email,
        })
      );
      navigate("/dashboard");
    }
  };

  // Fetch upcoming movies
  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=20294adf51756709c0db49a1d6218100&language=en-US&page=1`
        );
        const data = await res.json();
        const movies = data.results.filter((m) => m.backdrop_path);
        setBackgrounds(
          movies.map(
            (m) => `https://image.tmdb.org/t/p/original${m.backdrop_path}`
          )
        );
      } catch (err) {
        console.error("Error fetching upcoming:", err);
      }
    }
    fetchUpcoming();
  }, []);

  // Auto slide
  useEffect(() => {
    if (backgrounds.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % backgrounds.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [backgrounds]);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
            width: `${backgrounds.length * 10}%`,
          }}
        >
          {backgrounds.map((bg, i) => (
            <div
              key={i}
              className="w-full h-full flex-shrink-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${bg})`,
                filter: "blur(4px) brightness(0.6)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Login card */}
      <div className="relative text-white z-10 bg-gray-900/20 p-8 rounded shadow w-95">
        <h2 className="text-xl  font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={form.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={handleChange}
          />
          <button className="bg-green-500 text-white w-full p-2 rounded">
            Login
          </button>
        </form>

        {message && (
          <pre className="bg-gray-800 text-white p-2 mt-3 rounded text-sm">
            {message}
          </pre>
        )}

        <p className="text-center text-sm mt-4">
          Belum punya akun?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}
