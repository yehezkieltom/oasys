import React from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, LogBox} from 'react-native';
import { PaperProvider } from "react-native-paper";
import { name as appName } from './app.json';

import {StatusBar} from "expo-status-bar";
import MainContainer from "./navigation/MainContainer";

export default function App() {
    LogBox.ignoreAllLogs();
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <MainContainer />
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