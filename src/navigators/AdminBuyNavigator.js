import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BuysScreen from '../screens/admin/BuysScreen'
import CreateBuyScreen from '../screens/admin/CreateBuyScreen'
import InfoTableBuys from '../screens/admin/InfoTableBuys'

const Stack = createStackNavigator();

const AdminBuyNavigator = () => {

    return(        
        <Stack.Navigator initialRouteName="Buys" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Buys" component={BuysScreen}/>
            <Stack.Screen name="CreateBuy" component={CreateBuyScreen}/>   
            <Stack.Screen name="TableBuys" component={InfoTableBuys}/>                       
        </Stack.Navigator>                    
    )
}

export default AdminBuyNavigator;