import {Button, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as React from "react";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DispenseWater({navigation}) {
//    readTag();

    const [counter, setCounter] = useState(0); //pointer to preset
    const dispenserPreset = [100, 200, 300, 500, 700, 1000]

    const getDefaultValue = async () => {
        try {
            const fetchUserInfo = await AsyncStorage.getItem('userInfo');
            if (fetchUserInfo) {
                const userInfo = JSON.parse(fetchUserInfo);
                if (userInfo.water) {
                    setCounter(userInfo.water - 1);
                }
            }
        } catch (e) {
            console.warn("Unexpected error while fetching async storage: " + e);
        }
    }

    const incrementCounter = () => {
        // await AsyncStorage.setItem('@count', (counter + 1).toString());
        setCounter(Math.min(counter + 1, dispenserPreset.length));
    }


    const decrementCounter = () => {
        // await AsyncStorage.setItem('@count', (counter - 1).toString());
        setCounter(Math.max(0, counter - 1));
    }
    useEffect(() => {
        getDefaultValue();
    },[]);

    return (
        <View style={styles.wholeScreen}>
            <Text style={styles.title}>
                Water output
            </Text>
            <Text style={styles.numberScreen}>{dispenserPreset[counter]} ml</Text>
            <View style={styles.button}>
                <Pressable
                    onPress={decrementCounter}
                    disabled={counter <= 0}
                >
                    <Icon
                        name='remove'
                        size={100}
                        color='white'
                        style={styles.minusStyle}
                    />
                </Pressable>
                <Pressable
                    onPress={incrementCounter}
                    disabled={counter > dispenserPreset.length - 2}
                >
                    <Icon
                        name='add'
                        size={100}
                        color='white'
                        style={styles.minusStyle}
                    />
                </Pressable>
            </View>
            <Pressable onPress={()=> {
                navigation.navigate('NFC Screen', {
                    operationMode: 0,
                    desiredSetting: counter
                });
            }}>
                <Text style={styles.doneButton}>
                    done
                </Text>
            </Pressable>
        </View>
    )
}

export default DispenseWater;

const styles= StyleSheet.create ({
    minusStyle:{
        borderRadius:10,
        color: 'white',
        height:100,
        width:100,

        fontSize: 100,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
    },

    wholeScreen: {
        flex: 1,
        backgroundColor: '#19A7CE',
        justifyContent: 'center',
        alignItems:'center',
    },

    numberScreen: {
        color: 'white',
        alignItems: 'center',
        paddingTop: 45,
        paddingBottom: 15,
        fontSize: 100,
    },

    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 600,
    },

    button: {
        justifyContent:'space-between',
        flexDirection: 'row',
    },

    doneButton: {
        color: 'white',
        fontSize: 32,
        fontWeight: "200",
    }

});