import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "../Context/UserContext/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../Authentication/firebase-config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase-config";

export const Register_auth = () => {
  const { userEmail, userPassword, 
          user, setUser, 
          setUserEmail, setUserPassword,
          fullName, setFullName,
          phone, setPhone,
          permanentAddress, setPermanentAddress,
          postOfficeAddress, setPostOfficeAddress,
          profilePhoto, setProfilePhoto, } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false)

//   onAuthStateChanged(auth, (currentUser)=>{
//     setUser(currentUser);
//   })
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
            // setUserPassword(data.userPassword)
            // setProfilePhoto(data.profilePhoto)
          }
        }catch(fetchError){
          console.log("error fetching user data", fetchError.message);
        }
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
      const user = currentUser.user

      let profilePhotoURL = null;
      
      if (profilePhoto) {
        const photoRef = ref(storage, `profilePhotos/${user.uid}`);
        const snapshot = await uploadBytes(photoRef, profilePhoto);
        profilePhotoURL = await getDownloadURL(snapshot.ref);
      }

      await updateProfile(user, {
        displayName: fullName,
        photoURL: profilePhotoURL
      })

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
      setFullName(fullName);
      setPhone(phone);
      setUserEmail(userEmail);
      setUserPassword(userPassword);
      setPermanentAddress(permanentAddress)
      setPostOfficeAddress(postOfficeAddress)
      setProfilePhoto(profilePhoto)
      console.log("user registered", user)
      
      setIsRedirecting(true)
    
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



