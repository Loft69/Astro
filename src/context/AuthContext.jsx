import React, {createContext, useContext, useEffect, useState} from "react";
import * as api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // восстановление сессии при старте

    useEffect(() => {
        const token = localStorage.getItem("astro-token");
        if (!token) return setLoading(false);
        api.fetchMe()
            .then(({user}) => setUser(user))
            .catch(() => localStorage.removeItem("astro-token"))
            .finally(() => setLoading(false));
    }, []);

    async function login(email, password) {
        const {token, user} = await api.loginUser({email, password}); // бросит Error с текстом от сервера
        localStorage.setItem("astro-token", token);
        setUser(user);
        return user;
    }

    async function register(userData) {
        const {token, user} = await api.registerUser(userData);
        localStorage.setItem("astro-token", token);
        setUser(user);
        return user;
    }

    async function logout() {
        api.logoutUser().catch(() => {});
        localStorage.removeItem("astro-token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}