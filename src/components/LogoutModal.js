import React,{useState,useRef} from 'react';
import { View, StyleSheet, TouchableOpacity, Text,FlatList,TextInput} from 'react-native'
import Button from './Button'
import {Colors} from "../Utils/Assets/Colors";
import {RFValue} from "react-native-responsive-fontsize";


const LogoutModal = ({
                              Modal,
                              modalVisible,
                              setModalVisible,
                         onCancelPress,
                         onLogoutPress,
                          }) => {
    debugger;
    return (
        <View>
            {modalVisible ? (
                <Modal
                    // animationIn="slide"
                    transparent={true}
                    visible={modalVisible}
                    isVisible={true}
                    onBackdropPress={() => setModalVisible(false)}>
                    <View
                        style={
                            styles.modalViewStyle
                        }>
                       <View style={{justifyContent:'center',alignItems:'center',marginBottom:'10%'}}>
                           <Text style={{color:Colors?.black,fontSize:RFValue(20)}}>Are you sure to want logout ?</Text>
                       </View>
                        <View style={styles.buttonStyle}>
                            <Button style={styles.buttonName} buttonText={'Cancel'} styleText={styles.cancelButtonText} isLoading={false} onPressHandler={onCancelPress} />
                            <Button style={[styles.buttonName,{marginRight:'10%'}]} buttonText={'Log out'} styleText={styles.cancelButtonText} isLoading={false} onPressHandler={onLogoutPress} />
                        </View>
                    </View>
                </Modal>
                ):null}
        </View>
    );
};

const styles = StyleSheet.create({
    modalViewStyle: {
        height:200,
        backgroundColor:'#fff',
        justifyContent:'center'
    },
    buttonStyle: {
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent:'space-between',
        marginTop: '2%',
        alignItems: 'center',
        paddingLeft: '10%',
        height: 60,
        marginBottom: '5%',
    },
    deleteButtonText: {
        fontWeight: '500',
        fontSize: 15,
    },
    cancelButtonText: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 20,
    },
    buttonName: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '35%',
        height: 50,
        backgroundColor:Colors?.darkPrimary,
    },
    buttonTextName: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
    },
});
export default LogoutModal;
