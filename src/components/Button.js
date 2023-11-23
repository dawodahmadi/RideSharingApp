import React from 'react';
import {ActivityIndicator, TouchableOpacity, View,Text,StyleSheet} from 'react-native';
import {Colors} from "../Utils/Assets/Colors";

const Button = ({
                    style,
                    styleText,
                    buttonText,
                    onPressHandler,
                    buttonDisable,
                    isLoading,
                    isLoadingColor,
                    buttonIcon,
                    buttonIconValue,
                }) => {
    return (
        <TouchableOpacity
            style={style}
            onPress={onPressHandler}
            disabled={buttonDisable}>
            {buttonIconValue ? buttonIcon : null}
            {isLoading ? (
                <View
                    style={{
                        height: 30,
                        width: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator
                        size={'small'}
                        color={isLoadingColor ? isLoadingColor : Colors?.white}
                    />
                </View>
            ) : (
                <Text style={styleText}> {buttonText} </Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
