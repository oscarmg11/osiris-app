import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import TodosScreen from '../screens/employee/TodosScreen';
import ChatHelpTodoScreen from '../screens/employee/ChatHelpTodoScreen';

const TodoScreenNavigator = () => {
    return(        
        <Stack.Navigator initialRouteName="Todos" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Todos" component={TodosScreen}/>
            <Stack.Screen name="ChatHelp" component={ChatHelpTodoScreen}/>
        </Stack.Navigator>                    
    )
}

export default TodoScreenNavigator;