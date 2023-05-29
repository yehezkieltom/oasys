
import {AppRegistry, SafeAreaView, StyleSheet} from 'react-native';
import { PaperProvider } from "react-native-paper";
import { name as appName } from './app.json';

import HomeScreen from './screens/homeScreen'
import {StatusBar} from "expo-status-bar";
import UserProfile from "./navigation/screens/UserProfile";
import HealthDetails from "./navigation/screens/HealthDetails";
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="User Profile"
                    component={UserProfile}

                />
                <Stack.Screen name="Health Details" component={HealthDetails} />
                    {/*<PaperProvider>
                        <SafeAreaView style={styles.container}>*/}
                            {/*<StatusBar style="auto" />*/}
                            {/*<HomeScreen />*/}
                            {/*<UserProfile/>*/}
                            {/*<HealthDetails/>*/}
                        {/*</SafeAreaView>
                    </PaperProvider>*/}
            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
    },
});
AppRegistry.registerComponent(appName, () => App);