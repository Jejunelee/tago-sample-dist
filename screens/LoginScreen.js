import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
  LogBox,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from "react-native";
// import useAuth from "../hooks/useAuth";
import { connect } from "react-redux";
import tw from "tailwind-rn";
import ButtonComponent from "../components/ButtonComponent";
const config = {
  expoClientId: '797166466853-uv3b8n82hc485n9p447jj8ch44d7gqip.apps.googleusercontent.com',
  androidClientId: "797166466853-5qi4d83c5i8nbkkoc5npragn4deulqi8.apps.googleusercontent.com",
  iosClientId: '797166466853-0t65no9rtjtbjg0ts10u67d34eao97d2.apps.googleusercontent.com',
  webClientId: '797166466853-6thgmo6jnsebtrhimi9i7j5g9egcam3i.apps.googleusercontent.com',
  // scopes: ["profile", "email"],
  // permissions: ["public_profile", "email", "gender", "location"],
}
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";

import * as AuthSession from 'expo-auth-session/providers/google'
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut, createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../firebase';
import * as Facebook from 'expo-facebook';
// import { getData } from "../helper-functions";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ setUserData }) => {
  const [loading, setLoading] = useState(false)
  const [request, response, promptAsync] = AuthSession.useIdTokenAuthRequest(config);
  // const [request, response, promptAsync] = AuthSession.useAuthRequest(config);
  //since authprovider wraps the stack navigator in the app js, it can be accessed everywhere in the stack!
  // const { signInWithGoogle, loading, signInWithFacebook } = useAuth();
  // const { user } = useAuth();
  // console.log(user);
  useEffect(async () => {
    if (response?.params) {
      if (response?.type == 'success') {
        const { id_token } = response?.params;

        // const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token, response?.authentication?.accessToken)
        console.log(credential)
        // signInWithCredential(auth, credential);
        const someData = await signInWithCredential(auth, credential)
        // alert(someData)
        console.log('someData', someData)
        const userData = {
          name: someData.user.displayName,
          email: someData.user.email,
          password: '',
          gender: '',
          dob: new Date(),
          like: '',
          image: [someData.user.photoURL],
          basics: [],
          location: '',
          getOnIfAnswer: '',
          wouldRatherAnswer: '',
          findMeAnswer: '',
          uid: someData.user.uid
        }
        setDoc(doc(db, 'users', someData.user.uid), userData)
        setUserData(userData)
        storeData(userData)
        setLoading(false)
        navigation.navigate('Home')
      } else if (response?.error) {
        alert(response?.error)
      }
    }
  }, [response])
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData')
      console.log('value', value)
      if (value != null) {
        setUserData(JSON.parse(value))
        navigation.navigate('Home')
      }

    } catch (e) {
      console.log(e)
      // return null
      // error reading value
    }
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(value))
      navigation.navigate('Home')
    } catch (e) {
      // return null
      // saving error
    }
  }
  const navigation = useNavigation(); //redirect user
  useEffect(() => {
    getData()
    // const data = getData()
    // if (data != null) {
    //   navigation.navigate('Home')
    // }
  }, [])

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);
  const signInWithGoogle = async () => {
    promptAsync()
    // alert('google pressed')
    setLoading(true);
    // console.log(request, 'req')
    // console.log(response, 'res')
    // console.log(promptAsync, 'promt')
    // await Google.logInAsync(config).then(async (loginResult) => {
    //   if (loginResult.type === 'success') {
    //     // console.log(loginResult)
    //     //login..
    //     const { idToken, accesToken } = loginResult;
    //     const credential = GoogleAuthProvider.credential(idToken, accesToken);
    //     const someData = await signInWithCredential(auth, credential)
    //     console.log('someData', someData)
    //     const userData = {
    //       name: someData.user.displayName,
    //       email: someData.user.email,
    //       password: '',
    //       gender: '',
    //       dob: new Date(),
    //       like: '',
    //       image: [someData.user.photoURL],
    //       basics: [],
    //       location: '',
    //       getOnIfAnswer: '',
    //       wouldRatherAnswer: '',
    //       findMeAnswer: '',
    //     }
    //     setUserData(userData)
    //     storeData(userData)
    //     setLoading(false)
    //     navigation.navigate('Home')
    //   }
    //   return Promise.reject();
    // }).catch(error => {
    //   // setError(error)
    //   setLoading(false)
    // }).finally(() => setLoading(false))
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
          permissions: ['public_profile'],

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
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#1F1F1F"
      />
      <Image
        source={require('../assets/login-screen-logo.png')}
        style={styles.image}
      />
      {
        loading && (
          <ActivityIndicator size="large" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 100 }} color="#FFCB37" />
        )
      }

      <ButtonComponent type="register" onPress={() => { navigation.navigate('RegisterScreen1') }} />
      <ButtonComponent type="google" onPress={signInWithGoogle} />
      <ButtonComponent type="facebook" onPress={signInWithFacebook} />
      {/* <ImageBackground
        source={{ uri: "https://i.imgur.com/aUGNynl.png" }}
        resizeMode="cover"
        style={tw("flex-1")}
      > */}

      {/* <ImageBackground
          source={require('../assets/login-screen-logo.png')}
          resizeMode="cover"
          style={tw("h-56 w-56 top-60 left-16 flex-1")}
        >
        </ImageBackground> */}


      {/* TRY OTHER TOUCHABLES AS WELL */}
      {/* <TouchableOpacity
          style={[
            tw("ml-4 absolute bottom-40 p-3 w-96 rounded-2xl bg-yellow-400 rounded-full"),
            { marginHorizontal: "25%" },
          ]}
          onPress={signInWithGoogle}
        >

          <Text style={tw("font-bold text-lg text-black text-center")}>
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw("ml-4 absolute bottom-20 p-3 w-96 rounded-2xl bg-white rounded-full"),
            { marginHorizontal: "25%" },
          ]}
          onPress={signInWithGoogle}
        >

          <Text style={tw("font-bold text-lg text-black text-center")}>
            Sign In via Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw("ml-4 absolute bottom-20 p-3 w-96 rounded-2xl bg-white rounded-full"),
            { marginHorizontal: "25%" },
          ]}
          onPress={signInWithGoogle}
        >

          <Text style={tw("font-bold text-lg text-black text-center")}>
            Sign In via Facebook
          </Text>
        </TouchableOpacity>

*/}
      <Text style={styles.developedByText}>
        Developed by Evolver Inc.
      </Text>
      {/* </ImageBackground> */}
      {/* //using image background */}
      {/* <Text>{loading ? "Loading.." : "Login to the App!"}</Text>
      <Button title="Login" onPress={signInWithGoogle} /> */}
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => dispatch({
      type: 'SET_USER_DATA',
      payload: userData
    })
  }
}
export default connect(null, mapDispatchToProps)(LoginScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    justifyContent: 'flex-end',
  },
  developedByText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20
  },
  image: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width - 150,
    width: Dimensions.get('window').width - 150,
    alignSelf: 'center',
    marginBottom: '20%'
  }
})