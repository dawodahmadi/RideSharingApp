import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RFValue} from "react-native-responsive-fontsize";
import {Colors} from "../Utils/Assets/Colors";
import Header from "../components/Header";
import Modal from "react-native-modal";
import LogoutModal from "../components/LogoutModal";


const HomeScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('loginData');
               console.log('JSON.parse(jsonValue)',JSON.parse(jsonValue))
                const userDetailJson = await AsyncStorage.getItem('userDetail');
                console.log('userDetail',JSON.parse(userDetailJson))
            } catch (e) {
                // error reading value
            }
        };
        getData()
    }, []);
    const onLogout=()=>{
        setModalVisible(true)
    }
    const onCancelPress=()=>{
        setModalVisible(false)
    }
    const onLogoutPress=async ()=>{
        try {
            await AsyncStorage.setItem('loginData', '');
            await AsyncStorage.setItem('userDetail', '');
            navigation.navigate('LoginScreen')
        } catch (e) {
            // saving error
        }
    }
  return (
    <View>
        <Header
            isBackArrow={false}
            isShowRight={true}
            isShowText={true}
            headerText={'Ride Share'}
            styleText={{fontSize:RFValue(20),color:Colors?.black,fontWeight:'bold'}}
            onLogout={onLogout}
        />
      <View style={tw`p-5`}>
        <Image
            style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
            }}

            source={{
                uri: 'https://links.papareact.com/gzs',
             }} />
             <NavOptions />
      </View>
        {
            modalVisible ?
                <LogoutModal Modal={Modal} modalVisible={modalVisible} setModalVisible={setModalVisible} onCancelPress={onCancelPress} onLogoutPress={onLogoutPress} />
                :null
        }
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: 'blue',
    },
});
