import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types/User";
import { api } from "../api/axios";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const refreshUser = async () => {
    try {
      const { data } = await api.get<User>("/auth/status");
      alert("User refreshed: " + JSON.stringify(data)); 
      setUser(data);
      return data;
    } catch {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    void refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
