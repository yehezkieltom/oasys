import {Button, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Divider, List} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from "react";








function nfcScreen({navigation}) {
    return (
        <View style={styles.wholeScreen}>
            <Text style={styles.title}>
                Hold near reader
            </Text>
            <Icon style={styles.iconStyle}
                name='contactless'
                color='#fff'
                size={150}
                marginTop={12}
            />
        </View>
    )
}

export default nfcScreen;
const styles= StyleSheet.create ( {

    iconStyle:{
        borderRadius:10,
    },





    wholeScreen: {
        flex: 1,
        backgroundColor: '#19A7CE',
        justifyContent: 'center',
        alignItems:'center',
    },

    logoScreen: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop:45,
        paddingBottom: 15,
    },

    title: {
        color: 'white',
        fontSize: 32,
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