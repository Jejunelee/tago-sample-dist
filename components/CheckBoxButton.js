import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'

const CheckBoxButton = ({ selected, header, onPress, size }) => {
    if (size == 'small') {
        return (
            <TouchableOpacity onPress={onPress} style={selected == true || selected == undefined ? styles.selectedSmall : styles.unselectedSmall}>
                <Text style={selected == true || selected == undefined ? styles.selectedText : styles.unselectedText}>
                    {header}
                </Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress} style={selected == true || selected == undefined ? styles.selected : styles.unselected}>
                <Text style={selected == true || selected == undefined ? styles.selectedText : styles.unselectedText}>
                    {header}
                </Text>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    unselected: {
        height: responsiveHeight(6),
        width: responsiveWidth(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
    },
    unselectedText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
    },
    selected: {
        height: responsiveHeight(6),
        width: responsiveWidth(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFCB37',
        backgroundColor: '#FFCB37',
        borderWidth: 1,
        borderRadius: 50,
    },
    selectedText: {
        color: '#1F1F1F',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
    },
    unselectedSmall: {
        height: responsiveHeight(6),
        width: responsiveWidth(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
    },
    selectedSmall: {
        height: responsiveHeight(6),
        width: responsiveWidth(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFCB37',
        backgroundColor: '#FFCB37',
        borderWidth: 1,
        borderRadius: 50,
    },
});

export default CheckBoxButton;
