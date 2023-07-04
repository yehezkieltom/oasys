import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Pressable} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {useEffect, useState} from 'react';
import CheckBox from "react-native-check-box";
import Slider from "@react-native-community/slider";
import { Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Formik, useFormik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';






function healthDetailsForm({navigation}) {

    let userInfo = {
        //default Value if no AsyncStorage found
        gender: 1,
        dateBirth: new Date(Date.now()),
        alcoholConsumption: 3,
        weeklyActivity: 2,
        information: {
            pregnant: false,
            breastfeeding: false,
            diarrhea: false
        },
    };

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUserInfo = await AsyncStorage.getItem('userInfo');
                if (storedUserInfo) {
                    userInfo=JSON.parse(storedUserInfo);
                }
            } catch (error) {
                console.error('Error loading user info:', error);
            }
        };

        loadUserInfo();
    }, []);

    const [isChecked, setIsChecked] = useState({
        pregnant: userInfo.information.pregnant,
        breastfeeding: userInfo.information.breastfeeding,
        diarrhea: userInfo.information.diarrhea,}
    );

    const [isFormDirty, setIsFormDirty] = useState(false);

    const [date, setDate] = useState(new Date(Date.now()));
    const [open, setOpen] = useState(false);



    const [value, setValue] = useState(parseInt(userInfo.gender)); //gender
    const items = [ {label: "Male", value: 0}, {label: "Female", value: 1}]
    const [alcohol, setAlcohol] = useState(parseInt(userInfo.alcoholConsumption));
    const [activity, setActivity] = useState(userInfo.weeklyActivity);


    function validateAlcohol(value) {
        let error;
        if (!value) {
            error = "Required";
        } else if (!/^[0-9]+(\.[0-9]+)?$/.test(value)) {
            error = "Invalid input";
        } else if (value < 0) {
            error = "Please input a non-negative integer";
        }
    }

    const handleSave = async () => {
        try {
            const updateUserInfo = {};
            if (value) {
                updateUserInfo.gender = value;
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
            if (isChecked.pregnant) {
                updateUserInfo.information.pregnant = isChecked.pregnant;
            }
            if (isChecked.breastfeeding) {
                updateUserInfo.information.breastfeeding = isChecked.breastfeeding;
            }
            if (isChecked.diarrhea) {
                updateUserInfo.information.diarrhea = isChecked.diarrhea;
            }

            await AsyncStorage.setItem('userInfo', JSON.stringify(updateUserInfo));
            setIsFormDirty(false);
            navigation.navigate('Health Details');
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
            <RadioForm radio_props={items} initial={0}
                       value={value}
                       onPress={(inp) => {setValue (inp); setIsFormDirty(true);}}
                       buttonColor='black'
                       labelColor= 'black'
                       selectedButtonColor= '#19A7CE'
                       selectedLabelColor= '#19A7CE'
            />
        </View>
        <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>
                Enter your date of birth
            </Text>
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={date}
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
                           placeholder={'3.0'}
                           value={alcohol}
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
            <CheckBox isChecked={isChecked.pregnant} onClick={() => {
                setIsChecked({...isChecked, pregnant: !isChecked.pregnant});
                setIsFormDirty(true);
            }}
            rightText="Pregnant" righTextStyle={ {color: isChecked.pregnant ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE'
            checkBoxColor= "black"
            >
            </CheckBox>
            <CheckBox isChecked={isChecked.breastfeeding} onClick={() => {
                setIsChecked({...isChecked, breastfeeding: !isChecked.breastfeeding});
                setIsFormDirty(true);
            }}
                      rightText="Breastfeeding"  righTextStyle={ {color: isChecked.breastfeeding ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE' checkBoxColor= "black"
            >
            </CheckBox>
            <CheckBox isChecked={isChecked.diarrhea} onClick={() => {
                setIsChecked({...isChecked, diarrhea: !isChecked.diarrhea});
                setIsFormDirty(true);
            }}
                      rightText="Fluid imbalance" righTextStyle={ {color: isChecked.diarrhea ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
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

    inputTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }

});
