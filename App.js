
import React, { useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root }  from 'native-base';
import NetInfo from "@react-native-community/netinfo";

import Login from './src/screens/Login';
import OwnerNavigator from './src/navigators/OwnerNavigator';
import EmployeeNavigator from './src/navigators/EmployeeNavigator';
import ManagerNavigator from './src/navigators/ManagerNavigator';
import AdminNavigator from './src/navigators/AdminNavigator';

import {reducer, reducerDocuments, reducerPlants, reducerChat } from './src/reducers/reducers'
import { messageInternetError } from './app.json'

const Stack = createStackNavigator();

export const appContext = React.createContext()

const App = () => {

  const [userName, dispatchUserName] = useReducer(reducer)
  const [todos, dispatchTodos] = useReducer(reducerChat)
  const [tabBarVisibleforQR, dispatchTabBarVisibleforQR] = useReducer(reducer)
  const [chats, dispatchChats] = useReducer(reducer, [])
  const [plants, dispatchPlants] = useReducer(reducer)
  const [localPlants, dispatchLocalPlants] = useReducer(reducerPlants, [])
  const [id, dispatchId] = useReducer(reducer)
  const [missingPlants, dispatchMissingPlants] = useReducer(reducer)
  const [isInternetReachable, dispatchIsInternetReachable] = useReducer(reducer)
  const [section, dispatchSection] = useReducer(reducer)
  const [documents, dispatchDocuments] = useReducer(reducerDocuments, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isInternetReachable){ alert(`${messageInternetError}`) }
      dispatchIsInternetReachable({ type: 'SET', value: state.isInternetReachable })
    });
    
    return () => unsubscribe()
  },[])

  return (
    <appContext.Provider
      value={{
        todos,
        userName,
        tabBarVisibleforQR,
        chats, 
        plants,  
        id,
        missingPlants,
        section,
        documents,
        isInternetReachable,
        localPlants,
        dispatchUserName, 
        dispatchTodos,
        dispatchTabBarVisibleforQR,
        dispatchChats,
        dispatchPlants,
        dispatchId,
        dispatchMissingPlants,
        dispatchSection,
        dispatchDocuments,
        dispatchLocalPlants
      }}
    >
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Employee" component={EmployeeNavigator} />
            <Stack.Screen name="Manager" component={ManagerNavigator} />
            <Stack.Screen name="Admin" component={AdminNavigator} />
            <Stack.Screen name="Owner" component={OwnerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </appContext.Provider>
  );
};

export default App;
