import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from '../screens/owner/MapScreen'
import InfoSectionScreen from '../screens/admin/InfoSectionScreen'

const Stack = createStackNavigator();

const OwnerNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Map" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Map" component={MapScreen}/>
            <Stack.Screen name="InfoSection" component={InfoSectionScreen}/>
        </Stack.Navigator> 
    )
}

export default OwnerNavigator
