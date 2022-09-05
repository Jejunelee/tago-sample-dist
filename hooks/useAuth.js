import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as Google from 'expo-google-app-auth';
import { ANDROID_CLIENT_ID } from '@env';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut, createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import * as Facebook from 'expo-facebook';
import { Platform } from 'react-native';
const AuthContext = createContext({});
let someData = {}
const config = {
    androidClientId: "797166466853-5qi4d83c5i8nbkkoc5npragn4deulqi8.apps.googleusercontent.com",
    iosClientId: '797166466853-0t65no9rtjtbjg0ts10u67d34eao97d2.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]
}
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [metaData, setMetaData] = useState(null)
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData')
            if (value !== null) {
                return JSON.parse(value)
            } else return null
        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => onAuthStateChanged(auth, (user) => {
        if (user) {
            if (someData != {}) {
                const userData = {
                    ...user,
                    ...someData,
                }
                storeData(userData)
                setUser(userData)
                // const userData = {
                //     name: someData?.name,
                //     email: someData?.email,
                //     password: someData?.password,
                //     gender: someData?.gender,
                //     dob: someData?.dob,
                //     like: someData?.like,
                //     image: someData?.image,
                //     basics: someData?.basics,
                // }
                // setUser({ ...userData, ...user });
            } else {
                setUser(getData())
            }
        }
        else {
            setUser(null);
        }
        setLoadingInitial(false);
    }), [])
    //Sign function
    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async (loginResult) => {
            if (loginResult.type === 'success') {
                console.log(loginResult)
                //login..
                const { idToken, accesToken } = loginResult;
                const credential = GoogleAuthProvider.credential(idToken, accesToken);
                await signInWithCredential(auth, credential)
            }
            return Promise.reject();
        }).catch(error => {
            setError(error)
            setLoading(false)
        }).finally(() => setLoading(false))
    }
    const signInWithFacebook = async () => {
        try {
            console.log('here')
            await Facebook.initializeAsync({
                appId: '1426747521165023',
                appName: 'tago-test'
            });
            console.log('here')
            const { type, token, expirationDate, permissions, declinedPermissions } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['email'],

                });

            if (type === 'success') {
                console.log('success here')
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
                console.log('here')
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
        // if (Platform.OS == 'android') {
        //     Facebook.initializeAsync('1426747521165023').then(async () => {
        //         const { type, token, expirationDate, permissions, declinedPermissions } =
        //             await Facebook.logInWithReadPermissionsAsync({
        //                 permissions: ['public_profile'],
        //             });
        //         if (type === 'success') {
        //             // Get the user's name using Facebook's Graph API
        //             const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //             Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        //         } else {
        //             // type === 'cancel'
        //         }
        //     }).catch(error => {
        //         alert(error)
        //         console.log(error)
        //     })
        // }
        // try {


        // } catch (error) {
        //     console.log(error)
        //     alert(`Facebook Login Error: ${error.message}`);
        // }
    }

    const signupWithEmailPassword = async (data) => {
        someData = data
        setLoading(true)
        
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                user.providerData[0].photoURL = data.image
                user.displayName = data.name
                user.photoURL = data.image
                // console.log('asdasd', user)
                setLoading(false)
                // ...
            })
            .catch((error) => {
                console.log(error)
                alert(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    //Signout function
    const logout = () => {
        setLoading(true);
        signOut(auth).catch(error => setError(error)).finally(() => setLoading(false))
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
        signInWithFacebook,
        signupWithEmailPassword,
    }), [user, loading, error]);

    return (
        <AuthContext.Provider value={
            memoedValue
        }>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}

