import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

export const Login_auth = () => {

    const { userEmail, userPassword, 
        setUser, 
        setUserEmail, setUserPassword, 
        setFullName, setPhone, 
        setPermanentAddress, setPostOfficeAddress, 
        setProfilePhoto, setIsLogged } = useContext(UserContext); // Added setIsLogged

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid)) // Set the user data if a user is logged in
            if (userDoc.exists()){
                setUser(currentUser);
                setIsLogged(true); // Set the isLogged state to true when logged in
            }
        } else {
            setUser(null); // Clear user data if not logged in
            setIsLogged(false); // Ensure isLogged is false if not logged in
          }
        });
    
        return () => unsubscribe(); // Clean up the listener on component unmount
    }, [setUser, setIsLogged]);

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try{
            const userCreds = await signInWithEmailAndPassword(auth, userEmail, userPassword);
            const currUser = userCreds.user;

            const userDocRef = doc(db, "users", currUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if(userDocSnap.exists()){
                const userData  = userDocSnap.data();

                setFullName(userData.fullName);
                setPhone(userData.phone);
                setPermanentAddress(userData.permanentAddress);
                setPostOfficeAddress(userData.postOfficeAddress);
                setProfilePhoto(userData.profilePhotoURL);
            }

            setUserEmail(userEmail);
            setUserPassword(userPassword);

            setIsLogged(true); // Update the context state to true after login

            setIsRedirecting(true); // Start redirect message display
            setTimeout(() => {
                navigate("/dashboard"); // Redirect to dashboard after login
            }, 1500);
        } catch(error) {
            setError(error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>Email and Password do not match! Try again!</p>}
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'LogIn'}
            </button>
            {isRedirecting && (
                <div style={{ color: '#47E5BC', marginTop: '10px' }}>
                    Login successful! Redirecting to Dashboard...
                </div>
            )}
        </div>
    );
};
