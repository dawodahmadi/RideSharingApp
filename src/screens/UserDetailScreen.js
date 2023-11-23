import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    KeyboardAvoidingView, Platform,
    Keyboard,
} from 'react-native'
import * as yup from 'yup';
import { Formik } from 'formik';


import { TextInput } from 'react-native-paper';

import Toast from 'react-native-toast-message'
import { RFValue } from 'react-native-responsive-fontsize'
import {Colors} from "../Utils/Assets/Colors";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UserDetailScreen = ({ navigation }) => {
    const [outLineColor, setOutLineColor] = useState({
        firstNameColor: '#007CCF',
        lastNameColor: '#007CCF',
        phoneNumberColor: '#007CCF',
    })
    const [signUpParams, setSignUpParams] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    })

    const [signUpParamsValidate, setSignUpParamsValidate] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
    })


    const nameValidationSchema = yup.object().shape({
        firstName: yup
            .string()
            .test(
                'name-length',
                `Please enter a valid Name`,
                value => {
                    if (value && value.trim().length < 3) {
                        setOutLineColor(previous => ({
                            ...previous,
                            firstNameColor: 'red'
                        }))
                        setSignUpParamsValidate(previous => ({
                            ...previous,
                            firstName: false,
                        }))
                        return false;
                    }
                    setOutLineColor(previous => ({
                        ...previous,
                        firstNameColor: '#007CCF'
                    }))
                    setSignUpParamsValidate(previous => ({
                        ...previous,
                        firstName: true,
                    }))
                    return true;
                },
            )
            .required('First Name is required')
    });
    const lastNameValidationSchema = yup.object().shape({
        lastName: yup
            .string()
            .test(
                'name-length',
                `Please enter a valid Name`,
                value => {
                    if (value && value.trim().length < 3) {
                        setOutLineColor(previous => ({
                            ...previous,
                            lastNameColor: 'red'
                        }))
                        setSignUpParamsValidate(previous => ({
                            ...previous,
                            lastName: false,
                        }))
                        return false;
                    }
                    setOutLineColor(previous => ({
                        ...previous,
                        lastNameColor: '#007CCF'
                    }))
                    setSignUpParamsValidate(previous => ({
                        ...previous,
                        lastName: true,
                    }))
                    return true;
                },
            )
            .required('First Name is required')
    });
    const phoneNumberValidationSchema = yup.object().shape({
        phoneNumber: yup
            .string()
            .matches(/^[0-9]+$/, 'Please enter a valid numeric phone number')
            .min(10, 'Phone Number must be at least 10 characters')
            .required('Phone Number is required')
    });
    const handlePhoneNumberChange = (text) => {
        setSignUpParams(previous => ({
            ...previous,
            phoneNumber: text
        }))
        phoneNumberValidationSchema
            .validate({ phoneNumber: text })
            .then(() => {
                setOutLineColor(previous => ({
                    ...previous,
                    phoneNumberColor: '#007CCF'
                }))
                setSignUpParamsValidate(previous => ({
                    ...previous,
                    phoneNumber: true,
                }))
            })
            .catch(() => {
                setOutLineColor(previous => ({
                    ...previous,
                    phoneNumberColor: 'red'
                }))
                setSignUpParamsValidate(previous => ({
                    ...previous,
                    phoneNumber: false,
                }))
            });
    }
    const signUpUser = async () => {
        Keyboard.dismiss();
        if (signUpParamsValidate?.firstName && signUpParamsValidate?.lastName && signUpParamsValidate?.phoneNumber ) {
                const body = {
                    firstName: signUpParams?.firstName,
                    lastName: signUpParams?.lastName,
                    phone: signUpParams?.phoneNumber,
                }
                try {
                    // const data = await signUpApi(body, navigation)
                    const jsonValue = JSON.stringify(body);
                    await AsyncStorage.setItem('userDetail', jsonValue);
                    navigation.navigate('HomeScreen')
                }
                catch (error) {

                }
        } else if (!signUpParamsValidate?.firstName) {
            Toast.show({
                type: 'error',
                text1: 'First Name error',
                text2: 'Please enter your First Name.',
                position: 'top',
                visibilityTime: 2000,
            })
        }
        else if (!signUpParamsValidate?.lastName) {
            Toast.show({
                type: 'error',
                text1: 'Last Name error',
                text2: 'Please enter your Last Name.',
                position: 'top',
                visibilityTime: 2000,
            })
        }
        else if (!signUpParamsValidate?.phoneNumber) {
            Toast.show({
                type: 'error',
                text1: 'Phone Number error',
                text2: 'Please enter your Phone Number.',
                position: 'top',
                visibilityTime: 2000,
            })
        }

    };
