// import at the very top of everything.
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
// import { AuthProvider } from "./hooks/useAuth";
import { LogBox, Text, View, TouchableOpacity, Image } from "react-native";
import tw from 'tailwind-rn';
import { Provider } from 'react-redux'
import store from './redux/store'

LogBox.ignoreLogs(['Setting a timer', 'Unsupported Tailwind', 'AsyncStorage has been']);
LogBox.ignoreAllLogs()

import StackNavigator from "./StackNavigator";
import BottomNavi from "./screens/BottomNavi";


//3:05:00 part important with teeny tiny bits
//4:40:00 destructuring firebase data, old data copied to new object to update
//5:23:00 firebase query and using orderby for the chat messages
//5:27:40 FIRESTORE USES WEBSOCKET TO CONNECT AND STUFF
//5:31:00 use LIMIT

export default function App() {

  return (

    <NavigationContainer>
      {/* aka HOC - Higher Order Component */}
      {/* <AuthProvider>     */}
      <Provider store={store}>
        {/* where we WRAP some CHILD Component, and we pass down the AUTH info to the children */}
        <StackNavigator />
        {/* </AuthProvider>     */}
      </Provider>
    </NavigationContainer>

    // <View style={tw("flex-1 justify-center items-center")}>
    //   <Text>Hello Abhiram!</Text>
    //   <Button title="Click Me" onPress={() => alert("Hello Abhiram")} />
    //   <StatusBar style="auto" />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
