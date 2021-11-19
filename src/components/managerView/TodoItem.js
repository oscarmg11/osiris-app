import React, { useEffect, useState } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import Alert from '../Alert';
import styles from '../../styles/ManagerScreenStyles';
import { url, messageServerError, messageTokenError } from '../../../app.json'

const TodoItem = ({ todo, updateEmployees, employee }) => {

    const [token, setToken] = useState("");
    const [collapsibleTodo, setCollapsibleTodo] = useState(true);
    const [activeAlert, setActiveAlert] = useState(false);

    const seeTodo = () => { setCollapsibleTodo(!collapsibleTodo) }

    const postDeleteTodo = async (todo) => {
        let res = await axios({
            method: 'DELETE',
            url: `${url}/user/deleteTodo`,
            data: {
                userName: employee.userName,
                todoId: todo._id
            },
            headers: { 'authorization': token },
            timeout: 5000
        })
        return res.data.user
    }

    const deleteTodo = (todo) => {
        postDeleteTodo(todo).then( employee => updateEmployees(employee) )
        .catch( (e) => alert(`${messageServerError}`))
    }

    useEffect(() => {         
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }        
        getTokenFromAsyncStorage()
    }, [])

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            if(value !== null) {
                return value
            }
        } catch(e) {
            alert(`${messageTokenError}`) 
        }
    }

    const openAlert = () => { setActiveAlert(true) }

    const closeAlert = () => { setActiveAlert(false) }

    const renderBtnDelete = () => (
        <RectButton
            style={styles.btnDeleteTodo}
            onPress={openAlert}
        >
            <Icon name="trash" color="white" size={30}/>
        </RectButton>
    )


    return (
        <>
        <Alert 
            title="ELIMINAR TAREA"
            body="¿Está seguro que desea eliminar esta tarea?"
            activeAlert={activeAlert}
            cancelFunction={closeAlert}
            okayFunction={() => deleteTodo(todo)}
        />
        <Swipeable
            renderLeftActions={renderBtnDelete}
            overshootLeft={false} 
        >
            <TouchableNativeFeedback  onPress={() => seeTodo(todo._id)}>
                <View style={styles.todoItemContainer}>                          
                    <Text style={styles.titleTodo}>{todo.title.toUpperCase()}</Text>
                    <Icon name="chevron-down" size={20} color="gray"/>                               
                </View>
            </TouchableNativeFeedback>
        </Swipeable>
        <Collapsible collapsed={collapsibleTodo}>
            <View style={{ paddingLeft: 15 }}>
                <Text style={styles.textItemEmployee}>{todo.todo}</Text>                    
            </View>
        </Collapsible>
        </>
    )
}

export default TodoItem
