// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import React from 'react'
// // import useAuth from './hooks/useAuth';
// import ChatScreen from './screens/ChatScreen';
// import HomeScreen2 from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import ModalScreen from './screens/ModalScreen';
// import MatchedScreen from './screens/MatchedScreen';
// import MessageScreen from './screens/MessageScreen';
// import MyProfile from './screens/MyProfile';
// import UploadScreen from './screens/UploadScreen';
// import BottomNavi from './screens/BottomNavi';
// import RegisterScreen1 from './screens/RegisterScreen-1';
// import RegisterScreen2 from './screens/RegisterScreen-2';
// import RegisterScreen3 from './screens/RegisterScreen-3';
// import RegisterScreen4 from './screens/RegisterScreen-4';
// import RegisterScreen5 from './screens/RegisterScreen-5';
// const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//     // const { user } = useAuth();
//     // console.log('user', user)
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false
//             }}
//         >
//             {user ? (
//                 <>
//                     <Stack.Group>
//                         <Stack.Screen name="Home" component={HomeScreen2} />
//                         <Stack.Screen name="Chat" component={ChatScreen} />
//                         <Stack.Screen name="Message" component={MessageScreen} />
//                         <Stack.Screen name="MyProfile" component={MyProfile} />
//                     </Stack.Group>
//                     <Stack.Group screenOptions={{ presentation: 'modal' }}>
//                         <Stack.Screen name='Modal' component={ModalScreen} />
//                         <Stack.Screen name="UploadScreen" component={UploadScreen} />
//                         <Stack.Screen name="BottomNavi" component={BottomNavi} />
//                     </Stack.Group>
//                     <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
//                         <Stack.Screen name="Match" component={MatchedScreen} />
//                     </Stack.Group>
//                 </>
//             ) : (
//                 <>
//                     <Stack.Screen name="LoginScreen" component={LoginScreen} />
//                     <Stack.Screen name='RegisterScreen1' component={RegisterScreen1} />
//                     <Stack.Screen name='RegisterScreen2' component={RegisterScreen2} />
//                     <Stack.Screen name='RegisterScreen3' component={RegisterScreen3} />
//                     <Stack.Screen name='RegisterScreen4' component={RegisterScreen4} />
//                     <Stack.Screen name='RegisterScreen5' component={RegisterScreen5} />
//                 </>
//             )
//             }
//         </Stack.Navigator>
//     )
// }

// export default StackNavigator
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
// import useAuth from './hooks/useAuth';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ModalScreen from './screens/ModalScreen';
import MatchedScreen from './screens/MatchedScreen';
import MessageScreen from './screens/MessageScreen';
import MyProfile from './screens/MyProfile';
import UploadScreen from './screens/UploadScreen';
import BottomNavi from './screens/BottomNavi';
import RegisterScreen1 from './screens/RegisterScreen-1';
import RegisterScreen2 from './screens/RegisterScreen-2';
import RegisterScreen3 from './screens/RegisterScreen-3';
import RegisterScreen4 from './screens/RegisterScreen-4';
import RegisterScreen5 from './screens/RegisterScreen-5';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name='RegisterScreen1' component={RegisterScreen1} />
            <Stack.Screen name='RegisterScreen2' component={RegisterScreen2} />
            <Stack.Screen name='RegisterScreen3' component={RegisterScreen3} />
            <Stack.Screen name='RegisterScreen4' component={RegisterScreen4} />
            <Stack.Screen name='RegisterScreen5' component={RegisterScreen5} />
            <Stack.Group>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Message" component={MessageScreen} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='Modal' component={ModalScreen} />
                <Stack.Screen name="UploadScreen" component={UploadScreen} />
                <Stack.Screen name="BottomNavi" component={BottomNavi} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                <Stack.Screen name="Match" component={MatchedScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator
