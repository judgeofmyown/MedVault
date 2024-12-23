import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react";

export const Login_auth = () => {

    const { userEmail,
            userPassword,
            userName, 
            user, 
            setUser, 
            setUserEmail, 
            setUserPassword, 
            setUserName } = useContext(UserContext);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser); // Set the user data if a user is logged in
          } else {
            setUser(null); // Clear user data if not logged in
          }
        });
    
        return () => unsubscribe(); // Clean up the listener on component unmount
    }, [setUser]);

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try{
            const userCreds = await signInWithEmailAndPassword(auth, userEmail, userPassword)
            console.log(userCreds)
            setUserEmail(userEmail)
            setUserPassword(userPassword)

            setIsRedirecting(true)
            //   can show a redirecting circle for better user experience
            setTimeout(()=>{
                navigate("/dashboard")
            }, 1500)  
        }catch(error){
            setError(error.message)
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    };

    return(
        <div>
            {error && <p style={{ color: 'red' }}>email and password not found</p>}
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Loging in...' : 'LoginIn'}
            </button>
            {isRedirecting && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    Login successful! Redirecting to dashboard...
                </div>
            )}
        </div>
    )
}