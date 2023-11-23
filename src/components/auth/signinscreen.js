import firebase from 'firebase';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    };

    const handleSocialSignIn = (socialMedia) => {
        // Implement social media sign-in logic
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                mode="outlined"
            />
            <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                Sign In
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

            <Button icon="facebook" mode="contained" onPress={() => handleSocialSignIn('facebook')} style={styles.socialButton}>
                Login with Facebook
            </Button>
            <Button icon="google" mode="contained" onPress={() => handleSocialSignIn('google')} style={styles.socialButton}>
                Login with Google
            </Button>
            <Button icon="apple" mode="contained" onPress={() => handleSocialSignIn('apple')} style={styles.socialButton}>
                Login with Apple
            </Button>
            <Button icon="phone" mode="contained" onPress={() => handleSocialSignIn('phone')} style={styles.socialButton}>
                Login with Phone Number
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
    linkText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'blue',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
    },
    socialButton: {
        marginTop: 10,
    },
});

export default SignInScreen;
