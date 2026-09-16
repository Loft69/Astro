import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("astro-user");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) localStorage.setItem("astro-user", JSON.stringify(user));
        else localStorage.removeItem("astro-user");
    }, [user]);

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("astro-users") || "[]");
        const found = users.find(u => u.email === email && u.password === password);
        if (!found) return false;
        setUser(found);
        return true;
    }

    function register(userData) {
        const users = JSON.parse(localStorage.getItem("astro-users") || "[]");
        if (users.some(u => u.email === userData.email)) return false;
        users.push(userData);
        localStorage.setItem("astro-users", JSON.stringify(users));
        setUser(userData);
        return true;
    }

    function logout() {
        setUser(null);
    }

    return <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}