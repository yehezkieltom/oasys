import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Provider} from "react-native-paper";
//import {NativeModules} from 'react-native';

import AddWaterIntake from "../../components/addWaterIntake";
import StockImage from "../../assets/successful-man-giving-glass-water-600w-444674071.webp";

//const {MyNativeModule} = NativeModules;

const HomeScreen = () => {
//    MyNativeModule.showToast("Hello from Native Module!");
    return (
        <Provider>
            <View style={styles.fullScreenView}>
                <ImageBackground source={StockImage} resizeMode="cover" style={styles.image}></ImageBackground>
            </View>

            <View style={styles.fabContainer}>
                <AddWaterIntake />
            </View>
        </Provider>
    )
};

const styles = StyleSheet.create({

    fullScreenView: {
        flex: 1,
        backgroundColor: '#aaa',
        zIndex: 0,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    }
});


export default HomeScreen;