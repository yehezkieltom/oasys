import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import userProfile from "./screens/userProfile";

const homeName = "Home";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

const MainContainer = () => (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName = {homeName}
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === profileName) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: {
                    paddingBottom: 1,
                    fontSize: 10,
                },
                tabBarStyle: [
                    {
                        display: 'flex'
                    },
                    null
                ]
            })}>
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={profileName} component={userProfile} />
        </Tab.Navigator>
    </NavigationContainer>
)

export default MainContainer;