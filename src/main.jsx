import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Detail from './pages/Detail.jsx'
import Home from './pages/Home.jsx'
import Searching from './pages/Searching.jsx'
import Popular from './pages/Popular.jsx'
import TopRated from './pages/TopRated.jsx'
import UpComing from './pages/UpComing.jsx'
import Profile from './pages/Profile.jsx'

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
    path: "/",
    element: <Home />
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
        path: "/home",
        element: <Home />
      },

      {
        path: "/detail/:id",
        element: <Detail />
      },
      {
        path: "/searching",
        element: <Searching />
      },
      {
        path: "/popular",
        element: <Popular />
      },
      {
        path: "/top",
        element: <TopRated />
      },
      {
        path: "/upcoming",
        element: <UpComing />
      },
      {
        path: "/profile",
        element: <Profile />
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
