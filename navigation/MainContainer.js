import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import UserProfile from "./screens/UserProfile";
import HealthDetailsForm from "./screens/HealthDetailsForm";
import HealthDetails from "./screens/HealthDetailsView";
import NfcScreen from "./screens/NfcScreen";
import AppSettings from "./screens/AppSettings";
import FillWaterScreen from "./screens/FillWaterScreen";
import DispenseWater from "./screens/DispenseWater";
import ManualAddWater from "./screens/ManualAddWater";

const homeName = "Home";
const profileName = "Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Root = () => (
    <Tab.Navigator
        initialRouteName = {homeName}
        screenOptions = {({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (rn === profileName) {
                    iconName = focused ? 'person' : 'person-outline';
                }

                return <Ionicons name={iconName} size={35} color={color} />;
            },
            tabBarActiveTintColor: '#19A7CE',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {
                paddingBottom: 1,
                fontSize: 10,
            },
            tabBarStyle: [
                {
                    display: 'flex',
                    height: 70
                },
            ],
            tabBarShowLabel: false
        })}>
        <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name={profileName} component={UserProfile} options={{ headerShown: false }}/>
    </Tab.Navigator>
)

const MainContainer = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='Root'
                component={Root}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Manual Add Water'
                component={ManualAddWater}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Health Details'
                component={HealthDetails}

            />
            <Stack.Screen
                name='Health Details Form'
                component={HealthDetailsForm}
            />
            <Stack.Screen
                name='App Settings'
                component={AppSettings}

            />
            <Stack.Screen
                name='Dispense Water'
                component={DispenseWater}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Refill Water'
                component={FillWaterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='NFC Screen'
                component={NfcScreen}
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    </NavigationContainer>
)

export default MainContainer;