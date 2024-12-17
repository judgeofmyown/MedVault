import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        username:"",
        password:"",
    });

    const [isLogged, setIsLogged] = useState(false);

    return (
        <UserContext.Provider value={{user, setUser, isLogged, setIsLogged}}>
            {children}
        </UserContext.Provider>
    );
};



