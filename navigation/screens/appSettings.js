import * as React from 'react';
import {View, StyleSheet, Text,  ScrollView, TextInput, Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {useEffect, useState} from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function appSettings({navigation}) {

    const [water, setWater] = useState('100 ML');

    const [isFormDirty, setIsFormDirty] = useState(false);

    const items = [ {label: "100 ML", value: 1}, {label: "200 ML", value: 2}, {label: "300 ML", value: 3},
                                              {label: "500 ML", value: 5}, {label: "700 ML", value: 7}, {label: "1000 ML", value: 10}];

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUserInfo = await AsyncStorage.getItem('userInfo');
                if (storedUserInfo) {
                    //userInfo=JSON.parse(storedUserInfo);
                    const fetchedUserInfo=JSON.parse(storedUserInfo);
                    if (fetchedUserInfo.water) {
                        setWater(fetchedUserInfo.water);
                    }
                }
            } catch (error) {
                console.error('Error loading user info:', error);
            }
        };

        loadUserInfo();
    }, []);


    const handleSave = async () => {
        try {
            const updateUserInfo = {};
            if (water) {
                updateUserInfo.water = water;
            }

            await AsyncStorage.setItem('userInfo', JSON.stringify(updateUserInfo));
            setIsFormDirty(false);

            navigation.navigate('Home',/*{ triggerUseEffect: !route.params?.currentState }*/);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/*<View style={styles.logoScreen}>*/}
            {/*    <Text style={styles.titleOasys} >oas<Text style={styles.innerText}>y</Text>s</Text>*/}
            {/*</View>*/}
            <ScrollView overScrollMode="never">
                <View style={styles.attributeContainer}>
                    <Text style={styles.attributeName}>
                        Select your preferred amount of water
                    </Text>
                    <RadioButton.Group onValueChange={newValue => {setWater(newValue);  setIsFormDirty(true);}} value={water}>
                        <View style={styles.buttonWithText}>
                            <RadioButton value="first" uncheckedColor='black' color='#19A7CE' status={water=== 'first' ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water=== 'first' && styles.selectedText]} >100 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value="second" uncheckedColor='black' color='#19A7CE' status={water=== 'second' ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water=== 'second' && styles.selectedText]}>200 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value="third" uncheckedColor='black' color='#19A7CE' status={water=== 'third' ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water=== 'third' && styles.selectedText]}>300 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value="fifth" uncheckedColor='black' color='#19A7CE' status={water=== 'fifth' ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water=== 'fifth' && styles.selectedText]}>500 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value="seventh" uncheckedColor='black' color='#19A7CE' status={water=== 'seventh' ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water=== 'seventh' && styles.selectedText]}>700 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value="tenth" uncheckedColor='black' color='#19A7CE' status={water=== 'tenth' ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water=== 'tenth' && styles.selectedText]}>1000 ML</Text>
                        </View>
                    </RadioButton.Group>
                </View>
                <Button title="Save" onPress={handleSave} disabled={!isFormDirty} />

            </ScrollView>

        </View>

    )

}
appSettings.title = 'App Settings';

export default appSettings;

const styles = StyleSheet.create({


    attributeName: {
        color: 'black',
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },


    attributeContainer:{
        padding: 30,
    },

    titleOasys: {
        color: 'black',
        fontSize: 24,
        fontWeight: 600,
    },

    buttonWithText: {
        flexDirection: "row",
        alignItems: 'center',
    },

    text: {
        fontSize: 20,
        paddingTop: 8,
        paddingBottom: 8,
    },

    button:{
        width: 30, // Customize the width of the button
        height: 30, // Customize the height of the button
        fontSize: 30,

    },
    selectedText: {
        color: "#19A7CE",
    }
});
