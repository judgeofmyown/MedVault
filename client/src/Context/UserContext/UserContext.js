import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    // const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [postOfficeAddress, setPostOfficeAddress] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    

    const [user, setUser] = useState({});

    // console.log(userEmail, userPassword, userName)
    const [isLogged, setIsLogged] = useState(false);

    return (
        <UserContext.Provider value={{
            user, setUser, 
            isLogged, setIsLogged, 
            userEmail, setUserEmail, 
            userPassword, setUserPassword,
            fullName, setFullName,
            phone, setPhone,
            permanentAddress, setPermanentAddress,
            postOfficeAddress, setPostOfficeAddress,
            profilePhoto, setProfilePhoto
        }}>
            {children}
        </UserContext.Provider>
    );
};



