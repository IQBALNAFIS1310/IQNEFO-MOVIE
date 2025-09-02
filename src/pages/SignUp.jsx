import { useState, useEffect } from "react";
import { apiRegister } from "../utils/api";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Regex rules
  const usernameRegex = /^[a-z0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^\S+$/;

  // Validasi username
  if (!usernameRegex.test(form.username)) {
    setMessage("❌ Username hanya boleh huruf kecil & angka, tanpa spasi/simbol!");
    return;
  }

  // Validasi email
  if (!emailRegex.test(form.email)) {
    setMessage("❌ Email tidak valid!");
    return;
  }

  // Validasi password
  if (!passwordRegex.test(form.password)) {
    setMessage("❌ Password tidak boleh mengandung spasi!");
    return;
  }

  // Kalau semua valid → kirim ke API
  const user = { id: Date.now(), ...form };
  try {
    const res = await apiRegister(user);
    setMessage("✅ Berhasil registrasi:\n" + JSON.stringify(res, null, 2));
  } catch (err) {
    setMessage("❌ Gagal registrasi: " + err.message);
  }
};


  const [backgrounds, setBackgrounds] = useState([]);
  const [index, setIndex] = useState(0);

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
            width: `${backgrounds.length * 100}%`,
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

      {/* Form */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="name"
            placeholder="Nama Lengkap"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded transition">
            Register
          </button>
        </form>
        {message && (
          <pre className="bg-gray-800 text-white p-2 mt-3 rounded text-sm overflow-x-auto">
            {message}
          </pre>
        )}
        <p className="text-center text-sm mt-4">
          Sudah Punya Akun?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
