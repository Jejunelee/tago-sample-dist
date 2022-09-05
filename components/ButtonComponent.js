import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ButtonComponent = ({ type, onPress }) => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: type == 'google' || type == 'facebook' ? 'white' : '#FFCB37', justifyContent: type == 'register' ? 'center' : 'space-between' }]} onPress={onPress}>
            {
                type !== 'register' && (
                    <Image style={styles.image} source={type == 'google' ? require('../assets/google-logo.png') : require('../assets/fb-logo.png')} />
                )
            }
            <Text style={styles.text} >
                {
                    type == 'google' ? 'Sign in with Google' : type == 'facebook' ? 'Sign in with Facebook' : 'Register'
                }
            </Text>
            <Text>{'        '}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        height: '8%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        alignSelf: 'center',
        marginTop: 10
    },
    text: {
        color: 'black',
        fontWeight: '700',
        fontSize: 20
    },
    image: {
        height: '80%',
        width: '15%',
        resizeMode:'contain'
    }
});

export default ButtonComponent;
