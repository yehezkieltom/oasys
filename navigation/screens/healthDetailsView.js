import {Button, StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function healthDetailsView({navigation}) {

    return(
        <View style={styles.iconStyle}>
           <Icon name="square-edit-outline"
                 size={50}
                 color='#3b5998'
                 style={{height:50,width:50}}
                 onPress={() => navigation.navigate('Health Details Form')}/>
        </View>
    )

}

export default healthDetailsView;

const styles= StyleSheet.create ({

    iconStyle: {
        position: 'absolute',

        right: 16,
        zIndex: 1,

    }

});