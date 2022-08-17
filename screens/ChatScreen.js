import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Button } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
import BottomNavi from "./BottomNavi";
import tw from "tailwind-rn";

//using Components in RN

const ChatScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 20 } }>
      {/* <Text>I am the chat screen!</Text> */}
      <Header title="My Chat" />
      <ChatList />
      <Button
        title="Find more matches."
        onPress={() => navigation.goBack()}
      />
              <View style={tw("flex top-20")}>
              <View style={tw("flex top-20")}>
        <View style={tw("flex top-96")}>
              </View>
        </View>
        </View>
        </View>
  );
};

export default ChatScreen;
