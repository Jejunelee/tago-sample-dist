import { useNavigation } from "@react-navigation/core";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ChatList from "../components/ChatList";
import auth from '../firebase'
// import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import tw from "tailwind-rn";
import BottomNavi from "./BottomNavi";
import { signOut, } from '@firebase/auth';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from "@react-navigation/core";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions'
import moment from "moment";
import RegisterScreen1 from "./RegisterScreen-1";
import RegisterScreen2 from "./RegisterScreen-2";
import UploadScreen from "./UploadScreen";
import { Modal } from "react-native-web";
//using Components in RN

const MyProfile = ({ user, setUserData }) => {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  // const { user, logout } = useAuth();
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData')
      navigation.navigate('LoginScreen')

    } catch (e) {
      console.log(e)
      // return null
      // error reading value
    }
  }
  const logout = () => {
    setLoading(true);
    const data = removeData()
    if (data) {
      removeData()
      // setUserData(null)
      setLoading(false)
    }

    // signOut(auth).catch(error => console.log(error)).finally(() => {

    // })
  }

  return (
    <View style={tw("bg-background flex-1 relative items-center ")}>
      {/* <Text>I am the chat screen!</Text> */}
      <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={{
              uri: "https://i.imgur.com/DZlkGPe.png",
            }}
            style={tw("h-8 w-20 top-1")}
          />

        </TouchableOpacity>

        
        <View style={tw("top-6")}>
        <Image
        source={{ uri: user?.image[0] }}
        style={{ height: responsiveHeight(50), width: responsiveWidth(80), alignSelf: 'center', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        />
        </View>
      <TouchableOpacity
        onPress={() => swipeRef.current.swipeLeft()}
        style={[tw("font-semibold text-center")

        ]}
      >
      </TouchableOpacity>

      <View style={{paddingVertical: 6}} >
      <TouchableOpacity
        onPress={() => navigation.navigate("UploadScreen")}
        style={[tw("items-center justify-center rounded-3xl w-20 h-8 bg-yellow-300"),]}
      >
        <AntDesign name="edit" size={20} color="#454545" />
      </TouchableOpacity>
      </View>

      <View style={{alignSelf: 'center', width: responsiveWidth(81), height: responsiveHeight(4)}} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
      <Text style={tw("text-xl font-bold text-white")}>
      1,000
      </Text>
      <Text style={tw("text-xl font-bold text-white ")}>
      2,000
      </Text>
      </View>
      </View>

      <View style={{alignSelf: 'center', width: responsiveWidth(79), height: responsiveHeight(4)}} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
      <Text style={tw("text-md font-semibold text-white")}>
      Followers
      </Text>
      <Text style={tw("text-md font-semibold text-white")}>
      Posts
      </Text>
      </View>
      </View>


      <View style={{alignSelf: 'center', width: responsiveWidth(90), paddingVertical: 5, paddingHorizontal: 20 }} >
          <View style={{}} >


      <Text style={tw(" text-yellow-300 text-xl font-bold ")}>
        {user?.name},
        <Text style={tw("text-transparent")}>-</Text>
        {user?.dob ? moment().diff(new Date(user?.dob?.seconds * 1000), 'years') : 'N/A'}
        </Text>

        <Text style={tw(" text-white text-lg font-bold")}>
        {user?.SchoolorWorkText} 
        </Text>

        <Text style={tw(" text-white text-lg font-bold ")}>
        {user?.location}
        </Text>


  </View>
</View>

<View style={{alignSelf: 'center', paddingVertical: 12}} >
          <View style={{}} >

<TouchableOpacity
        onPress={() => navigation.navigate("Modal")}
        style={[tw("items-center justify-center rounded-3xl w-72 h-11 bg-gray-600")]}
      >
        <Text style={tw("text-md text-gray-900")}>Edit Profile</Text>
      </TouchableOpacity>

      </View>
      </View>

      <BottomNavi style={[
        tw("bg-gray-300 p-4 rounded-full"),
        { marginVertical: "155%" },
        { marginHorizontal: "5%" },
      ]} />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => dispatch({
      type: 'SET_USER_DATA',
      payload: userData
    })
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
