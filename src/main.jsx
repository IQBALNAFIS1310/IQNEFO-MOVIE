import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Detail from './pages/Detail.jsx'

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
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/",
        element: <Dashboard />
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
