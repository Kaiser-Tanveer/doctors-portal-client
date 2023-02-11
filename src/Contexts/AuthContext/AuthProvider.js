import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    // Create User 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Email Sign In 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google Sign in 
    const GoogleLogIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    //Log out
    const logOut = () => {
        return signOut(auth);
    }




    // User State Change observer 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, []);


    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }


    const authValue = {
        createUser,
        signIn,
        logOut,
        updateUser,
        GoogleLogIn,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;