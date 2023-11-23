
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View , Text, StyleSheet, Image } from 'react-native'; // Added Image import
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import MapScreen from './src/screens/MapScreen';


const Stack = createStackNavigator();

export default function App() {
  console.log(store, 'store');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider> 
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}} />
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false}} />

          </Stack.Navigator>

        
      </SafeAreaProvider>
      </NavigationContainer>
      
      
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






