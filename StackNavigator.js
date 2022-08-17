import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import useAuth from './hooks/useAuth';
import ChatScreen from './screens/ChatScreen';
import HomeScreen2 from './screens/HomeScreen2';
import LoginScreen from './screens/LoginScreen';
import ModalScreen from './screens/ModalScreen';
import MatchedScreen from './screens/MatchedScreen';
import MessageScreen from './screens/MessageScreen';
import MyProfile from './screens/MyProfile';
import UploadScreen from './screens/UploadScreen';
import BottomNavi from './screens/BottomNavi';
import register1 from './screens/register1';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const {user}=useAuth();
    return (
       <Stack.Navigator
       screenOptions={{
           headerShown:false
       }}
       >
           {user? (
            <>
            <Stack.Group>
                <Stack.Screen name="Home" component={HomeScreen2}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
                <Stack.Screen name="Message" component={MessageScreen} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation:'modal'}}>
                <Stack.Screen name='Modal' component={ModalScreen}/>
                <Stack.Screen name='register1' component={register1}/>
                <Stack.Screen name="UploadScreen" component={UploadScreen} />
                <Stack.Screen name="BottomNavi" component={BottomNavi} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={MatchedScreen} />
          </Stack.Group>
           </>
            ):(
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        )
        }
        </Stack.Navigator>
    )
}

export default StackNavigator
