// components/InitialRedirect.jsx
import { Navigate } from "react-router-dom";

export default function InitialRedirect() {
  const apiKey = localStorage.getItem("informasiakun");

  if (apiKey) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}
