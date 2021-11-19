import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; 

import OwnerMapNavigator from './OwnerMapNavigator';


const Tab = createBottomTabNavigator();


function OwnerNavigator() {

  return (
    <Tab.Navigator
        initialRouteName="Map" 
        tabBarOptions={{
          style: {backgroundColor: 'rgb(0, 26, 0)'},
          activeTintColor: 'rgb(43, 184, 82)'
        }}       
    >
      <Tab.Screen 
        name="Map"        
        options={{
            tabBarLabel: 'Mapa',
            tabBarIcon: ({color, size}) => {
                return <Icon name="map" color={color} size={size}/>
            }            
        }} 
        
        component={OwnerMapNavigator} />
       
    </Tab.Navigator>
  );
}

export default OwnerNavigator