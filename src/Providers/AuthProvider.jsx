import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';
// import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    // const axiosPublic = useAxiosPublic()


    const createUser = (email, password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const signIn = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    const logout = () => {
        setLoading(false)
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.token) {
                            localStorage.setItem('token', res.data.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('token')
            }
            setLoading(false)
            console.log(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [axiosPublic])

    // useEffect(()=>{
    //    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
    //     setUser(currentUser)
    //     if(currentUser){
    //         const userInfo = {email: currentUser.email}
    //         axiosPublic.post('/jwt', userInfo)
    //         .then((res) => {
    //             console.log(res.data)
    //             if(res.data.token){
    //                 localStorage.setItem('token', res.data.token)
    //             }
    //         })
    //     }
    //     else{
    //         localStorage.removeItem('token')
    //     }
    //     setLoading(false)
    //    })
    //    return ()=>{
    //     return unsubscribe()
    //    }
    // },[axiosPublic])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        updateUser,
        googleSignIn

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;