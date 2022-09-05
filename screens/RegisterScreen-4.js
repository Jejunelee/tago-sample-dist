//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
import moment from 'moment';
import CheckBoxButton from '../components/CheckBoxButton';
import NextButton from '../components/NextButton';
import TextInputComponent from '../components/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker'
import ModalPicker from '../components/ModalPicker';
// create a component
const RegisterScreen4 = ({ navigation, route }) => {
    const {
        name,
        email,
        password,
        gender,
        dob,
        like,
        image,
    } = route.params
    const [array, setArray] = useState([
        'Parties',
        'Sports',
        'Active',
        'Cats',
        'Exercise',
        'Food',
        'Dogs',
        'Gaming',
        'Chill',
        'Social',
        'Catholic',
        'Christian',
        'Movies',
        'Muslim',
        'Reading'
    ])
    const [selectedItems, setSelectedItems] = useState([])
    const [location, setLocation] = useState('')
    const [locationArray, setLocationArray] = useState([
        'Manila, Philippines',
        'Quezon City, Philippines',
        'Davao, Philippines',
        'Caloocan, Philippines',
        'Cebu City, Philippines',
    ])
    const [showModal, setShowModal] = useState(false)
    const updateArray = (item) => {
        if (selectedItems.includes(item)) {
            const filtered = selectedItems.filter(i => {
                if (i !== item)
                    return i
            })
            setSelectedItems(filtered)
        } else {
            setSelectedItems(oldArray => [...oldArray, item])
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ margin: 5 }} >
                <CheckBoxButton
                    header={item}
                    selected={selectedItems.includes(item) ? true : false}
                    onPress={() => updateArray(item)}
                    size="small" />
            </View>
        )
    }
    const onNextButtonPress = () => {
        navigation.navigate('RegisterScreen5', {
            name: name,
            email: email,
            password: password,
            gender: gender,
            dob: dob,
            like: like,
            image: image,
            basics: selectedItems,
            location: location,
        })
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false} >
            <View style={styles.container}>
                <Text style={styles.header} >
                    Be yourself, :)
                </Text>
                <TextInputComponent
                    onPress={() => setShowModal(true)}
                    header="My Location"
                    placeholder="mention your location..."
                    value={location}
                    onChangeText={setLocation}
                />
                <ModalPicker
                    showModal={showModal}
                    onItemPress={(item) => {
                        setLocation(item)
                        setShowModal(false)
                    }}
                    data={locationArray}
                    onBackPress={()=> setShowModal(false)}
                />
                <Text style={styles.text} >
                    Basics (atleast 1)
                </Text>
                <FlatList
                    data={array}
                    numColumns={3}
                    renderItem={renderItem}
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
    text: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        marginLeft: 15,
        marginVertical: 10
    },
    genderButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

});

//make this component available to the app
export default RegisterScreen4;
