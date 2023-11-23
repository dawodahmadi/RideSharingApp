import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

import {Button} from '../components';

import {
  GoogleIcon,
  EMailIcon,
} from '../Utils/Assets/Icons';
import {Colors} from '../Utils/Assets/Colors';

import {RFValue} from 'react-native-responsive-fontsize';
import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import Header from "../components/Header";

const {height} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation=useNavigation()
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '705166932812-da5prk7mpsgknov20uafrget1emotit1.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('loginData');
        const data=JSON.parse(jsonValue)
        if(data?.email){
          navigation.navigate('HomeScreen')
        }
      } catch (e) {
        // error reading value
      }
    };
    getData()
  }, []);
  const onPressGoogleSignIn=async ()=>{
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo',userInfo)
      const jsonValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem('loginData', jsonValue);
      navigation.navigate('UserDetailScreen')
      // setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  const onPressEmail=()=>{
    navigation.navigate('GmailSignInScreen')
  }
  return (
      <View style={styles.signInContainer}>
        <Header
            isBackArrow={false}
            isShowText={true}
            headerText={'Ride Share'}
            styleText={{fontSize:RFValue(20),color:Colors?.white,fontWeight:'bold'}}
            backGroundColor={Colors?.primary}
        />
        <View style={{alignItems:'center',marginTop:'10%'}}>
          <Text style={styles.createAccount}>{'pageSignIn.title'}</Text>
          <Text  style={styles.signIn}>{'pageSignIn.title2'}</Text>
        </View>
       <View style={styles.signInInnerContainer}>
         <Button
             style={styles.buttonEmail}
             styleText={styles.buttonTextWhite}
             buttonText={'Sign in with Email'}
             buttonIconValue={true}
             buttonIcon={
               <EMailIcon width={40} height={40} color={Colors?.white} />
             }
             onPressHandler={onPressEmail}
         />
         <Button
             style={styles.buttonGoogle}
             styleText={styles.buttonText}
             buttonText={'Sign In With Google'}
             buttonIconValue={true}
             buttonIcon={<GoogleIcon width={40} height={40} />}
             onPressHandler={onPressGoogleSignIn}
         />
       </View>
      </View>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    backgroundColor: Colors?.primary,
  },
  signInInnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: Colors?.primary,
    paddingHorizontal: '10%',
    width: '100%',
    height: '70%',
  },
  createAccount: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: Colors?.white,
  },
  signIn: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: Colors?.white,
    marginBottom: '5%',
  },
  regularText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors?.white,
  },
  regularTextBottom: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors?.white,
    marginBottom: '8%',
  },
  button: {
    justifyContent: 'center',
    width: '100%',
    height: '8%',
    backgroundColor: Colors?.lightPrimary,
    borderRadius: 10,
  },
  buttonGoogle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '10%',
    backgroundColor: Colors?.white,
    borderRadius: 10,
    marginVertical: '3%',
    alignItems: 'center',
    paddingLeft: '10%',
  },
  buttonEmail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '10%',
    backgroundColor: Colors?.lightPrimary,
    borderRadius: 10,
    marginVertical: '3%',
    alignItems: 'center',
    paddingLeft: '10%',
  },
  buttonText: {
    fontSize: RFValue(18),
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    paddingLeft: '10%',
    marginRight: 50,
  },
  buttonTextWhite: {
    fontSize: RFValue(18),
    fontWeight: '500',
    color: Colors?.white,
    paddingLeft: '10%',
    marginRight: 50,
  },
  buttonTextPhone: {
    fontSize: RFValue(18),
    fontWeight: '500',
    color: Colors?.white,
    paddingRight: '3%',
  },
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%',
  },
});

export default LoginScreen;
