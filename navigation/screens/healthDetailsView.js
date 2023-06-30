import {Button, StyleSheet, Text,View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Divider} from "react-native-paper";

function healthDetailsView({navigation}) {

    return(
        <View style={styles.container}>
            <View style={styles.iconStyle}>
                <Icon name="square-edit-outline"
                      size={50}
                      color='#3b5998'
                      style={{height:50,width:50}}
                      onPress={() => navigation.navigate('Health Details Form')}/>
            </View>
            <View style={styles.attributeContainer}>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Gender
                    </Text>
                    <Text style={styles.inputName}>
                        Female
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Date of Birth
                    </Text>
                    <Text style={styles.inputName}>
                        01.01.2000
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Alcohol Consumption
                    </Text>
                    <Text style={styles.inputName}>
                        3 units/weeks
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        Weekly Activity
                    </Text>
                    <Text style={styles.inputName}>
                        moderate
                    </Text>
                </View>
                <View style={styles.oneAttribute}>
                    <Text style={styles.attributeName}>
                        additional details
                    </Text>
                    <Text style={styles.inputName}>
                        Pregnant
                        Diarrhea
                    </Text>
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
        marginTop: 20,
    },

    attributeContainer:{
        padding: 30,
        marginTop:20,
    },

    oneAttribute: {
        marginTop: 20,
    },

    inputName: {
        color: 'black',
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    spacing:{
        marginTop: 20,
    }

});
