import React from 'react';
import {AppRegistry, SafeAreaView, StyleSheet} from 'react-native';
import { PaperProvider } from "react-native-paper";
import { name as appName } from './app.json';

import HomeScreen from './screens/homeScreen'
import {StatusBar} from "expo-status-bar";

export default function App() {
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <HomeScreen />
            </SafeAreaView>
        </PaperProvider>
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