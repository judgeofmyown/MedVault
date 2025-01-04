import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { UserContext } from "../Context/UserContext/UserContext";

const Logout_auth = () => {
  const {  
    setUser, 
    setUserEmail, setUserPassword,
    setFullName,
    setPhone,
    setPermanentAddress,
    setPostOfficeAddress,
    setProfilePhoto, } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Clear user-related states in the context
      setUser(null);
      setUserEmail("");
      setUserPassword("");
      setFullName("");
      setPhone("");
      setUserEmail("");
      setUserPassword("");
      setPermanentAddress("")
      setPostOfficeAddress("")
      setProfilePhoto(null)

      // Redirect to login or home page after logout
      navigate("/login"); // You can change this to whatever route you want to navigate to
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout_auth;
