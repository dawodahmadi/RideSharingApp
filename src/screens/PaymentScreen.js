import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';

import {CardField, confirmPayment, StripeProvider} from '@stripe/stripe-react-native';

import Button from '../components/Button';
import {RFValue} from "react-native-responsive-fontsize";
import {Colors} from "../Utils/Assets/Colors";
import creatPaymentIntent from "../Utils/Apis/StripeApi";
import * as yup from "yup";
import {TextInput} from "react-native-paper";
import {Header} from "../components";
import {Formik} from "formik";

const PaymentScreen = ({navigation}) => {

    const [cardInfo, setCardInfo] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [outLineColor, setOutLineColor] = useState({
       name:'#007CCF',
        emailColor: '#007CCF',
        amount:'#007CCF'
    })
    const [signUpParams, setSignUpParams] = useState({
       name:'',
        email: '',
        amount:'',
    })

    const emailValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),
    });
    const nameValidationSchema = yup.object().shape({
        Name: yup
            .string()
            .test(
                'name-length',
                `Please enter a valid Name`,
                value => {
                    if (value && value.trim().length < 3) {
                        setOutLineColor(previous => ({
                            ...previous,
                            name: 'red'
                        }))
                        return false;
                    }
                    setOutLineColor(previous => ({
                        ...previous,
                        name: '#007CCF'
                    }))
                    return true;
                },
            )
            .required('First Name is required')
    });

    const amountValidationSchema = yup.object().shape({
        Amount: yup
            .string()
            .matches(/^[0-6]+$/, 'Please enter a valid number')
            .required('Amount is required')
    });
    const handleEmailChange = (text) => {
        emailValidationSchema
            .isValid({ email: text })
            .then((valid) => {
                setSignUpParams(previous => ({
                    ...previous,
                    email: text
                }))
                setOutLineColor(previous => ({
                    ...previous,
                    emailColor: valid ? '#007CCF':'red'
                }))
            })
            .catch(() => {
                setOutLineColor(previous => ({
                    ...previous,
                    emailColor: 'red'
                }))
            });
    }

    const handleAmountChange = (text) => {
        setSignUpParams(previous => ({
            ...previous,
            amount: text
        }))
        amountValidationSchema
            .validate({ Amount: text })
            .then(() => {
                setOutLineColor(previous => ({
                    ...previous,
                    amount: '#007CCF'
                }))
            })
            .catch(() => {
                setOutLineColor(previous => ({
                    ...previous,
                    amount: 'red'
                }))
            });
    }

    const fetchCardDetail = (cardDetail) => {
        console.log("my card details",cardDetail)
        if (cardDetail.complete) {
            setCardInfo(cardDetail)
        } else {
            setCardInfo(null)
        }
    }

    const onDone = async () => {
        setLoading(true)
        let apiData = {
            amount: 500,
            currency: "USD"
        }

        try {
             const res = await creatPaymentIntent(apiData)
            console.log("payment intent create succesfully...!!!", res)

            if (res?.data?.paymentIntent) {
                let confirmPaymentIntent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' })
                console.log("confirmPaymentIntent res++++", confirmPaymentIntent)
                alert("Payment succesfully...!!!")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Error rasied during payment intent", error)
        }


    }

    const goBackHandler=()=>{
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <Header
                isBackArrow={true}
                isShowText={true}
                headerText={'Ride Share'}
                styleText={{fontSize:RFValue(20),color:Colors?.primary,fontWeight:'bold'}}
                backGroundColor={Colors?.white}
                onBackPress={goBackHandler}
                color={Colors?.primary}
            />
            <StripeProvider
                publishableKey={'pk_test_51O1k8NBPOluvQ8YGkJ0ZsPbE1UcdKPLsxPZiZ2ukdxD64eIR0P6z78J6u67KKh744N3ZtNMAMT7sy9ZIMvQ7Jvu400AlL9JYN9'}
                merchantIdentifier="merchant.identifier" // required for Apple Pay
                urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            >
            <SafeAreaView style={{ flex: 1,alignItems:'center'}}>
                <View style={styles.inputSec}>
                    <Formik
                        validationSchema={nameValidationSchema}
                        initialValues={{Name: signUpParams?.name }}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <>
                                <TextInput
                                    label="Name*"
                                    mode="outlined"
                                    autoCapitalize="none"
                                    placeholder="First Name*"
                                    value={values.name}
                                    textColor="#000000"
                                    onChangeText={text => {
                                        handleChange('Name')(text)
                                        setSignUpParams(previous => ({
                                            ...previous,
                                            name: text
                                        }))
                                    }}
                                    dense
                                    theme={{
                                        colors: {
                                            // text: 'black',
                                            primary: outLineColor?.name,
                                        },
                                    }}
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                />
                                {errors.Name && (
                                    <Text
                                        style={{ fontSize: RFValue(15), color: 'red' }}>
                                        {errors.Name}
                                    </Text>
                                )}
                            </>
                        )}
                    </Formik>
                </View>
                <View style={styles.inputSec}>
                    <Formik
                        validationSchema={emailValidationSchema}
                        initialValues={{ email: signUpParams?.email }}
                        onSubmit={values => onPressName(values)}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <>
                                <TextInput
                                    label="Email*"
                                    mode="outlined"
                                    autoCapitalize="none"
                                    placeholder="Email*"
                                    textColor="#000000"
                                    value={values.email}
                                    onChangeText={text => {
                                        handleChange('email')(text)
                                        handleEmailChange(text)
                                    }}
                                    dense
                                    theme={{
                                        colors: {
                                            primary: outLineColor?.emailColor,
                                            text: 'black',
                                        },
                                    }}
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                />
                                {errors.email && (
                                    <Text
                                        style={{ fontSize: RFValue(15), color: 'red' }}>
                                        {errors.email}
                                    </Text>
                                )}
                            </>
                        )}
                    </Formik>
                </View>
                <View style={styles.inputSec}>
                    <Formik
                        validationSchema={amountValidationSchema}
                        initialValues={{ Amount: signUpParams?.amount }}
                        onSubmit={values => onPressName(values)}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <>
                                <TextInput
                                    label="Amount*"
                                    mode="outlined"
                                    autoCapitalize="none"
                                    placeholder="Amount*"
                                    textColor="#000000"
                                    value={values.amount}
                                    maxLength={14}
                                    keyboardType={'phone-pad'}
                                    onChangeText={text => {
                                        handleChange('Amount')(text)
                                        handleAmountChange(text)
                                    }}
                                    dense
                                    theme={{
                                        colors: {
                                            primary: outLineColor?.amount,
                                            // text: 'black',
                                        },
                                    }}
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                />
                                {errors.Amount && (
                                    <Text
                                        style={{ fontSize: RFValue(15), color: 'red' }}>
                                        {errors.Amount}
                                    </Text>
                                )}
                            </>
                        )}
                    </Formik>
                </View>
                <View style={styles.inputSec}>
                    <CardField
                        postalCodeEnabled={false}
                        placeholders={{
                            number: '4242 4242 4242 4242',
                            backgroundColor: '#f6f6f6'
                        }}

                        cardStyle={{
                            backgroundColor: Colors?.primary,
                            textColor: Colors?.white,
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                            placeholderText: 'red',
                        }}
                        onCardChange={(cardDetails) => {
                            fetchCardDetail(cardDetails)
                        }}
                        onFocus={(focusedField) => {
                            console.log('focusField', focusedField);
                        }}

                    />

                </View>
                <View style={{marginTop:'20%',width:'80%',alignItems:'center'}}>
                    <Button
                        style={styles.buttonStyle}
                        styleText={styles.buttonText}
                        buttonText={'Done'}
                        buttonIconValue={true}
                        buttonDisable={!cardInfo}
                        onPressHandler={onDone}
                        isLoading={isLoading}
                    />
                </View>
            </SafeAreaView>
            </StripeProvider>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors?.white,
    },
    buttonText: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: Colors?.white,
    },
    buttonStyle: {
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: Colors?.darkPrimary,
        borderRadius: 10,
        marginVertical: '3%',
        alignItems: 'center',
    },
    inputSec: {
        height: 50,
        width:'80%',
        marginTop: '5%',
    },
});

export default PaymentScreen;
