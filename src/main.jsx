import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Movie from './pages/Movie.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Definisi routing
const router = createBrowserRouter([
  {
    path: "/signin",      // halaman login
    element: <SignIn />
  },
  {
    path: "/signup",      // halaman register
    element: <SignUp />
  },
  {
    path: "/",            // halaman utama
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",        // default konten dari App
        element: <Movie />
      },
      {
        path: "/dashboard", // halaman setelah login (opsional)
        element: <Movie />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
