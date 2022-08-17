import { useNavigation } from "@react-navigation/core";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ChatList from "../components/ChatList";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import tw from "tailwind-rn";
import BottomNavi from "./BottomNavi";

//using Components in RN

const MyProfile = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <View style={{ marginTop: 20 }}>
      {/* <Text>I am the chat screen!</Text> */}
      <Header title="My Profile" />

      <Image
            source={{ uri: user.photoURL }}
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
        <BottomNavi                   style={[
                    tw("bg-gray-300 p-4 rounded-full"),
                    { marginVertical: "155%" },
                    { marginHorizontal: "5%" },
                  ]}/>
        </View>
  );
};



export default MyProfile;
