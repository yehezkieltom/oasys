import {Button, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Divider, List} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as React from "react";






 function userProfile() {
    return (
     <View style={styles.wholeScreen}>
        <View style={styles.logoScreen}>
            <Text style={styles.titleOasys} >oas<Text style={styles.innerText}>y</Text>s</Text>
        </View>
        <View style={styles.buttonS}>
            <Divider bold/>
            <View>
                <List.Item onPress={() => console.log('App Settings pressed!')}
                           titleStyle={styles.textAppHealth} title="App Settings"
                           left={(props) => <Icon {...props}  size={35} name="cog" />}/>
            </View>
            <Divider bold/>
            <View>
                <List.Item onPress={() => console.log('Health Details pressed!')}
                           titleStyle={styles.textAppHealth} title="Health Details"
                           left={(props) => <Icon {...props}  size={35} name="clipboard-pulse" /> }/>
            </View>
            <Divider bold/>



        </View>
     </View>
    )
}

export default userProfile;
const styles= StyleSheet.create ( {

    innerText: {
        color: '#19A7CE',
    },

    textAppHealth: {
      color: 'black',
      fontSize: 24,
      paddingBottom: 5,
      paddingTop: 5,
      paddingLeft: 5,
    },

   buttonS:{
     justifyContent: "flex-start",
     flexDirection:  "column",

   },

   wholeScreen: {
        flex: 1,
   },

   logoScreen: {
       backgroundColor: 'white',
       alignItems: 'center',
       marginTop:45,
       paddingBottom: 15,
   },

    titleOasys: {
       color: 'black',
       fontSize: 24,
       fontWeight: 600,
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8
    },
});

