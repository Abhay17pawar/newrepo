import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIdKGi7F2cQLfpglMiS-aIO1_LfjG9Hk8",
    authDomain: "nurseconnect-aa63e.firebaseapp.com",
    projectId: "nurseconnect-aa63e",
    storageBucket: "nurseconnect-aa63e.appspot.com",
    messagingSenderId: "405418795098",
    appId: "1:405418795098:web:e90be82005a397449ab863"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Create Firebase context
const FirebaseContext = createContext(null);

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider Component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);


  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  
  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };


  const logoutUser = () => {
    return signOut(firebaseAuth);
  };

  const putData = (key, data) => {
    return set(ref(database, key), data)
      .then(() => console.log(`Data stored successfully at ${key}`))
      .catch((error) => console.error(`Error storing data at ${key}:`, error));
  };

  
  const signupWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        setUser(result.user); 
        console.log("Google Sign-in successful:", result.user);
        return result; // Return the result object
      })
      .catch((error) => {
        console.error("Error during Google Sign-in:", error);
        throw error; // Ensure errors are propagated so they can be caught in handleGoogleSignin
      });
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, signupUserWithEmailAndPassword, loginUserWithEmailAndPassword, logoutUser, putData, signupWithGoogle }}>
      {children}
    </FirebaseContext.Provider>
  );
};
