//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
import TextInputComponent from '../components/TextInput';
import NextButton from '../components/NextButton';
// create a component
const RegisterScreen1 = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onNextButtonPress = () => {
        navigation.navigate('RegisterScreen2', {
            name: name,
            email: email,
            password: password,
        })
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false} >
            <View style={styles.container}>
                <Text style={styles.header} >
                    Let's get you started
                </Text>
                <TextInputComponent
                    header="Your Name"
                    placeholder="your name or nickname..."
                    secureTextEntry={false}
                    value={name}
                    onChangeText={setName}
                    maxlength={5}
                />
                <TextInputComponent
                    header="Email"
                    placeholder="type your email..."
                    secureTextEntry={false}
                    value={email}
                    onChangeText={setEmail}
                    maxlength={5}
                />
                <TextInputComponent
                    header="Password"
                    placeholder="type a strong password..."
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    maxlength={5}
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
        padding: 30,
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

//make this component available to the app
export default RegisterScreen1;
