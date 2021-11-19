import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OwnerScreen from '../screens/admin/OwnerScreen'
import MapScreen from '../screens/admin/MapScreen'
import InfoSectionScreen from '../screens/admin/InfoSectionScreen'
import NewSectionsScreen from '../screens/admin/NewSectionsScreen'

const Stack = createStackNavigator();

const AdminMapNavigator = () => {

    return(        
        <Stack.Navigator initialRouteName="Owners" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Owners" component={OwnerScreen}/>
            <Stack.Screen name="Map" component={MapScreen}/>
            <Stack.Screen name="InfoSection" component={InfoSectionScreen}/>
            <Stack.Screen name="SaveSections" component={NewSectionsScreen}/>
        </Stack.Navigator>                    
    )
}

export default AdminMapNavigator;