//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
// create a component
const RegisterScreen2 = ({ navigation, route }) => {
    const {
        name,
        email,
        password
    } = route.params
    const [gender, setGender] = useState('Male')
    const [dob, setDob] = useState(new Date())
    const [like, setLike] = useState('Men')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const onNextButtonPress = () => {
        navigation.navigate('RegisterScreen3', {
            name: name,
            email: email,
            password: password,
            gender: gender,
            dob: dob,
            like: like,
        })
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false} >
            <View style={styles.container}>
                <Text style={styles.header} >
                    Tell us about yourself
                </Text>
                <Text style={styles.text} >
                    I am a...
                </Text>
                <View style={styles.genderButtonsContainer} >
                    <CheckBoxButton
                        header="Male"
                        selected={gender == 'Male' ? true : false}
                        onPress={() => setGender('Male')} />
                    <CheckBoxButton
                        header="Female"
                        selected={gender == 'Female' ? true : false}
                        onPress={() => setGender('Female')} />
                </View>

                <TextInputComponent header="Date of Birth" onPress={() => setShowDatePicker(true)} value={moment(dob).format('DD/MM/YYYY')} />
                {
                    showDatePicker && (
                        <DateTimePicker
                            mode="date"
                            value={dob}
                            maximumDate={new Date()}
                            onChange={(event, date) => {
                                setDob(date)
                                setShowDatePicker(false)
                            }}
                        />
                    )
                }
                <Text style={styles.text} >
                    I like...
                </Text>
                <View style={styles.genderButtonsContainer} >
                    <CheckBoxButton
                        header="Men"
                        selected={like == 'Men' ? true : false}
                        onPress={() => setLike('Men')} />
                    <CheckBoxButton
                        header="Women"
                        selected={like == 'Women' ? true : false}
                        onPress={() => setLike('Women')} />
                </View>
                <View style={styles.genderButtonsContainer} >
                    <CheckBoxButton
                        header="Both"
                        selected={like == 'Both' ? true : false}
                        onPress={() => setLike('Both')} />
                    <CheckBoxButton
                        header="Undecided"
                        selected={like == 'Undecided' ? true : false}
                        onPress={() => setLike('Undecided')} />
                </View>
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
    workschoolButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
});

//make this component available to the app
export default RegisterScreen2;
