import {Button, Text, StyleSheet, View, Pressable} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

function healthDetailsView({navigation}) {

    const [gender, setGender] = useState('female');
    const [dateOfBirth, setDateOfBirth] = useState(new Date('2000-01-01'));
    const [alcohol, setAlcohol] = useState(3.0);
    const [activity, setActivity] = useState('moderate');
    const [isChecked, setIsChecked] = useState({
        pregnant: false,
        breastfeeding: false,
        diarrhea: false,}
    );

    function setRealGender (number) {
        let name;
        if (number=== 2) {
            name = 'Male';
        } else if (number === 1) {
            name = 'Female';
        }
        return name;
    }

    function setRealActivity (number) {
        let name;
        if (0 <= number && number <=1 ) {
            name = 'light';
        } else if (2<= number && number <=3) {
            name = 'lightly medium';
        } else if (4<= number && number <=6) {
            name = 'medium';
        } else if (7<= number && number <=8) {
            name = 'intense medium';
        } else if (9<= number && number <=10) {
            name = 'intense';
        }
        return name;
    }

    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUserInfo = await AsyncStorage.getItem('userInfo');
                if (storedUserInfo) {
                    setUserInfo(JSON.parse(storedUserInfo));
                }
            } catch (error) {
                console.error('Error loading user info:', error);
            }
        };

        loadUserInfo();
    }, []);




    return(
        <View style={styles.container}>
            <View style={styles.attributeContainer}>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Gender
                    </Text>
                    <Text style={styles.inputName}>
                        {userInfo && setRealGender( userInfo.gender)}
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Date of Birth
                    </Text>
                    <Text style={styles.inputName}>
                        {dateOfBirth.toLocaleDateString('de-DE', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Alcohol Consumption
                    </Text>
                    <Text style={styles.inputName}>
                        {userInfo && userInfo.alcoholConsumption} { alcohol === 1 ? 'unit' :  'units' }/week
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Weekly Activity
                    </Text>
                    <Text style={styles.inputName}>
                        {userInfo && setRealActivity( userInfo.weeklyActivity)}
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        additional details
                    </Text>
                    <Text style={styles.inputName}>
                        {userInfo && userInfo.information.pregnant && 'Pregnant'}
                    </Text>
                    <Text style={styles.inputName}>
                        {userInfo && userInfo.information.breastfeeding && 'Breastfeeding'}
                    </Text>
                    <Text style={styles.inputName}>
                        {userInfo && userInfo.information.diarrhea && 'Fluid imbalance'}
                    </Text>
                </View>
                <View>
                    <Pressable onPress={() => navigation.navigate('Health Details Form')}>
                        <Text style={styles.editButton}>
                            edit details
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )

}

export default healthDetailsView;

const styles= StyleSheet.create ({

    iconStyle: {
        position: 'absolute',
        right: 16,
        zIndex: 1,
    },

    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },

    attributeName: {
        color: 'black',
        fontSize: 20,
        fontWeight: "normal",
        marginTop: 1,
    },

    attributeContainer:{
        paddingLeft: 15,
        marginTop:5,
    },

    oneAttribute: {
        marginTop: 15,
    },

    inputName: {
        color: 'black',
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 1,
    },

    spacing:{
        marginTop: 20,
    },

    editButton:{
        color: '#19A7CE',
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 5,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',

    },

});
