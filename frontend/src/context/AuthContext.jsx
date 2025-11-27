import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (err) {
                console.error("Auth check failed:", err);
                localStorage.removeItem("token");
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        navigate("/dashboard");
    };

    
    const register = async (username, email, password) => {
        const res = await api.post("/auth/register", { username, email, password });

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        navigate("/dashboard");
    };

    const loginWithToken = async (token) => {
        localStorage.setItem("token", token);

        try {
            const res = await api.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(res.data);
        } catch (error) {
            console.error("OAuth login failed:", error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,       
                logout,
                loginWithToken, 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
