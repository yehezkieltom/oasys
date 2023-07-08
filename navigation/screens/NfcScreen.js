import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from "react";
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


function NfcScreen({route, navigation}) {
    const [didOperation, setDidOperation] = useState(false);
    let retrievedRecord;
    let currentProgress;
    const firstUpdateGoHome = useRef(true);
    // const firstUpdateSaveRetRec = useRef(true);
    const config = [route.params.operationMode, route.params.desiredSetting];
    console.log(config);

    const equalsCheck = (a, b) =>
        a.length === b.length &&
        a.every((v, i) => v === b[i]);

    const handleLoad = async () => {
        let waterProgress = 0;
        try {
            const storedWaterProgress = await AsyncStorage.getItem(new Date(Date.now())
                .toLocaleString('de',{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                }));
            if (storedWaterProgress) {
                const fetchedWaterProgress = JSON.parse(storedWaterProgress);
                waterProgress = fetchedWaterProgress.waterProgress;
            }
        } catch (e) {
            console.warn(e);
        }
        currentProgress = waterProgress;
    }

    const handleSave = async (v) => {
        const updateWaterProgress = {
            waterProgress: v
        }
        try {
            await AsyncStorage.setItem(new Date(Date.now())
                .toLocaleString('de',{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                }), JSON.stringify(updateWaterProgress));
        } catch (e) {
            console.warn(e)
        }

    }

    const writeTag = async (data) => {
        NfcManager.start();
        const [useCase, desiredSetting] = data;
        let arduinoImplementationSetting;
        if (useCase === 0) {
            switch (desiredSetting) {
                case 0:
                    arduinoImplementationSetting = 1;
                    break;
                case 1:
                    arduinoImplementationSetting = 2;
                    break;
                case 2:
                    arduinoImplementationSetting = 3;
                    break;
                case 3:
                    arduinoImplementationSetting = 5;
                    break;
                case 4:
                    arduinoImplementationSetting = 7;
                    break;
                case 5:
                    arduinoImplementationSetting = 10;
            }
        } else if (useCase === 1) {
            arduinoImplementationSetting = desiredSetting * 10;//convert from L to dL
        } else {
            await NfcManager.cancelTechnologyRequest();
            setDidOperation(true);
        }
        try {

            let reqMifare = await NfcManager.requestTechnology(NfcTech.MifareUltralight);

            const auth = [4, 101, 21, 69];
            const message = [useCase, arduinoImplementationSetting, 0, 0];
            console.log(`Trying to write [${message}] onto page 5`)

            await NfcManager.mifareUltralightHandlerAndroid
                .mifareUltralightWritePage(5, message);
        } catch (e) {
            console.warn(e);
        } finally {
            await NfcManager.cancelTechnologyRequest();
        }
    }

    const readTag = async () => {
        NfcManager.start();
        let mifarePages = [];

        try {
            let reqMifare = await NfcManager.requestTechnology(NfcTech.MifareUltralight);

            const readLength = 2;
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

        if (mifarePages.length < 2) {
            setDidOperation(true);
            return;
        }
        const cardAuth = mifarePages[1].splice(0, 4);
        if (!equalsCheck(cardAuth, [4, 101, 21, 69])) {
            setDidOperation(true);
            return;
        }
        retrievedRecord = mifarePages[1][2] * 100; //saved in dL and converted to mL
        console.log("retrieved: " + retrievedRecord + " from the card");

    }

    //saving record
    // useEffect(() => {
    //     if (route.params.operationMode !== 2) {
    //         return
    //     }
    //     if (firstUpdateSaveRetRec.current) {
    //         firstUpdateSaveRetRec.current = false;
    //         return;
    //     }
    //
    //     handleLoad().then(
    //         () => handleSave(currentProgress + retrievedRecord).then(
    //             () => setDidOperation(true)
    //         )
    //     );
    //
    // },[retrievedRecord])

    //go home after operation
    useEffect(() => {
        if (firstUpdateGoHome.current) {
            firstUpdateGoHome.current = false;
            return;
        }
        navigation.navigate('Home');
        }
    ,[didOperation]);

    //NFC
    useEffect(() => {


        if (route.params.operationMode === 0 || route.params.operationMode === 1) {
                writeTag(config).then(() =>
                    setDidOperation(true)
                );
            } else if (route.params.operationMode === 2) {
                readTag(config).then(() => {
                        handleLoad().then(() => {
                                console.log(`Water Consumption Progress: ${currentProgress} + ${retrievedRecord}`);
                                handleSave(currentProgress + retrievedRecord).then(() =>
                                    setDidOperation(true)
                                )
                        })
                });
            }

    }, []);
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

export default NfcScreen;
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