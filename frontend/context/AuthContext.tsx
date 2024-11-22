import React, {createContext, useState, useEffect, useContext} from "react";

interface AuthContextType {
    user: any | null;                           //Stores user info (or null if not logged in).
    token: string | null;                       //Stores the authentication token (or null if not logged in)
    login: (user: any, token: string) => void;  //A function to login the user
    logout: () => void;                         //A function to logout the user
}

//Initializes the context with undefined (no data initially). This "box" will hold the authentication state and functions for your app.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
            const savedToken = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            }
    }, []);

    const login = (token: string, user:any) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.parse(user));
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

