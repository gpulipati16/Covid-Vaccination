import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  confirmPasswordReset,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendPasswordResetEmail,
} from "firebase/auth";



import { auth } from "../firebase";

const userAuthContext = createContext();


export function UserAuthContextProvider({ children }) {
     const [user, setUser] = useState({});
     
  
    function logIn(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email, password) {
      return createUserWithEmailAndPassword(auth, email, password);
  }
  
    function forgotPassword(email) {
         return sendPasswordResetEmail(auth,email);
    }

    function resetPassword(oobCode, newPassword) {
      console.log(oobCode, newPassword);
      return confirmPasswordReset(auth, oobCode, newPassword);
    }

    function logOut() {
      return signOut(auth);
    }

    function googleSignIn() {
      const googleAuthProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleAuthProvider);
    }

    function setUpRecaptcha(number) {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth,number,recaptchaVerifier);
    }


  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        console.log("Auth", currentuser);
        setUser(currentuser);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <userAuthContext.Provider value={{user,signUp,logIn,logOut,googleSignIn,setUpRecaptcha,forgotPassword,resetPassword}}> {children} </userAuthContext.Provider>
    );
  };


export function useUserAuth() {
    return useContext(userAuthContext);
}