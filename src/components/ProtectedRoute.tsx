import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Vänta på auth-check innan redirect
  if (isLoading) {
    return (
      <main className="container">
        <p style={{ marginTop: 20, color: "var(--muted)" }}>
          Laddar session…
        </p>
      </main>
    );
  }

  // Inte inloggad → skicka till login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Inloggad → visa skyddat innehåll
  return <>{children}</>;
};

export default ProtectedRoute;
