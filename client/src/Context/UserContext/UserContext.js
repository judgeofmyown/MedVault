import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    //const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [postOfficeAddress, setPostOfficeAddress] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [profilePhotoURL, setProfilePhotoURL] = useState("");
    const [user, setUser] = useState({});

    //console.log(userEmail, userPassword, userName)
    const storedIsLogged = localStorage.getItem('isLogged');
    const [isLogged, setIsLogged] = useState(storedIsLogged === 'true');

    // Function to handle login
    const loginUser = (email, password) => {
        // Simulate login logic
        setUserEmail(email);
        setUserPassword(password);
        setIsLogged(true); // Set logged-in state to true
        localStorage.setItem('isLogged', 'true'); // Store in localStorage
    };

    // Function to handle logout
    const logoutUser = () => {
        setIsLogged(false);
        localStorage.removeItem('isLogged'); // Remove from localStorage
    };

    useEffect(() => {
        // If the user is not logged in, ensure login state is updated
        if (!isLogged) {
        localStorage.removeItem('isLogged'); // Clear if the user logs out
        }
    }, [isLogged]);

    return (
        <UserContext.Provider value={{
            user, setUser, 
            isLogged, setIsLogged, 
            loginUser, logoutUser,
            userEmail, setUserEmail, 
            userPassword, setUserPassword,
            fullName, setFullName,
            phone, setPhone,
            permanentAddress, setPermanentAddress,
            postOfficeAddress, setPostOfficeAddress,
            profilePhoto, setProfilePhoto,
            profilePhotoURL, setProfilePhotoURL,
        }}>
            {children}
        </UserContext.Provider>
    );
};

