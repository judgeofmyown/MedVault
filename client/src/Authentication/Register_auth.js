import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react";

export const Register_auth = () => {
  const { userEmail, userPassword, userName, user, setUser, setUserEmail, setUserPassword, setUserName } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false)

//   onAuthStateChanged(auth, (currentUser)=>{
//     setUser(currentUser);
//   })
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


  const handleRegister = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const currentUser = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    //   currentUser.user.displayName = userName
      console.log("User registered successfully:", currentUser);
      console.log(userName, userEmail, userPassword)
      setUserName(userName);  // Update the userName in context
      setUserEmail(userEmail);  // Update the userEmail in context
      setUserPassword(userPassword);  // Update the userPassword in context
      console.log(user)
      // You can also set the user state here if you want to manage the logged-in state.
      setIsRedirecting(true)
    //   can show a redirecting circle for better user experience
      setTimeout(()=>{
        navigate("/dashboard")
      }, 1500)  
    } catch (error) {
      setError(error.message);
      console.log("Error during registration:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {isRedirecting && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Registration successful! Redirecting to dashboard...
        </div>
      )}
    </div>
  );
};



