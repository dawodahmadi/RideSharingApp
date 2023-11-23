
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View , Text, StyleSheet, Image } from 'react-native'; // Added Image import
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import MapScreen from './src/screens/MapScreen';
import LoginScreen from "./src/screens/LoginScreen";
import { Provider as PaperProvider } from 'react-native-paper';
import StackNavigator from "./src/Navigation/StackNavigator";
import Toast from "react-native-toast-message";



export default function App() {
  console.log(store, 'store');
  return (
    <Provider store={store}>
      <PaperProvider>
      <StackNavigator />
          <Toast />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});






