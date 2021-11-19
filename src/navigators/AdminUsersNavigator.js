import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BtnUsers from '../screens/admin/BtnUsers'
import Employees from '../screens/admin/Employees'
import Managers from '../screens/admin/Managers'
import Owners from '../screens/admin/Owners'
import NewUserScreen from '../screens/admin/NewUserScreen'

const Stack = createStackNavigator();

const AdminUsersNavigator = () => {

    return(        
        <Stack.Navigator initialRouteName="Users" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Users" component={BtnUsers}/>
            <Stack.Screen name="Employees" component={Employees}/>
            <Stack.Screen name="Managers" component={Managers}/>
            <Stack.Screen name="Owners" component={Owners}/>
            <Stack.Screen name="CreateUser" component={NewUserScreen}/>
        </Stack.Navigator>                    
    )
}

export default AdminUsersNavigator;