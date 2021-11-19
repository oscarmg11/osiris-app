import React, { useEffect, useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import ChatsScreen from '../screens/admin/ChatsScreen'
import ChatScreen from '../screens/admin/ChatScreen'
import { url } from '../../app.json';
import { appContext } from '../../App';

const Stack = createStackNavigator();

const ChatScreenNavigator = () => {

    const context = useContext(appContext)

    const [token, setToken] = useState("");
    const [chats, setChats] = useState([]);

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            if(value !== null) {
                return value
            }
        } catch(e) {
            alert('Ha sucedido un error. Intentalo más tarde') 
        }
    }

    useEffect(() => {        
        const fetchChats = async (token) => {
            let res = await axios({
                method: 'GET',
                url: `${url}/chat`,
                headers: { 'authorization': token }
            })                                     
            context.dispatchChats({ type: 'SET', value: res.data.chats })
            setChats(res.data.chats)
        }
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchChats(token)                
        }
        getTokenFromAsyncStorage() 
    },[])

    return(        
        <Stack.Navigator initialRouteName="Chats" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Chats" component={ChatsScreen}/>
            {chats.map( chat => (
                <Stack.Screen name={`Chat${chat.from}`} component={ChatScreen} key={chat._id}/>                
            ) )}            
        </Stack.Navigator>                    
    )
}

export default ChatScreenNavigator;