import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

export type RootStackParamList = {
    Home: undefined;
    Search: undefined;
}

const Stack = createStackNavigator<RootStackParamList>()

export default function AppNavigator() {
    return (
        //navigation container
        <NavigationContainer>

            {/* //  stack navigator */}
            <Stack.Navigator>
            {/*//      stack screen */}
                <Stack.Screen name="Home"  component={HomeScreen}  />
                <Stack.Screen name="Search" component={SearchScreen}  />

            </Stack.Navigator>
        </NavigationContainer>
    )
}