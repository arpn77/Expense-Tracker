import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("userToken");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (loginData) => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        return { success: false, message: "User not found. Please register." };
      }

      const user = JSON.parse(userData);
      if (
        user.email === loginData.email &&
        user.password === loginData.password
      ) {
        const token = await api.post("/auth/login", {
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30,
        });

        localStorage.setItem("userToken", token);
        setUser(user);
        navigate("/");
        return { success: true };
      }
      return { success: false, message: "Invalid credentials" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const register = async (registerData) => {
    try {
      localStorage.setItem("userData", JSON.stringify(registerData));
      navigate("/login");
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
