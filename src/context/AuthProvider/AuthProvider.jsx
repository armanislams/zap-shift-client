import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthCOntext/AuthContext';
import auth from '../../firebase/firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const register = (email, password) => {
        setLoading(true)
      return  createUserWithEmailAndPassword(auth, email , password)
    }
    const signIn = (email,password) => {
                setLoading(true);

       return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
       return signOut(auth)
    }
    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    const signInGoogle = () => {
                setLoading(true);

        return signInWithPopup(auth,googleProvider)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser);
            
        })
        return () => {
            unSubscribe()
        }
    },[])
    const authInfo = {
        register,
        signIn,
        logOut,
        signInGoogle,
        user,
        loading,
        updateUser
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;