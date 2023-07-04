import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Provider} from "react-native-paper";

import AddWaterIntake from "../../components/addWaterIntake";
import StockImage from "../../assets/successful-man-giving-glass-water-600w-444674071.webp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch(e) {
        // clear error
    }

    console.log('Done.')
}
const HomeScreen = () => {
    // clearAll();
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