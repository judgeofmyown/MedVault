import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../Authentication/firebase-config"
import { signOut } from "firebase/auth";


export const Register_auth = () => {
  const { userEmail, userPassword, 
          setUser, 
          setUserEmail, setUserPassword,
          fullName, setFullName,
          phone, setPhone,
          permanentAddress, setPermanentAddress,
          postOfficeAddress, setPostOfficeAddress,
          profilePhoto, setProfilePhoto, 
          profilePhotoURL, setProfilePhotoURL} = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user data if a user is logged in
        try{
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          if (userDoc.exists()){
            const data = userDoc.data();

            setFullName(data.fullName);
            setPhone(data.phone);
            setPermanentAddress(data.permanentAddress);
            setPostOfficeAddress(data.postOfficeAddress);
            setUserEmail(data.userEmail)
            setUserPassword(data.userPassword)
            setProfilePhoto(data.profilePhoto)
            setProfilePhotoURL(data.profilePhotoURL)

          }
        }catch(fetchError){
          console.log("error fetching user data", fetchError.message);
        }
      } else {
        setUser(null); // Clear user data if not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [setUser, fullName, setFullName, setUserEmail, setPhone, setPermanentAddress, setUserPassword, setPostOfficeAddress, setProfilePhoto, setProfilePhotoURL]);


  const handleRegister = async () => {
    setIsLoading(true);
    setError(null);
    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    };
    // Validate email format
    if (!validateEmail(userEmail)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
  
    // Check if email or password is empty
    if (!userEmail || !userPassword) {
      setError('Email and Password fields are required.');
      setIsLoading(false);
      return;
    }
  
    try {
      const currentUser = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      const user = currentUser.user;
  
      // Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName,
        phone,
        permanentAddress,
        postOfficeAddress,
        profilePhotoURL,
        createdAt: new Date().toISOString(),
      });
  
      // Store user data in context state
      setFullName(fullName);
      setPhone(phone);
      setUserEmail(userEmail);
      setUserPassword(userPassword);
      setPermanentAddress(permanentAddress);
      setPostOfficeAddress(postOfficeAddress);
      setProfilePhoto(profilePhoto);
      setProfilePhotoURL(profilePhotoURL);
  
      console.log("User registered", user);
  
      setIsRedirecting(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      await signOut(auth);
      setFullName("");
      setPhone("");
      setUserEmail("");
      setUserPassword("");
      setPermanentAddress("");
      setPostOfficeAddress("");
      setProfilePhoto(null);
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



