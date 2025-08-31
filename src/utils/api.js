const USR_API = "https://users-akses-iqnefo-movie.iqbalnafis487.workers.dev";
// const USR_API = "http://localhost:3000";
const MOVIE_API ="";
const TRAILER_API = "";

export async function apiRegister(user) {
  const res = await fetch(`${USR_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function apiLogin(credentials) {
  const res = await fetch(`${USR_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// export async function apiGetUsers(apiKey) {
//   const res = await fetch(`${USR_API}/users?apikey=${apiKey}`);
//   return res.json();
// }
