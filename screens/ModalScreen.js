import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-rn';
import { db } from '../firebase';
// import useAuth from '../hooks/useAuth';
import BottomNavi from "./BottomNavi";
import { connect } from "react-redux";
const ModalScreen = ({ user }) => {
  // const {user} = useAuth();
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user?.uid), {
      id: user?.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      Gender: gender,
      timestamp: serverTimestamp(),
    })

      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView style={tw('flex-1 items-center pt-10')}>
      <Image
        style={tw('h-20 w-full')}
        resizeMode="contain"
        source={{ uri: 'https://links.papareact.com/2pf' }}
      />
      <Text style={tw('text-xl text-gray-500 font-bold p-2')}>Welcome {user.displayName}</Text>
      <Text style={tw('text-center p-4 font-bold text-red-400')}>Choose your profile picture</Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        style={tw('text-center text-xl pb-2')}
        placeholder='Enter a profile picture URL'
      />
      <Text style={tw('text-center p-4 font-bold text-red-400')}>What is your job?</Text>
      <TextInput
        value={job}
        onChangeText={(text) => setJob(text)}
        style={tw('text-center text-xl pb-2')}
        placeholder='Enter your occupation'
      />
      <Text style={tw('text-center p-4 font-bold text-red-400')}>What is your age?</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        style={tw('text-center text-xl pb-2')}
        placeholder='Enter your age'
        keyboardType='numeric'
        maxLength={90}
      />
      <Text style={tw('text-center p-4 font-bold text-red-400')}>What is your gender?</Text>
      <TextInput
        value={gender}
        onChangeText={(text) => setGender(text)}
        style={tw('text-center text-xl pb-2')}
        placeholder='What gender are you?'
        maxLength={90}
      />
      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={[tw('w-64 p-3 rounded-xl my-20'), incompleteForm ? tw('bg-gray-200') : tw('bg-red-400')
        ]}
      >
        <Text style={[tw('text-center text-white')]}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(ModalScreen)
