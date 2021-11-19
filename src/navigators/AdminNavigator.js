import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import io from 'socket.io-client';

import AdminMapNavigator from './AdminMapNavigator';
import AdminUsersNavigator from './AdminUsersNavigator';
import AdminChatScreenNavigator from './AdminChatScreenNavigator';
import AdminPDFNavigator from './AdminPDFNavigator';
import AdminBuyNavigator from './AdminBuyNavigator';

import { url } from '../../app.json'
import { appContext } from '../../App'

const Tab = createBottomTabNavigator();

const PushNotification =  require('react-native-push-notification');

function AdminNavigator() {

  const context = useContext(appContext)

  useEffect(() => { 
    let newSocket = io(`${url}`)
    newSocket.on('userConnected', (callback) => callback({userName: context.userName }))
    newSocket.on('alertPosition', (data) => {
      PushNotification.localNotification({
        message: `El empleado ${data.user} está leyendo códigos fuera de la sección`
      })
    })
  },[])

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
        
        component={AdminMapNavigator} />
 
      <Tab.Screen 
        name="CreateUser"        
        options={{
            tabBarLabel: 'Usuarios',
            tabBarIcon: ({color, size}) => {
                return <Icon name="users" color={color} size={size}/>
            }            
        }} 
        
        component={AdminUsersNavigator} />
        <Tab.Screen 
          name="Chat"        
          options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({color, size}) => {
                  return <Icon name="comment" color={color} size={size}/>
              }
          }}         
          component={AdminChatScreenNavigator} />

        <Tab.Screen 
          name="Buys"        
          options={{
              tabBarLabel: 'Ventas',
              tabBarIcon: ({color, size}) => {
                  return <Icon name="dollar" color={color} size={size}/>
              }
          }}         
          component={AdminBuyNavigator} />

        <Tab.Screen 
          name="PDF"        
          options={{
              tabBarLabel: 'Compras',
              tabBarIcon: ({color, size}) => {
                  return <Icon name="file-pdf-o" color={color} size={size}/>
              }
          }}         
          component={AdminPDFNavigator} />
       
    </Tab.Navigator>
  );
}

export default AdminNavigator