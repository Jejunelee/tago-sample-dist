//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
import TextInputComponent from '../components/TextInput';
import NextButton from '../components/NextButton';
import { createUserWithEmailAndPassword, } from '@firebase/auth';
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
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
import { db } from '../firebase';
import 'react-native-get-random-values'
const RegisterScreen5 = ({ navigation, route, setUserData }) => {
    const [loading, setLoading] = useState(false)
    const [testImage, setTestImage] = useState([])
    const {
        name,
        email,
        password,
        gender,
        dob,
        like,
        image,
        basics,
        location
    } = route.params
    const [getOnText, setGetOnText] = useState('')
    const [wouldRatherText, setWouldRatherText] = useState('')
    const [findMeText, setFindMeText] = useState('')
    const [SchoolorWorkText, setSchoolorWorkText] = useState('')
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(value))
            navigation.navigate('Home')
        } catch (e) {
            // return null
            // saving error
        }
    }
    const signupWithEmailPassword = async (data) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                const userData = {
                    name,
                    email,
                    password,
                    gender,
                    dob,
                    like,
                    image,
                    basics,
                    location,
                    SchoolorWorkText: SchoolorWorkText,
                    getOnIfAnswer: getOnText,
                    wouldRatherAnswer: wouldRatherText,
                    findMeAnswer: findMeText,
                    uid: user.uid,
                }
                setDoc(doc(db, 'users', user.uid), userData)
                setUserData(userData)
                storeData(userData)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }
    const onNextButtonPress = () => {
        signupWithEmailPassword({
            email,
            password,
            name,
            email,
            password,
            gender,
            dob,
            like,
            image,
            basics,
        })

    }
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false} >
            {
                loading && (
                    <ActivityIndicator size="large" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 100 }} color="#FFCB37" />
                )
            }
            <View style={styles.container}>
                <Text style={styles.header} >
                    You are nearly there!
                </Text>
                <View style={styles.workschoolButtonsContainer} >
                <TextInputComponent
                    header="My School/Job:"
                    placeholder="your work or school..."
                    secureTextEntry={true}
                    value={SchoolorWorkText}
                    onChangeText={setSchoolorWorkText}
                />
                </View>
                <Text>

                </Text>
                <TextInputComponent
                    header="Description 1: We’ll get on if..."
                    placeholder="optional..."
                    secureTextEntry={false}
                    height={responsiveHeight(7)}
                    value={getOnText}
                    onChangeText={setGetOnText}
                />
                <TextInputComponent
                    header="Description 2: I would rather..."
                    placeholder="optional..."
                    secureTextEntry={false}
                    height={responsiveHeight(7)}
                    value={wouldRatherText}
                    onChangeText={setWouldRatherText}
                />
                <TextInputComponent
                    header="Description 3: You can find me..."
                    placeholder="optional..."
                    secureTextEntry={true}
                    height={responsiveHeight(7)}
                    value={findMeText}
                    onChangeText={setFindMeText}
                />

                <NextButton onPress={onNextButtonPress} />
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        backgroundColor: '#1F1F1F',
    },
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F',
        padding: 20,
    },
    header: {
        color: '#FFCB37',
        fontSize: 35,
        fontWeight: '700',
        width: responsiveWidth(80),
    },
    nextButton: {
        width: responsiveWidth(90),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        position: 'absolute',
        bottom: 0,
        height: responsiveHeight(8),
        zIndex: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 100
    },
    nextText: {
        fontSize: responsiveFontSize(3),
        color: 'black',
        fontWeight: '700'
    }
});
const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (userData) => dispatch({
            type: 'SET_USER_DATA',
            payload: userData
        })
    }
}
//make this component available to the app
export default connect(null, mapDispatchToProps)(RegisterScreen5)
// export default RegisterScreen5;
