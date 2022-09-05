//import liraries
import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
// create a component
const NextButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.nextButton} onPress={onPress} >
            <Text style={styles.nextText} >
                Next
            </Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
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
export default NextButton;
