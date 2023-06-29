import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import  {useState} from 'react';
import CheckBox from "react-native-check-box";
import Slider from "@react-native-community/slider";
import { Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Formik, useFormik} from 'formik';
import * as yup from "yup";



function validateAlcohol(value) {
    let error;
    if(value<0) {
        error = 'Please input non-negative numbers'
    } else if (value>15) {
        error = 'Please input numbers below 16'
    }
    return error;
}

function healthDetailsForm() {
    const [isChecked, setIsChecked] = useState({
        pregnant: false,
        breastfeeding: false,
        diarrhea: false,}
    );

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const minAge = 1;
    const maxAge = 122;

    const minAlcohol = 0.0;
    const maxAlcohol = 15.0;

    const [range, setRange] = useState(5 );
    const [value, setValue] = useState(0); //gender
    const items = [ {label: "Male", value: 0}, {label: "Female", value: 1}]
    const [age, setAge] = useState('22');
    const [alcohol, setAlcohol] = useState('3.0');


    function handleChangeAge(typedAge) {
        const checkedAge = Math.max(minAge, Math.min(maxAge, Number(typedAge)));
        setAge(checkedAge);
    }

    function handleChangeAlcohol(typedAlcohol) {
        const checkedAlcohol = Math.max(minAlcohol, Math.min(maxAlcohol, Number(typedAlcohol)));
        setAlcohol(checkedAlcohol);
    }

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
                       onPress={(value) => setValue (value)}
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
            <Formik
                onSubmit={values => {
                    setAlcohol(values.alcohol);
                }} initialValues={{alcohol: alcohol}}>
                {({ handleChange, handleBlur, values }) => (
                    <View style={styles.attributeContainer}>
                        <Text style={styles.attributeName}>
                            How much alcohol do you drink weekly?
                        </Text>
                        <View style={styles.inputTextContainer}>
                            <TextInput style={styles.input}
                                       onChangeText={handleChange('alcohol')}
                                       onBlur={handleBlur('alcohol')}
                                       validate={validateAlcohol}
                                       value={values.alcohol}
                                      /* keyboardType='number-pad'*//>
                        </View>
                    </View>
                )}
            </Formik>
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
                value={5}
                step={1}
                onValueChange={value => setRange(parseInt(value))}
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
            <CheckBox isChecked={isChecked.pregnant} onClick={() => setIsChecked({...isChecked, pregnant: !isChecked.pregnant})}
            rightText="Pregnant" righTextStyle={ {color: isChecked.pregnant ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE'
            checkBoxColor= "black"
            >
            </CheckBox>
            <CheckBox isChecked={isChecked.breastfeeding} onClick={() => setIsChecked({...isChecked, breastfeeding: !isChecked.breastfeeding})}
                      rightText="Breastfeeding"  righTextStyle={ {color: isChecked.breastfeeding ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE' checkBoxColor= "black"
            >
            </CheckBox>
            <CheckBox isChecked={isChecked.diarrhea} onClick={() => setIsChecked({...isChecked,diarrhea: !isChecked.diarrhea})}
                      rightText="Fluid imbalance" righTextStyle={ {color: isChecked.diarrhea ? '#19A7CE' : 'black', fontSize: 19, fontWeight: "bold",} }
                      checkedCheckBoxColor= '#19A7CE' checkBoxColor= "black"
            >
            </CheckBox>
        </View>
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
