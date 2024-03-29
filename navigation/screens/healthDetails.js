import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import  {useState} from 'react';
import CheckBox from "react-native-check-box";
import Slider from "@react-native-community/slider";





function healthDetails () {
    const [isChecked, setIsChecked] = useState({
        pregnant: false,
        breastfeeding: false,
        diarrhea: false,}
    );

    const minAge = 1;
    const maxAge = 122;

    const minAlcohol = 0.0;
    const maxAlcohol = 15.0;

    const [range, setRange] = useState('5 ');
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
                Enter your Age
            </Text>
            <View style={styles.inputTextContainer} >
                <TextInput

                           style={styles.input}
                           textAlign='center'
                           placeholder='22'
                           maxLength={3}
                           onChangeText={(value) => handleChangeAge(value)}
                           underlineColorAndroid="#19A7CE"
                           keyboardType='number-pad'/>
                <Text>
                    Your age is: <Text style={styles.innerText}> {age}</Text>
                </Text>
            </View>
        </View>
        <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>
                How much alcohol do you drink per week
            </Text>
            <View style={styles.inputTextContainer} >
                <TextInput style={styles.input}
                           textAlign='center'
                           placeholder='3.0'
                           onChangeText={(value) => handleChangeAlcohol(value)}
                           underlineColorAndroid="#19A7CE"
                           keyboardType='number-pad'/>
                <Text >
                    You drink <Text style={styles.innerText}> {alcohol}</Text> units alcohol per week
                </Text>
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
healthDetails.title = 'Health Details';

export default healthDetails;

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
