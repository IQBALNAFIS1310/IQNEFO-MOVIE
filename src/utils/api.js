const BASE_URL = "http://basic-1.alstore.space:25586"; 

export async function apiRegister(user) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function apiLogin(credentials) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// export async function apiGetUsers(apiKey) {
//   const res = await fetch(`${BASE_URL}/users?apikey=${apiKey}`);
//   return res.json();
// }
