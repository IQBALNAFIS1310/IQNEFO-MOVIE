# IQNEFO | MOVIE

# Project React - Movie App

Aplikasi web berbasis **React.js** untuk menampilkan daftar film populer, top rated, upcoming, serta fitur pencarian. Data diambil dari [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

---

## Features
- **Authentication**: Sign In & Sign Up (basic auth dengan protected route)
- **Home Page**: Menampilkan highlight film
- **Popular Movies**: Daftar film populer dengan pagination
- **Top Rated Movies**: Daftar film dengan rating tertinggi
- **Upcoming Movies**: Daftar film yang akan rilis
- **Search**: Cari film berdasarkan judul
- **Detail Page**: Informasi detail film + link trailer
- **UI/UX**: Dibangun dengan **Tailwind CSS**, responsive, dan modern
- **Protected Route**: Beberapa halaman hanya bisa diakses setelah login

---

## Project Structure
src/
├── assets/ # File aset (logo, svg, dsb)
├── components/ # Komponen reusable (Header, Footer, dll)
├── pages/ # Halaman utama aplikasi
│ ├── Home.jsx
│ ├── Popular.jsx
│ ├── TopRated.jsx
│ ├── UpComing.jsx
│ ├── Searching.jsx
│ ├── Detail.jsx
│ ├── SignIn.jsx
│ ├── SignUp.jsx
├── utils/ # Utility (API handler)
│ └── api.js
├── App.jsx # Routing utama aplikasi
├── main.jsx # Entry point React
├── index.css # Global styles (Tailwind CSS)
|__ vercel.json