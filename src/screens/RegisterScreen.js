import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../AuthContext';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';



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
const db = getFirestore(app);

const RegisterScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      // Perform registration logic using Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const userDocRef = await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        mobileNumber,
      });

      // Get the currently signed-in user
      const currentUser = auth.currentUser;

      // Update the authentication state using the signIn method from the AuthContext
      signIn(currentUser);

      console.log('User registered successfully! User ID:', user.uid);
      console.log('Firestore document added with ID:', userDocRef.id);

      // Navigate to the Login screen after successful registration
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use. Please use a different email.');
      } else {
        setError(`Error registering: ${error.message}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login here</Text>
      </TouchableOpacity>
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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  loginText: {
    marginTop: 20,
    color: 'green',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
