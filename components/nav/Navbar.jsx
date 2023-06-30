import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Views
import { Home } from '../../views/Home';
import { Maps } from '../../views/Maps';
import { Settings } from '../../views/Settings';

const Tab = createBottomTabNavigator();

export function Navbar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                tabBarOptions={{
                    activeTintColor: 'blue', // Active tab icon color
                    inactiveTintColor: 'gray', // Inactive tab icon color
                    style: {
                        backgroundColor: 'white', // Tab bar background color
                    },
                    labelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Maps" component={Maps} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
  );
}