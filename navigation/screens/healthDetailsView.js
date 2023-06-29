import {Button, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function healthDetailsView({navigation}) {

    return(
        <View>
           <Icon name="square-edit-outline"
                 size={25}
                 color='#3b5998'
                 style={{height:25,width:25}}
                 onPress={() => navigation.navigate('Health Details Form')}/>
        </View>
    )

}

export default healthDetailsView;