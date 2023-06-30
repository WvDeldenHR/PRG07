import React from 'react';
import { Text, Switch, View } from 'react-native';
// Components
import { useTheme } from '../components/layout/useTheme';


export function Settings() {
    const { theme, toggleTheme } = useTheme();

    return (
        <View className="flex items-center justify-center h-full" style={{ backgroundColor: theme === 'dark' ? 'black' : 'white' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme === 'dark' ? 'white' : 'black' }}>Settings</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
    );
}
