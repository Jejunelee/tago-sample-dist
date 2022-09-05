//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
// create a component
const ModalPicker = ({ data, showModal, onItemPress, onBackPress }) => {
    if (showModal == true) {
        return (
            <Modal isVisible={showModal} onBackdropPress={onBackPress} onBackButtonPress={onBackPress} >
                <View style={styles.modal}>
                    <Text style={styles.header} >
                        Please select your location
                    </Text>
                    <FlatList
                        data={data}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.line} />
                            )
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => onItemPress(item)} style={styles.item}>
                                    <Text style={styles.itemText}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </Modal>
        )
    } else return null
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(90),
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    modal: {
        width: responsiveWidth(90),
        backgroundColor: 'white',
        borderRadius: 20,
        maxHeight: responsiveHeight(40),
        padding: 10,
        justifyContent:'center'
    },
    header: {
        fontSize: responsiveFontSize(2.5),
        color: 'black',
        fontWeight: 'bold'
    },
    line: {
        width: responsiveWidth(85),
        borderWidth: 0.5,
        borderColor: 'grey',
        alignSelf: 'center'
    },
    item: {
        marginVertical: 10
    },
    itemText: {
        color: 'black',
        fontSize: responsiveFontSize(2)
    }
});

//make this component available to the app
export default ModalPicker;
