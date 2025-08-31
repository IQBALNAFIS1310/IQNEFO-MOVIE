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
        path: "/home",
        element: <Home />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/detail/:id",
        element : <Detail/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
