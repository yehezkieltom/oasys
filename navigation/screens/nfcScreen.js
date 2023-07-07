import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from "react";
import NfcManager, {NfcTech}from 'react-native-nfc-manager';
// import {useState, useEffect} from "react";
// import {NativeModules} from 'react-native';

NfcManager.start();
//
const readTag = async () => {
    let mifarePages = [];

   try {
        let reqMifare = await NfcManager.requestTechnology(NfcTech.MifareUltralight);

        const readLength = 60;
        const mifarePagesRead = await Promise.all(
            [...Array(readLength).keys()].map(async (_, i) => {
                const pages = await NfcManager.mifareUltralightHandlerAndroid
                    .mifareUltralightReadPages(i * 4);
                mifarePages.push(pages);
            }),
        );
   } catch (ex) {
       console.warn("Oops!", ex);
   } finally {
       await NfcManager.cancelTechnologyRequest();
   }

   console.info(mifarePages);
}

// const { HostCardEmulationModule } = NativeModules;

function nfcScreen({navigation}) {
//    readTag();
//     HostCardEmulationModule.enableHCE();

    return (
        <View style={styles.wholeScreen}>
            <Text style={styles.title}>
                Hold near reader
            </Text>
            <Icon style={styles.iconStyle}
                name='contactless'
                color='#fff'
                size={150}
                marginTop={12}
            />
        </View>
    )
}

export default nfcScreen;
const styles= StyleSheet.create ( {

    iconStyle:{
        borderRadius:10,
    },





    wholeScreen: {
        flex: 1,
        backgroundColor: '#19A7CE',
        justifyContent: 'center',
        alignItems:'center',
    },

    logoScreen: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop:45,
        paddingBottom: 15,
    },

    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 600,
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8
    },
});