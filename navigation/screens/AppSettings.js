import * as React from 'react';
import {View, StyleSheet, Text,  ScrollView, TextInput, Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {useEffect, useState} from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AppSettings({navigation}) {

    const [water, setWater] = useState(1);

    const [isFormDirty, setIsFormDirty] = useState(false);

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
                            <RadioButton value={1} uncheckedColor='black' color='#19A7CE' status={water === 1 ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water === 1 && styles.selectedText]} >100 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value={2} uncheckedColor='black' color='#19A7CE' status={water === 2 ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water === 2 && styles.selectedText]}>200 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value={3} uncheckedColor='black' color='#19A7CE' status={water === 3 ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water === 3 && styles.selectedText]}>300 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value={4} uncheckedColor='black' color='#19A7CE' status={water === 4 ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water === 4 && styles.selectedText]}>500 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value={5} uncheckedColor='black' color='#19A7CE' status={water === 5 ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water === 5 && styles.selectedText]}>700 ML</Text>
                        </View>
                        <View style={styles.buttonWithText}>
                            <RadioButton value={6} uncheckedColor='black' color='#19A7CE' status={water === 6 ? 'checked' : 'unchecked'}/>
                            <Text style={[styles.text, water === 6 && styles.selectedText]}>1000 ML</Text>
                        </View>
                    </RadioButton.Group>
                </View>
                <Button title="Save" onPress={handleSave} disabled={!isFormDirty} />

            </ScrollView>

        </View>

    )

}
AppSettings.title = 'App Settings';

export default AppSettings;

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
