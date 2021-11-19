import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

import Weather from '../../components/Weather';
import styles from '../../styles/EmployeeScreenStyles';
import TodoItem from '../../components/employeeView/TodoItem'; 

import {appContext} from '../../../App';

function TodosScreen({ navigation }){

    const context = useContext(appContext);

    const [todos, setTodos] = useState([]); 
    const [userName, setUserName] = useState("");     

    const updateTodos = (todos) => {
        context.dispatchTodos({ type: 'SET', value: todos })
        setTodos(todos)        
    }

    useEffect(() => {        
        setTodos(context.todos)
        setUserName(context.userName)                        
    }, [context.todos]) 

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('Home')            
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);                        
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },[])
    )

    const gotoChatHelp = () => {
        context.dispatchTabBarVisibleforQR({ type: 'SET', value: false })        
        navigation.navigate('ChatHelp')
    }   
    

    return(        
        <View style={styles.body}>
            < Weather position="left"/>
            <View style={styles.helpBtnContainer}>
                <Button
                    style={styles.btnHelp}
                    onPress={gotoChatHelp}
                >
                    <Icon name="question" color="white" size={20}/>
                </Button>
            </View>
            <View style={styles.flatListTodos}>
                <FlatList 
                    data={todos}
                    extraData={context.todos}
                    renderItem={ ({item}) => (
                        !item.status && <TodoItem todo={item} userName={userName} updateTodos={updateTodos}/>
                    ) }
                    keyExtractor={item => item._id + Math.random().toString() }              
                /> 
            </View>
                       
        </View>
    )
}

export default TodosScreen;