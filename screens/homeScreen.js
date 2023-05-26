import {StyleSheet, Text, SafeAreaView, View, ScrollView, ViewComponent, ScrollViewBase} from "react-native";
import {Provider} from "react-native-paper";

import AddWaterIntake from "../components/addWaterIntake";
import Colors from "../constants/Colors";
import IconPlus from "../assets/Plus.js";


const homeScreen = () => {
    return (
        <Provider>
            <View style={styles.fullScreenView}>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a metus et nulla dapibus ultricies in at augue. Etiam eu porta ante. Praesent id metus iaculis, pulvinar purus at, tristique nisl. Phasellus pulvinar interdum sem. Integer in faucibus nisi. Nam efficitur elementum dapibus. Pellentesque lobortis in neque eget dictum. Sed aliquet vitae nisl non dignissim. Duis lobortis ante at pretium congue.

                </Text>
            </View>

            <View style={styles.fabContainer}>
                <AddWaterIntake />
            </View>
        </Provider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
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
    }
});

export default homeScreen;