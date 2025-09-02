import { useEffect, useState } from "react";

export default function Profile() {
  const storedUser = localStorage.getItem("informasiakun");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const userId = parsedUser?.id;

  const API_URL = `https://users-akses-iqnefo-movie.iqbalnafis487.workers.dev/users/${userId}`;

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", name: "", password: "" });
  const [editing, setEditing] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setForm({
          username: data.username || "",
          email: data.email || "",
          name: data.name || "",
          password: data.password || "",
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [API_URL, userId]);

  // 🔹 Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validasi username
    const usernameRegex = /^[a-z0-9]+$/;
    if (!usernameRegex.test(form.username)) {
      setConfirmError("Username hanya boleh huruf kecil & angka, tanpa spasi/simbol!");
      return;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setConfirmError("Email tidak valid!");
      return;
    }

    // Validasi password
    const passwordRegex = /^\S+$/;
    if (!passwordRegex.test(form.password)) {
      setConfirmError("Password tidak boleh mengandung spasi!");
      return;
    }

    // Validasi konfirmasi password
    if (confirmPassword !== user.password) {
      setConfirmError("Password salah, tidak bisa update!");
      return;
    }

    await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setUser({ ...user, ...form });
    setEditing(false);
    setConfirmPassword("");
    setConfirmError("");
  };

  // 🔹 Hapus Akun
  const handleDelete = async () => {
    if (confirmPassword !== user.password) {
      setConfirmError("Password salah, tidak bisa hapus akun!");
      return;
    }

    await fetch(API_URL, { method: "DELETE" });

    // hapus localStorage biar logout otomatis
    localStorage.removeItem("informasiakun");
    window.location.href = "/signin"; // redirect ke halaman utama/login
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-gray-300 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-3xl p-10 text-gray-100">
        {!editing ? (
          <>
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=128`}
                alt="avatar"
                className="w-32 h-32 rounded-full shadow-xl mb-6 border-4 border-gray-700"
              />
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-400 text-lg">@{user.username}</p>
            </div>

            {/* Info */}
            <div className="mt-10 space-y-5 text-lg">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold text-gray-300">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold text-gray-300">Password</span>
                <span className="italic text-gray-500">••••••</span>
              </div>
            </div>

            {/* Action */}
            <div className="mt-10 flex gap-4 justify-center">
              <button
                onClick={() => setEditing(true)}
                className="px-8 py-3 bg-blue-600 text-white text-lg rounded-xl shadow-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setDeleting(true)}
                className="px-8 py-3 bg-red-600 text-white text-lg rounded-xl shadow-lg hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
            <form onSubmit={handleUpdate} className="space-y-6">
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="New Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Confirm Password */}
              <input
                type="password"
                placeholder="Confirm your current password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-700 text-white focus:ring-2 focus:ring-red-400"
                required
              />
              {confirmError && <p className="text-red-400 text-sm">{confirmError}</p>}

              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-lg text-white rounded-xl shadow-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-8 py-3 bg-gray-600 text-lg text-white rounded-xl shadow-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {/* Delete confirmation modal */}
        {deleting && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center text-red-400">Delete Account</h2>
              <p className="mb-4 text-gray-300 text-center">
                Masukkan password untuk menghapus akun ini. <br />
                <span className="text-red-500 font-semibold">Tindakan ini tidak bisa dibatalkan!</span>
              </p>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-600 rounded-xl px-4 py-3 bg-gray-700 text-white mb-4"
              />
              {confirmError && <p className="text-red-400 text-sm mb-4">{confirmError}</p>}

              <div className="flex justify-between gap-4">
                <button
                  onClick={handleDelete}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setDeleting(false);
                    setConfirmPassword("");
                    setConfirmError("");
                  }}
                  className="w-full px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
