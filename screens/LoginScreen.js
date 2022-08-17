import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
  //since authprovider wraps the stack navigator in the app js, it can be accessed everywhere in the stack!
  const { signInWithGoogle, loading } = useAuth();
  // const { user } = useAuth();
  // console.log(user);

  const navigation = useNavigation(); //redirect user

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  return (
    <View style={tw("flex-1")}>

      <ImageBackground
        source={{ uri: "https://i.imgur.com/aUGNynl.png" }}
        resizeMode="cover"
        style={tw("flex-1")}
      >

      <ImageBackground
        source={{ uri: "https://i.imgur.com/1rel8tX.png" }}
        resizeMode="cover"
        style={tw("h-56 w-56 top-60 left-16 flex-1")}
      >
      </ImageBackground>


        {/* TRY OTHER TOUCHABLES AS WELL */}
        <TouchableOpacity
          style={[
            tw("ml-4 absolute bottom-36 p-3 w-96 rounded-2xl bg-yellow-400 rounded-full"),
            { marginHorizontal: "25%" },
          ]}
          onPress={signInWithGoogle}
        >
          
          <Text style={tw("font-bold text-lg text-black text-center")}>
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw("ml-4 absolute bottom-20 p-3 w-96 rounded-2xl bg-white rounded-full"),
            { marginHorizontal: "25%" },
          ]}
          onPress={signInWithGoogle}
        >

          <Text style={tw("font-bold text-lg text-black text-center")}>
            Sign In via Google
          </Text>
        </TouchableOpacity>


        <Text style={tw("bottom-3 font-semibold text-xs text-gray-300 text-center")}>
            Developed by Evolver Inc.
          </Text>
      </ImageBackground>
      {/* //using image background */}
      {/* <Text>{loading ? "Loading.." : "Login to the App!"}</Text>
      <Button title="Login" onPress={signInWithGoogle} /> */}
    </View>
  );
};

export default LoginScreen;
