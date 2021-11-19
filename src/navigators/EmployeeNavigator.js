import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';

import QRScannerScreen from '../screens/employee/QRScannerScreen'; 
import TodoScreenNavigator from './TodoScreenNavigator';
const PushNotification =  require('react-native-push-notification');

import {appContext} from '../../App';
import { url } from '../../app.json';

const Tab = createBottomTabNavigator();

function EmployeeNavigator() {

  const context = useContext(appContext)

  useEffect(() => {
    let newSocket = io(`${url}`)   
    newSocket.on('userConnected', (callback) => callback({userName: context.userName }))
    newSocket.on('newTodo', (data) => {
      console.log(data)
      context.dispatchTodos({ type: 'ADD', value: data.todo })
      PushNotification.localNotification({
        message: "Ha llegado una nueva tarea, revisala."
      })
    })
    newSocket.on('newMessage', () => {
      PushNotification.localNotification({
        message: "Tienes un nuevo mensaje."
      })
    })
  },[])

  return (
    <Tab.Navigator
        initialRouteName="Home" 
        tabBarOptions={{
          style: {backgroundColor: 'rgb(0, 26, 0)'},
          activeTintColor: 'rgb(43, 184, 82)'
        }}       
    >
      <Tab.Screen 
        name="Home"        
        options={{
            tabBarLabel: 'QR',
            tabBarIcon: ({color, size}) => {
                return <Icon name="qrcode" color={color} size={size}/>
            },
            tabBarVisible: context.tabBarVisibleforQR
        }} 
        
        component={QRScannerScreen} />
      <Tab.Screen 
        name="Tasks"        
        options={{
            tabBarLabel: 'TAREAS',          
            tabBarIcon: ({color, size}) => {
                return <Icon name="tasks" color={color} size={size}/>
            },
            tabBarVisible: context.tabBarVisibleforQR
        }} 
        
        component={TodoScreenNavigator} />     
    </Tab.Navigator>
  );
}

export default EmployeeNavigator