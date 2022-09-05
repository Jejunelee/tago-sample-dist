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
//using Components in RN

const MyProfileORIGINAL = ({ user, setUserData }) => {
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
    <View style={{backgroundColor:"#1F2630", flex: 1 }}>
      {/* <Text>I am the chat screen!</Text> */}
      <Header title="My Profile" />

      <Image
        source={{ uri: user?.image[0] }}
        style={[tw(" h-40 w-40 rounded-full justify-center"),
        { marginVertical: "6%" },
        { marginHorizontal: "27%" },
        ]}
      />

      <TouchableOpacity
        onPress={() => swipeRef.current.swipeLeft()}
        style={[tw("font-semibold text-center")

        ]}
      >
        <Text style={tw("text-4xl font-bold text-center")}>
          J.18
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => swipeRef.current.swipeLeft()}
        style={[tw("font-semibold text-center")

        ]}
      >
        <Text style={tw("text-base font-semibold text-center")}>
          MARIKINA CITY
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => swipeRef.current.swipeLeft()}
        style={[tw("font-semibold text-center")

        ]}
      >
        <Text style={tw("text-base font-semibold text-center")}>
          SCHOOL OR WORK
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => navigation.navigate("UploadScreen")}
        style={[tw(
          "items-center justify-center rounded-full w-12 h-12 bg-gray-200"),
        { marginVertical: "-47%" },
        { marginHorizontal: "72%" },

        ]}
      >

        <AntDesign name="edit" size={20} color="#454545" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          tw("top-60 bg-gray-300 p-4 rounded-full"),
          { marginVertical: "71.2%" },
          { marginHorizontal: "5%" },
        ]}
        onPress={logout}
      >
        <Text style={tw("font-semibold text-center")}>
          More Settings
        </Text>
      </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileORIGINAL);
