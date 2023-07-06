import {Button, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as React from "react";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import button from "react-native-paper/src/components/Button/Button";

function fillWaterScreen({navigation}) {
//    readTag();

    const [counter, setCounter] = useState(0);

    const getData = async () => {

        const values = await AsyncStorage.multiGet(['@count']);

        values.forEach(value => {
            if (value[0] === '@count') {
                const count = parseInt(value[1]);
                setCounter(isNaN(count) ? 0 : count);
            }
        });
    }

    const incrementCounter = async () => {
        await AsyncStorage.setItem('@count', (counter + 1).toString());
        setCounter(counter + 1);
    }

    const decrementCounter = async () => {
        await AsyncStorage.setItem('@count', (counter - 1).toString());
        setCounter(Math.max(0, counter - 1));
    }

    return (
        <View style={styles.wholeScreen}>
            <Text style={styles.title}>
                Set the water tank volume
            </Text>
            <Text style={styles.numberScreen}>{counter}</Text>
            <View style={styles.button}>
                <Icon
                    name='remove'
                    size={100}
                    color='white'
                    style={styles.minusStyle}
                    onPress={decrementCounter}/>
                <Icon
                    name='add'
                    size={100}
                    color='white'
                    style={styles.minusStyle}
                    onPress={incrementCounter}/>
            </View>
            <Pressable onPress={()=> console.log("Transferring the data to dispenser")}>
                <Text style={styles.doneButton}>
                    done
                </Text>
            </Pressable>
        </View>
    )
}

export default fillWaterScreen;
const styles= StyleSheet.create ( {

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
        fontWeight: 210,
        fontStyle: "normal",
    }

});