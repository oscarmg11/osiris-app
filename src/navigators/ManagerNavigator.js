import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';

import ChatScreenNavigator from '../navigators/ChatScreenNavigator';
import EmployeesScreen from '../screens/manager/EmployeesScreen';
import PlantsReportedScreen from '../screens/manager/PlantsReportedScreen';
import PlantsScreen from '../screens/manager/PlantsScreen';

import {appContext} from '../../App';
import { url } from '../../app.json';

const PushNotification =  require('react-native-push-notification');

const Tab = createBottomTabNavigator();

function ManagerNavigator() {

  useEffect(() => {
    let newSocket = io(`${url}`)   
    newSocket.on('userConnected', (callback) => callback({userName: context.userName }))
    newSocket.on('newMessage', (data) => {
      PushNotification.localNotification({
        message: `Tienes un nuevo mensaje de ${data.userName}.`
      })
    })
  },[])

  const context = useContext(appContext)

  return (
    <Tab.Navigator
        initialRouteName="Plants" 
        tabBarOptions={{
          style: {backgroundColor: 'rgb(0, 26, 0)'},
          activeTintColor: 'rgb(43, 184, 82)'
        }}       
    >
      <Tab.Screen 
        name="Plants"        
        options={{
            tabBarLabel: 'Plantas',
            tabBarIcon: ({color, size}) => {
                return <Icon name="pagelines" color={color} size={size}/>
            }            
        }}         
        component={PlantsScreen} />

      <Tab.Screen 
        name="Employees"        
        options={{
            tabBarLabel: 'Empleados',
            tabBarIcon: ({color, size}) => {
                return <Icon name="user" color={color} size={size}/>
            }
        }}         
        component={EmployeesScreen} />

        <Tab.Screen 
          name="Reports"        
          options={{
              tabBarLabel: 'Reportes',
              tabBarIcon: ({color, size}) => {
                  return <Icon name="warning" color={color} size={size}/>
              }
          }}         
          component={PlantsReportedScreen} />

        <Tab.Screen 
        name="Chat"        
        options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, size}) => {
                return <Icon name="comment" color={color} size={size}/>
            },
            tabBarVisible: context.tabBarVisibleforQR
        }}         
        component={ChatScreenNavigator} />     
    </Tab.Navigator>
  );
}

export default ManagerNavigator