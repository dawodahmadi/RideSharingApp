import React from 'react';
import {TouchableOpacity, View, StyleSheet, Platform, Text} from 'react-native';

import {BackIcon, LogoutIcon} from '../Utils/Assets/Icons';

import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../Utils/Assets/Colors';

const Header = ({
                          backGroundColor,
                          isBackArrow,
                          onBackPress,
                          isShowText,
                          styleText,
                          headerText,
                    isShowRight,
                    onLogout,
                    color,
                      }) => {
    debugger;
    return (
        <View
            style={[
                {
                    backgroundColor: backGroundColor ? backGroundColor : '',
                    paddingHorizontal: '5%',
                },
            ]}>
            <View style={styles.headerTopView}>
                {isBackArrow ? (
                    <TouchableOpacity
                        style={styles.leftIconView}
                        onPress={() => onBackPress()}>
                        <BackIcon color={color} />
                    </TouchableOpacity>
                ) : (
                    <View style={{marginLeft: '8%'}} />
                )}
                {isShowText ? (
                    <TouchableOpacity onPress={()=>console.log('sghjfsa')}>
                        <Text style={styleText}>{headerText}</Text>
                    </TouchableOpacity>
                ) :  (
                    <View />
                )}

                {isShowRight ? (
                    <TouchableOpacity style={()=>onLogout()}>
                        <View style={styles.rightIconView}>
                            <LogoutIcon color={'#000'} />
                        </View>
                    </TouchableOpacity>
                ) :  (
                    <View style={{width: 33}} />
                )}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    headerTopView: {
        paddingTop: 5,
        width: '100%',
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? '12%' : '3%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftIconView: {
        paddingTop: 15,
    },
    textStyle: {
        color: Colors?.white,
        fontWeight: '500',
        fontSize: RFValue(24),
    },
    rightIcon: {
        paddingRight: 5,
    },
    rightIconView: {
        height: 30,
        width: 30,
    },
    shadowStyle: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 5,
        shadowRadius: 1,
        elevation: 5,
    },
    userAvatar: {
        height: 40,
        width: 40,
        borderRadius: 40,
    },
    userAvatarAndUserNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default Header;
