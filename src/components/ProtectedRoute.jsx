import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
