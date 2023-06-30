import {Button, Text, StyleSheet, View, Pressable} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import  {useState} from 'react';

function healthDetailsView({navigation}) {
    const [gender, setGender] = useState('female');
    const [dateOfBirth, setDateOfBirth] = useState(new Date('2000-01-01'));
    const [alcohol, setAlcohol] = useState(3.0);
    const [activity, setActivity] = useState('moderate')

    return(
        <View style={styles.container}>
            <View style={styles.attributeContainer}>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Gender
                    </Text>
                    <Text style={styles.inputName}>
                        {gender}
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
                        {alcohol} { alcohol === 1 ? 'unit' :  'units' }/week
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Weekly Activity
                    </Text>
                    <Text style={styles.inputName}>
                        {activity}
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        additional details
                    </Text>
                    <Text style={styles.inputName}>
                        Pregnant
                    </Text>
                    <Text style={styles.inputName}>
                        Diarrhea
                    </Text>
                    <Text style={styles.inputName}>
                        John Pork
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
