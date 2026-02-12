import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type {
  User,
  LoginCredentials,
  AuthResponse,
  AuthContextType,
} from "../types/auth.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // session-check
  const [error, setError] = useState<string | null>(null);

  // LOGIN
  const login = async (credentials: LoginCredentials) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        let message = "Inloggning misslyckades";
        try {
          const errData = (await res.json()) as { message?: string };
          if (errData?.message) message = errData.message;
        } catch {
          // ignore json parse
        }
        setError(message);
        throw new Error(message);
      }

      const data = (await res.json()) as AuthResponse;
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // TOKEN CHECK VID APP-START
  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const data = (await res.json()) as { user: User };
      setUser(data.user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth måste användas inom en AuthProvider");
  return context;
};
