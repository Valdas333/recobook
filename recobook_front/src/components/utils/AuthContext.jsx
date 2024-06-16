import {createContext, useState, useEffect} from "react";
import Authentication from "./Authentication.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(Authentication.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(Authentication.getCurrentUser());

    useEffect(() => {
        setIsAuthenticated(Authentication.isAuthenticated());
        setCurrentUser(Authentication.getCurrentUser());
    }, []);

    const login = (username, password) => {
        return Authentication.login(username, password).then(user => {
            setIsAuthenticated(true);
            setCurrentUser(Authentication.getCurrentUser());
        });
    };

    const logout = () => {
        Authentication.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
