//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'

const TextInputComponent = ({ onChangeText, value, placeholder, header, secureTextEntry, onPress, height }) => {
    const [showPassword, setShowPassword] = useState(secureTextEntry)
    useEffect(() => {
        if (header == 'Password' && secureTextEntry == undefined)
            setShowPassword(true)
        // console.log(secureTextEntry)
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.text} >
                {header}
            </Text>
            {
                header == 'Password' ? (
                    <View style={styles.passwordContainer} >
                        <TextInput
                            style={styles.passwordInput}
                            onChangeText={onChangeText}
                            value={value}
                            placeholder={placeholder}
                            placeholderTextColor="#ACACAC"
                            secureTextEntry={showPassword} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                            <Image
                                source={showPassword == true || showPassword == undefined ? require('../assets/hide-password-icon.png') : require('../assets/show-password-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                ) : header == 'Date of Birth' ? (
                    <TouchableOpacity style={styles.passwordContainer} onPress={onPress} >
                        <TextInput
                            editable={false}
                            style={styles.passwordInput}
                            onChangeText={onChangeText}
                            value={value}
                            placeholder={placeholder}
                            placeholderTextColor="#ACACAC" />
                        <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                source={require('../assets/calender-button-icon.png')}
                                style={{ height: '50%', width: '50%', resizeMode: 'contain' }}
                            />
                        </View>
                    </TouchableOpacity>
                ) : header == 'My Location' ? (
                    <TouchableOpacity style={styles.passwordContainer} onPress={onPress}>
                        <TextInput
                            editable={false}
                            style={styles.passwordInput}
                            onChangeText={onChangeText}
                            value={value}
                            placeholder={placeholder}
                            placeholderTextColor="#ACACAC" />
                        <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                source={require('../assets/calender-button-icon.png')}
                                style={{ height: '50%', width: '50%', resizeMode: 'contain' }}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TextInput
                        style={[styles.textInput, { height: height == undefined ? responsiveHeight(7) : height, borderRadius: height == undefined ? 50 : 30 }]}
                        onChangeText={onChangeText}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#ACACAC" />
                )
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(100),
        marginTop: 15
    },
    textInput: {
        width: responsiveWidth(85),
        height: responsiveHeight(7),
        backgroundColor: 'white',
        borderRadius: 50,
        marginTop: 5,
        paddingHorizontal: 15,
        fontSize: responsiveFontSize(2),
    },
    text: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        marginLeft: 15
    },
    passwordContainer: {
        flexDirection: 'row',
        width: responsiveWidth(85),
        height: responsiveHeight(7),
        backgroundColor: 'white',
        borderRadius: 50,
        marginTop: 5,
        paddingHorizontal: 15,
    },
    passwordInput: {
        width: responsiveWidth(70),
        height: responsiveHeight(7),
        fontSize: responsiveFontSize(2),
        color: 'black',
        fontWeight: 'bold'
    },
    image: {
        width: responsiveWidth(10),
        height: responsiveHeight(7),
        resizeMode: 'contain'
    },
});

export default TextInputComponent;
