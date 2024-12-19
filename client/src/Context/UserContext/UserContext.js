import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    // const [loggedEmail, setLoggedEmail] = useState("")
    // const [loggedPassword, setLoggedPassword] = useState("")
    // const [registeredEmail, setRegisteredEmail] = useState("")
    // const [registeredPassword, setRegisteredPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userName, setUserName] = useState("")

    const [user, setUser] = useState({});

    // console.log(userEmail, userPassword, userName)
    const [isLogged, setIsLogged] = useState(false);

    return (
        <UserContext.Provider value={{user, setUser, isLogged, setIsLogged, userEmail, setUserEmail, userPassword, setUserPassword, userName, setUserName}}>
            {children}
        </UserContext.Provider>
    );
};



