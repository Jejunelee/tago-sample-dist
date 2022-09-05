import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import tw from "tailwind-rn";

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
// import useAuth from "../hooks/useAuth";
// import { AuthProvider } from "../hooks/useAuth";
import { connect } from 'react-redux'
import { setStatusBarBackgroundColor } from "expo-status-bar";

const BottomNaviORIG = ({ user }) => {
  const navigation = useNavigation();
  // const { user, logout } = useAuth();
  // console.log(user);
  const swipeRef = useRef(null);

  //for mapping on the cards, replacing the DUMMY_DATA with the data from the database
  const [profiles, setProfiles] = useState([]);

  //when components paints on screen, refactor/use useffect can also be used
  return (
    // <AuthProvider>
    // <View style={[tw("left-1 h-14 flex flex-row justify-evenly"), { position: 'absolute', bottom: 0, width: '90%', alignSelf: 'center' }]}>
    <View style={{position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'space-between', width:'90%',alignSelf:'center'}}>
      <TouchableOpacity style={tw("flex flex-row justify-evenly")}
        onPress={() => navigation.navigate("Home")}>

        {/* TODO onPress={logout} */}
        <Image
          source={{
            uri: "https://i.imgur.com/gdFfzfy.png",
          }}
          style={tw("bottom-3 h-10 w-10")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Image
          source={{
            uri: "https://i.imgur.com/6xNVRGS.png",
          }}
          style={tw("bottom-3 h-10 w-10")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
        <Image
          source={{
            uri: "https://i.imgur.com/S6kwtW3.png",
          }}
          style={tw("bottom-3 h-10 w-10")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={tw("flex flex-row justify-evenly")}
        onPress={() => navigation.navigate("MyProfile")}
      >
        <Image
          source={{ uri: user?.image[0] }}
          style={tw("bottom-3 h-10 w-10 rounded-full")}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(BottomNaviORIG)