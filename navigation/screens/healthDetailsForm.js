import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {useEffect, useState} from 'react';
import CheckBox from "react-native-check-box";
import Slider from "@react-native-community/slider";
import { Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Formik, useFormik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from "@react-navigation/native";







function healthDetailsForm({navigation}) {

    const [isPregnant, setIsPregnant] = useState(false);

    const [isBreastfeeding, setIsBreastfeeding] = useState(false);

    const [isDiarrhea, setIsDiarrhea] = useState(false);

    /*const route = useRoute();*/

    const [isChecked, setIsChecked] = useState({
        pregnant: false,
        breastfeeding: false,
        diarrhea: false,}
    );

    const [isFormDirty, setIsFormDirty] = useState(false);

    const [date, setDate] = useState(new Date(Date.now()));
    const [open, setOpen] = useState(false);



    const [gender, setGender] = useState('Male'); //gender
    const items = [ {label: "Female", value: 1}, {label: "Male", value: 2}]
    const [alcohol, setAlcohol] = useState(3);
    const [activity, setActivity] = useState(5);


    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUserInfo = await AsyncStorage.getItem('userInfo');
                if (storedUserInfo) {
                    //userInfo=JSON.parse(storedUserInfo);
                    const fetchedUserInfo=JSON.parse(storedUserInfo);
                    if (fetchedUserInfo.gender) {
                        setGender(fetchedUserInfo.gender);
                    }
                    if (fetchedUserInfo.dateBirth) {
                        setDate(fetchedUserInfo.dateBirth);
                    }
                    if (fetchedUserInfo.alcoholConsumption) {
                        setAlcohol(fetchedUserInfo.alcoholConsumption);
                    }
                    if (fetchedUserInfo.weeklyActivity) {
                        setActivity(fetchedUserInfo.weeklyActivity);
                    }
                    if (!fetchedUserInfo.breastfeeding ) {
                        //don't fix this, because the value can be undefined and we dont want that, stupid JS
                        setIsBreastfeeding(false);
                    } else {
                        setIsBreastfeeding(true);
                    }
                    if (!fetchedUserInfo.pregnant) {
                        //don't fix this, because the value can be undefined and we dont want that, stupid JS
                        setIsPregnant(false);
                    } else {
                        setIsPregnant(true);
                    }
                    if (!fetchedUserInfo.diarrhea) {
                        //don't fix this, because the value can be undefined and we dont want that, stupid JS
                        setIsDiarrhea(false);
                    } else {
                        setIsDiarrhea(true);
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
            if (gender) {
                updateUserInfo.gender = gender;
            }
            if (date) {
                updateUserInfo.dateBirth = date;
            }
            if (alcohol) {
                updateUserInfo.alcoholConsumption = alcohol;
            }
            if (activity) {
                updateUserInfo.weeklyActivity = activity;
            }
            if (isPregnant) {
                updateUserInfo.pregnant = isPregnant;
            }
            if (isBreastfeeding) {
                updateUserInfo.breastfeeding = isBreastfeeding;
            }
            if (isDiarrhea) {
                updateUserInfo.diarrhea = isDiarrhea;
            }

            await AsyncStorage.setItem('userInfo', JSON.stringify(updateUserInfo));
            setIsFormDirty(false);

            navigation.navigate('Health Details',/*{ triggerUseEffect: !route.params?.currentState }*/);
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
                Select your Gender
            </Text>
            <RadioButton.Group onValueChange={newValue => {setGender(newValue);  setIsFormDirty(true);}} value={gender}>
                <View style={styles.buttonWithText}>
                    <RadioButton value={'Male'} uncheckedColor='black' color='#19A7CE' status={gender=== 'Male' ? 'checked' : 'unchecked'}/>
                    <Text  style={[styles.text, gender=== 'Male' && styles.selectedText]}>Male</Text>
                </View>
                <View style={styles.buttonWithText}>
                    <RadioButton value={'Female'} uncheckedColor='black' color='#19A7CE' status={gender=== 'Female' ? 'checked' : 'unchecked'}/>
                    <Text style={[styles.text, gender=== 'Female' && styles.selectedText]}>Female</Text>
                </View>
            </RadioButton.Group>
        </View>
        <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>
                Enter your date of birth
            </Text>
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={new Date(Date.now())}
                maximumDate={new Date("2023-06-29")}
                minimumDate={new Date("1907-03-04")}
                androidVariant={"nativeAndroid"}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>

        <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>
                How much alcohol do you drink weekly?
            </Text>
            <View style={styles.inputTextContainer}>
                <TextInput style={styles.input}
                           onChangeText={(newAlcohol) => {
                               setAlcohol(newAlcohol);
                               setIsFormDirty(true);
                           }}
                           placeholder={`${alcohol}`}
                           value={alcohol.toString()}
                          /* keyboardType='number-pad'*//>
            </View>
        </View>


        <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>
                How much physical activities do you do in a week
            </Text>
            <View>
                <Slider
                style={{width:315, height: 40}}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor= '#19A7CE'
                maximumTrackTintColor='#000'
                thumbTintColor='#19A7CE'
                value={activity}
                step={1}
                onValueChange={value => {
                    setActivity(value);
                    setIsFormDirty(true);
                }}
                />
                <View style={styles.sliderLabel}>
                    <Text style={styles.sliderLabelLeft}>
                        Light
                    </Text>
                    <Text style={styles.sliderLabelRight}>
                        Intense
                    </Text>
                </View>
            </View>
        </View>
        <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>
                Additional information
            </Text>
            <CheckBox isChecked={isPregnant} onClick={() => {
                setIsPregnant(!isPregnant);
                setIsFormDirty(true);
            }}
            rightText="Pregnant" righTextStyle={ {color: isPregnant ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE'
            checkBoxColor= "black"
            >
            </CheckBox>
            <CheckBox isChecked={isBreastfeeding} onClick={() => {
                setIsBreastfeeding( !isBreastfeeding);
                setIsFormDirty(true);
            }}
                      rightText="Breastfeeding"  righTextStyle={ {color: isBreastfeeding ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE' checkBoxColor= "black"
            >
            </CheckBox>
            <CheckBox isChecked={isDiarrhea} onClick={() => {
                setIsDiarrhea(!isDiarrhea);
                setIsFormDirty(true);
            }}
                      rightText="Fluid imbalance" righTextStyle={ {color: isDiarrhea ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE' checkBoxColor= "black"
            >
            </CheckBox>
        </View>
            <Button title="Save" onPress={handleSave} disabled={!isFormDirty} />
        </ScrollView>

    </View>

    )

}
healthDetailsForm.title = 'Health Details';

export default healthDetailsForm;

const styles = StyleSheet.create({

    sliderLabel: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    innerText: {
        color: '#19A7CE',
    },

    input:{
        borderWidth:1,
        borderColor: '#777',
        padding: 8,
        height:32,
        width: 45,
        color: '#19A7CE',
    },

    logoScreen: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop:45,
        paddingBottom: 15,
    },

    attributeName: {
        color: 'black',
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    additionalAttributeName: {
        color: 'black',
        fontSize: 19,
        fontWeight: "bold",
    },

    attributeContainer:{
        padding: 30,
    },

    titleOasys: {
        color: 'black',
        fontSize: 24,
        fontWeight: 600,
    },

    container: {
        flex: 1,
    },

    text: {
        fontSize: 20,
        paddingTop: 8,
        paddingBottom: 8,
    },

    inputTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    buttonWithText: {
        flexDirection: "row",
        alignItems: 'center',
    },

    selectedText: {
        color: "#19A7CE",
    }

});
