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
  import useAuth from "../hooks/useAuth";
  import { AuthProvider } from "../hooks/useAuth";

  const BottomNavi = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    // console.log(user);
    const swipeRef = useRef(null);
  
    //for mapping on the cards, replacing the DUMMY_DATA with the data from the database
    const [profiles, setProfiles] = useState([]);
  
    //when components paints on screen, refactor/use useffect can also be used
    return (
        <AuthProvider>
      <View style={tw("top-6 left-1 h-14 flex flex-row justify-evenly")}>
        <TouchableOpacity style={tw("flex flex-row justify-evenly")} 
        onPress={() => navigation.navigate("Home")}>
          {/* TODO onPress={logout} */}
          <Image
            source={{
              uri: "https://i.imgur.com/padKjy8.png",
            }}
            style={tw("top-1 h-10 w-10")}
          />
        <Text style={tw("top-10 right-9 text-xss")}>Match</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
          <Image
            source={{
              uri: "https://i.imgur.com/OXzG0Vr.png",
            }}
            style={tw("h-10 w-10 top-1 right-1")}
          />
        <Text style={tw("right-4 text-xss")}>FreedomWall</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Image
            source={{
              uri: "https://i.imgur.com/3qIAqwW.png",
            }}
            style={tw(" top-1 h-10 w-10 left-2")}
          />
          <Text style={tw("left-1 text-xss")}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw("flex flex-row justify-evenly")}
          onPress={() => navigation.navigate("MyProfile")}
        >
            <Image
            source={{ uri: user.photoURL}}
            style={tw(" h-8 w-8 left-5-5 top-2 rounded-full")}
          />
        <Text style={tw("top-10 right-3 text-xss")}>Profile</Text>
        </TouchableOpacity>
      </View>
      </AuthProvider>
    );
        };

  export default BottomNavi;