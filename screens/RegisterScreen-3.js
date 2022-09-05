import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
import CheckBoxButton from '../components/CheckBoxButton';
import NextButton from '../components/NextButton';
import * as ImageSinglePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
const RegisterScreen3 = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const {
        name,
        email,
        password,
        gender,
        dob,
        like,
        SchoolorWorkText
    } = route.params
    const [image, setImage] = useState([])
    const launchCamera = async () => {
        const result = await ImageSinglePicker.launchCameraAsync({
            mediaTypes: ImageSinglePicker.MediaTypeOptions.Images,
            allowsEditing: true,

        })
        if (!result.cancelled) {
            _handleImagePicked(result)
        }
    }
    const launchGallery = async () => {
        const result = await ImageSinglePicker.launchImageLibraryAsync({
            mediaTypes: ImageSinglePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        })
        if (!result.cancelled) {
            _handleImagePicked(result)
        }
    }
    const _handleImagePicked = async (pickerResult) => {
        try {
            setLoading(true)
            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                console.log('url', uploadUrl)
                setImage(oldArray => [...oldArray, uploadUrl]);
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setLoading(false)
        }
    };
    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const fileRef = ref(getStorage(), uuidv4());
        const result = await uploadBytes(fileRef, blob);
        // We're done with the blob, close and release it
        blob.close();
        return await getDownloadURL(fileRef);
    }
    const onNextButtonPress = () => {
        console.log(image)
        navigation.navigate('RegisterScreen4', {
            name: name,
            email: email,
            password: password,
            gender: gender,
            dob: dob,
            like: like,
            image: image,
            SchoolorWorkText: SchoolorWorkText
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
                    Upload atleast one photo.
                </Text>
                <View style={styles.imageContainer} >
                    {
                        image.length == 0 ? (
                            <Text style={styles.text}>
                                Please select an image
                            </Text>
                        ) : (
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={image}
                                renderItem={({ item }) => {
                                    return (
                                        <Image style={styles.image}
                                            source={{ uri: item }}
                                        />
                                    )
                                }}
                            />

                        )
                    }
                </View>
                <View style={styles.genderButtonsContainer} >
                    <CheckBoxButton
                        header="Take Photo"
                        selected={true}
                        onPress={launchCamera} />
                    <CheckBoxButton
                        header="Camera Roll"
                        selected={false}
                        onPress={launchGallery} />
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
    genderButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    imageContainer: {
        height: responsiveHeight(65),
        width: responsiveWidth(90),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    image: {
        height: responsiveHeight(65),
        width: responsiveWidth(90),
        borderRadius: 20,
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
    },
});

//make this component available to the app
export default RegisterScreen3;
