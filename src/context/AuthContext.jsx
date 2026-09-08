import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('fkc_token') || null);

    useEffect(() => {
        if (token) {
            const savedUser = JSON.parse(localStorage.getItem('fkc_user'));
            setUser(savedUser);
        }
    }, [token]);

    const login = (jwtToken, userData) => {
        localStorage.setItem('fkc_token', jwtToken);
        localStorage.setItem('fkc_user', JSON.stringify(userData));
        setToken(jwtToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('fkc_token');
        localStorage.removeItem('fkc_user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};