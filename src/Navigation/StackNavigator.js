import React from 'react';
import {View} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";

import {SafeAreaProvider} from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import {createStackNavigator} from "@react-navigation/stack";
import GmailSignInScreen from "../screens/GmailSignInScreen";
import UserDetailScreen from "../screens/UserDetailScreen";

const Stack = createStackNavigator();

const StackNavigator=()=>{
    return(
        <NavigationContainer>
            <SafeAreaProvider>
                <Stack.Navigator>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false}} />
                    <Stack.Screen name="GmailSignInScreen" component={GmailSignInScreen} options={{ headerShown: false}} />
                    <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ headerShown: false}} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}} />
                    <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false}} />
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    )
}

export default StackNavigator
