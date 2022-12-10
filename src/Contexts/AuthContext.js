import React, { createContext, useEffect, useState } from 'react';
import app from '../Config/Firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const userContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserDetails = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])


    const authinfo = { user, setUser, createUser, updateUserDetails, signInWithGoogle, logout, signin, loading, setLoading }
    return (
        <userContext.Provider value={authinfo}>
            {children}
        </userContext.Provider>
    );
};

export default AuthContext;