const goBackHandler=() => {
    navigation.goBack()
}
    return (
        <View style={styles.container}>
            <Header
                isBackArrow={true}
                isShowText={true}
                headerText={'Ride Share'}
                styleText={{fontSize:RFValue(20),color:Colors?.white,fontWeight:'bold'}}
                backGroundColor={Colors?.primary}
                onBackPress={goBackHandler}
            />
            <View>
                <Text style={styles.title}>SIGN IN TO RIDESHARE</Text>
                <KeyboardAvoidingView enabled style={styles.keyboardAvoidingView}>
                    <ScrollView style={{ height: '60%' }} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputSec}>
                            <Formik
                                validationSchema={nameValidationSchema}
                                initialValues={{ firstName: signUpParams?.firstName }}
                            >
                                {({ handleChange, handleSubmit, values, errors }) => (
                                    <>
                                        <TextInput
                                            label="First Name*"
                                            mode="outlined"
                                            autoCapitalize="none"
                                            placeholder="First Name*"
                                            value={values.firstName}
                                            textColor="#000000"
                                            onChangeText={text => {
                                                handleChange('firstName')(text)
                                                setSignUpParams(previous => ({
                                                    ...previous,
                                                    firstName: text
                                                }))
                                            }}
                                            dense
                                            theme={{
                                                colors: {
                                                    // text: 'black',
                                                    primary: outLineColor?.firstNameColor,
                                                },
                                            }}
                                            style={{
                                                backgroundColor: 'white'
                                            }}
                                        />
                                        {errors.firstName && (
                                            <Text
                                                style={{ fontSize: RFValue(10), color: 'red' }}>
                                                {errors.firstName}
                                            </Text>
                                        )}
                                    </>
                                )}
                            </Formik>
                        </View>
                        <View style={styles.inputSec}>
                            <Formik
                                validationSchema={lastNameValidationSchema}
                                initialValues={{ lastName: signUpParams?.lastName }}
                                // onSubmit={values => onPressName(values)}
                            >
                                {({ handleChange, handleSubmit, values, errors }) => (
                                    <>
                                        <TextInput
                                            label="Last Name*"
                                            mode="outlined"
                                            autoCapitalize="none"
                                            placeholder="Last Name*"
                                            textColor="#000000"
                                            value={values.lastName}
                                            onChangeText={text => {
                                                handleChange('lastName')(text)
                                                setSignUpParams(previous => ({
                                                    ...previous,
                                                    lastName: text
                                                }))
                                            }}
                                            dense
                                            theme={{
                                                colors: {
                                                    primary: outLineColor?.lastNameColor,
                                                    text: 'black',
                                                },
                                            }}
                                            style={{
                                                backgroundColor: 'white'
                                            }}
                                        />
                                        {errors.lastName && (
                                            <Text
                                                style={{ fontSize: RFValue(10), color: 'red' }}>
                                                {errors.lastName}
                                            </Text>
                                        )}
                                    </>
                                )}
                            </Formik>
                        </View>
                        <View style={styles.inputSec}>
                            <Formik
                                validationSchema={phoneNumberValidationSchema}
                                initialValues={{ phoneNumber: signUpParams?.phoneNumber }}
                                onSubmit={values => onPressName(values)}
                            >
                                {({ handleChange, handleSubmit, values, errors }) => (
                                    <>
                                        <TextInput
                                            label="Phone Number*"
                                            mode="outlined"
                                            autoCapitalize="none"
                                            placeholder="Phone Number*"
                                            textColor="#000000"
                                            value={values.phoneNumber}
                                            maxLength={14}
                                            keyboardType={'phone-pad'}
                                            onChangeText={text => {
                                                handleChange('phoneNumber')(text)
                                                handlePhoneNumberChange(text)
                                            }}
                                            dense
                                            theme={{
                                                colors: {
                                                    primary: outLineColor?.phoneNumberColor,
                                                    // text: 'black',
                                                },
                                            }}
                                            style={{
                                                backgroundColor: 'white'
                                            }}
                                        />
                                        {errors.phoneNumber && (
                                            <Text
                                                style={{ fontSize: RFValue(10), color: 'red' }}>
                                                {errors.phoneNumber}
                                            </Text>
                                        )}
                                    </>
                                )}
                            </Formik>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.button}
                            onPress={signUpUser}
                        >
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={styles.termsPolicy}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PrivatePolicy')}
                    >
                        <Text style={styles.underLineText}>PRIVACY POLICY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TermsConditions')}
                    >
                        <Text style={styles.underLineText}>TERMS AND CONDITIONS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.primary,
    },
    title: {
        marginTop: 64,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    },

    keyboardAvoidingView: {
        marginTop: '10%',
        marginBottom: '5%',
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingHorizontal: 20,
    },
    inputSec: {
        height: 40,
        marginTop: '10%',
        // flexDirection: 'row',
        // backgroundColor: '#0000000D',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 13,
    },
    button: {
        height: 40,
        minWidth: 200,
        marginTop: '20%',
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: Colors?.darkPrimary,
    },

    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingVertical: 10,
    },

    termsPolicy: {
        marginTop: 20,
        marginHorizontal: 22,
        display: 'flex',
        flexWrap: 'wrap',
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    underLineText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },

});

export default UserDetailScreen;
