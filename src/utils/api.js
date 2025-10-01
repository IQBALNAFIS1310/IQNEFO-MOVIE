const USR_API = "https://iqnefo-api-users.vercel.app";

// --- AUTH ---
export async function apiRegister(user) {
  const res = await fetch(`${USR_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function apiLogin(credentials) {
  const res = await fetch(`${USR_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// --- PROFILE ---
export async function apiGetUser(id) {
  const res = await fetch(`${USR_API}/auth/users/${id}`);
  if (!res.ok) throw new Error("Gagal ambil data user");
  return res.json();
}

export async function apiUpdateUser(id, data) {
  const res = await fetch(`${USR_API}/auth/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiDeleteUser(id) {
  const res = await fetch(`${USR_API}/auth/users/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
