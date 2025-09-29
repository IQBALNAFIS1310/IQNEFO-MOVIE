import { useEffect, useState } from "react";
import { apiGetUser, apiUpdateUser, apiDeleteUser, apiLogin } from "../utils/api.js";

export default function Profile() {
  const storedUser = localStorage.getItem("informasiakun");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id;

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", name: "", password: "" });
  const [editing, setEditing] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!userId) return;
    apiGetUser(userId)
      .then((data) => {
        setUser(data);
        setForm({ username: data.username, email: data.email, name: data.name, password: "" });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userId]);

  // 🔹 Validasi password via login
  const verifyPassword = async () => {
    if (!parsedUser?.username) return { error: "Data login tidak valid" };
    return await apiLogin({ username: parsedUser.username, password: confirmPassword });
  };

  // 🔹 Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    const loginRes = await verifyPassword();
    if (loginRes.error) {
      setConfirmError("Password salah");
      return;
    }

    const updated = await apiUpdateUser(userId, form);
    if (updated.error) {
      setConfirmError(updated.error);
      return;
    }

    setUser(updated.user || user);
    setEditing(false);
    setConfirmPassword("");
    setConfirmError("");
  };

  // 🔹 Delete Account
  const handleDelete = async () => {
    const loginRes = await verifyPassword();
    if (loginRes.error) {
      setConfirmError("Password salah");
      return;
    }

    const deleted = await apiDeleteUser(userId);
    if (deleted.error) {
      setConfirmError(deleted.error);
      return;
    }

    localStorage.removeItem("informasiakun");
    window.location.href = "/signin";
  };

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-3xl p-10 text-gray-100">
        {!editing ? (
          <>
            <div className="flex flex-col items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=128`}
                alt="avatar"
                className="w-32 h-32 rounded-full shadow-xl mb-6 border-4 border-gray-700"
              />
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-400 text-lg">@{user.username}</p>
            </div>

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

            <div className="mt-10 flex gap-4 justify-center">
              <button onClick={() => setEditing(true)} className="px-8 py-3 bg-blue-600 rounded-xl hover:bg-blue-700">
                Edit Profile
              </button>
              <button onClick={() => setDeleting(true)} className="px-8 py-3 bg-red-600 rounded-xl hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl bg-gray-700"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-gray-700"
            />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl bg-gray-700"
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="New Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-700"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Current Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-700"
              required
            />
            {confirmError && <p className="text-red-400">{confirmError}</p>}

            <div className="flex gap-4 justify-center">
              <button type="submit" className="px-8 py-3 bg-green-600 rounded-xl hover:bg-green-700">
                Save
              </button>
              <button type="button" onClick={() => setEditing(false)} className="px-8 py-3 bg-gray-600 rounded-xl">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Delete Modal */}
        {deleting && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md">
              <h2 className="text-xl font-bold text-red-400 text-center">Delete Account</h2>
              <p className="text-gray-300 text-center mb-4">Masukkan password untuk hapus akun</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-xl bg-gray-700 mb-4"
              />
              {confirmError && <p className="text-red-400 text-sm">{confirmError}</p>}

              <div className="flex gap-4">
                <button onClick={handleDelete} className="w-full px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700">
                  Delete
                </button>
                <button
                  onClick={() => {
                    setDeleting(false);
                    setConfirmPassword("");
                    setConfirmError("");
                  }}
                  className="w-full px-6 py-3 bg-gray-600 rounded-xl hover:bg-gray-700"
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
