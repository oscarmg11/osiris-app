import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PDFCreateScreen from '../screens/admin/PDFCreateScreen'
import PDFScreen from '../screens/admin/PDFScreen'
import PDFReader from '../screens/admin/PDFReader'

const Stack = createStackNavigator();

const AdminPDFNavigator = () => {

    return(        
        <Stack.Navigator initialRouteName="PDF" screenOptions={{headerShown: false}}>
            <Stack.Screen name="PDFCreate" component={PDFCreateScreen}/>
            <Stack.Screen name="PDF" component={PDFScreen}/>
            <Stack.Screen name="PDFreader" component={PDFReader}/>
        </Stack.Navigator>                    
    )
}

export default AdminPDFNavigator;