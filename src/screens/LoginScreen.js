import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../AuthContext';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyDzB5zZnBJgYz2COW1rGT_TsBPVuYBxehs',
  authDomain: 'capstoneproject-827ef.firebaseapp.com',
  databaseURL: 'https://capstoneproject-827ef-default-rtdb.firebaseio.com',
  projectId: 'capstoneproject-827ef',
  storageBucket: 'capstoneproject-827ef.appspot.com',
  messagingSenderId: '328238107734',
  appId: '1:328238107734:web:fc5673ab1deb01d604bff7',
  measurementId: 'G-3PNJ9MH38L',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Perform login logic using Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Get the currently signed-in user
      const currentUser = auth.currentUser;

      // Update the authentication state using the signIn method from the AuthContext
      signIn(currentUser);

      console.log('Logged in successfully!');
      // You can navigate to another screen or perform other actions upon successful login.
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle login error (show an alert, display an error message, etc.).
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    marginTop: 10,
    color: 'red',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
