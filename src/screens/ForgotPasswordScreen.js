import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

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

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      // Send a password reset email
      await sendPasswordResetEmail(auth, email);

      setMessage(`Password reset email sent to ${email}. Please check your email.`);
    } catch (error) {
      setMessage(`Error sending password reset email: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  message: {
    marginTop: 20,
    color: 'green',
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
