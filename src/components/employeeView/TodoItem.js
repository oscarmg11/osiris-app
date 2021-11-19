import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, Modal, FlatList, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from '../../styles/EmployeeScreenStyles'
import {url, messageServerError, messageTokenError} from '../../../app.json';

const checkIcon = require('../../assets/check-icon.png')
const regarIcon = require('../../assets/regar.png')
const cortarIcon = require('../../assets/podar.png')
const fertilizarIcon = require('../../assets/fertilizante.png')

function TodoItem({todo, userName, updateTodos}){
    
    const [token, setToken] = useState(""); 
    const [fullImage, setFullImage] = useState(false); 
    const [fullVideo, setFullVideo] = useState(false); 
    const [videoPaused, setVideoPaused] = useState(false); 
    const [uriVideo, setUriVideo] = useState(''); 
    const [uriImg, setUriImg] = useState(''); 
    
    const todoCompleted = () => {
        Alert.alert(
            'Completar tarea',
            '¿Está seguro que ha terminado esta tarea?. De no ser así, ya no podrá verla de nuevo',
            [            
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: () => deleteTodo()
            },
            ],
            {cancelable: true},
        );
    }

    const closeFullVideo = () => { setFullVideo(false) }

    const closeFullImg = () => { setFullImage(false) }

    const seeFullVideo = (uri) => {
        setFullVideo(true)
        setUriVideo(uri)
    }

    const seeFullImg = (uri) => {
        setFullImage(true)
        setUriImg(uri)
    }

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

    useEffect(() => {       
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }
        getTokenFromAsyncStorage()
    },[])

    const deleteTodo = () => {
        fetchToDeleteTodo().then( ({todos}) => {
            console.log(todos)
            updateTodos(todos)
        }).catch( () =>  alert(`${messageServerError}`))
    }

    const fetchToDeleteTodo = async () => { 
        let response = await axios({
            method: 'PUT',
            url: `${url}/user/completeTodo`, 
            data: {todoId: todo._id, userName},
            headers: { 'authorization': token },
            timeout: 5000
        })                        
        return response.data  
    }

    const renderTodoIcon = (todoTitle) => {
        switch(todoTitle){
            case "Podar":
                return (
                    <Image 
                        source={cortarIcon}
                        style={{...styles.icon, marginRight: 0}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                )
            case "Regar":
                return (
                    <Image 
                        source={regarIcon}
                        style={{...styles.icon, marginRight: 0}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                )
            case "Fertilizar":
                return (
                    <Image 
                        source={fertilizarIcon}
                        style={{...styles.icon, marginRight: 0}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                )
        }
    }

    return(
        <>
        <Modal
            visible={fullVideo}
            animationType="none"
            onRequestClose={closeFullVideo}
        > 
            <View 
                style={styles.flex1}
            >
                <TouchableNativeFeedback onPress={closeFullVideo}>
                    <View style={styles.btnCloseVideoTodo}>
                        <Icon name="close" color="white" size={20}/>
                    </View>
                </TouchableNativeFeedback>
                <Video 
                    source={{uri: uriVideo}}
                    onError={(e) => console.log(e)}
                    style={styles.flex1}
                    resizeMode="contain"
                    repeat={true}
                    controls={true}
                />
            </View>
        </Modal>
        <Modal
            visible={fullImage}
            animationType="none"
            onRequestClose={closeFullImg}
        >
            <TouchableNativeFeedback onPress={closeFullImg}>
                <Image 
                    source={{uri: uriImg}}
                    style={styles.flex1}
                    repeat
                />
            </TouchableNativeFeedback>
        </Modal>
        <View style={styles.todosContainer}>
            <View style={styles.todoTitleContainer}>
                <View style={styles.todoIconContainer}>
                    {renderTodoIcon(todo.title)}
                </View>
                <Text style={styles.todoTitle}>{todo.title}</Text>
            </View>
            <View style={styles.lineTodoItem}></View>
            <Text style={styles.textTodo}>{todo.todo}</Text>
            <View>
                <FlatList 
                    data={todo.imgs}
                    extraData={todo.todo.imgs}
                    renderItem={ ({item}) => {
                        if(item.uri.split('.')[6] === "jpg"){
                            return(
                                <TouchableNativeFeedback onPress={() => seeFullImg(item.uri)}>
                                <Image 
                                    source={{ uri:  item.uri}}
                                    style={{ width :100, height: 100, marginHorizontal: 10 }}
                                />
                                </TouchableNativeFeedback>
                            )
                        }if(item.uri.split('.')[6] === "mp4"){
                            return(
                                <TouchableNativeFeedback onPress={() => seeFullVideo(item.uri)}>
                                    <View style={{ width: 100, height: 100, backgroundColor: 'rgb(210, 210, 210)', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                                        <Icon name="play" size={30} color="rgb(0, 26, 0)"/>
                                    </View>
                                </TouchableNativeFeedback>
                            )
                        }
                    }}
                    keyExtractor={ item => item._id}
                    horizontal
                />
            </View>
            <View style={styles.todoContainerBtn}>
                <Button
                    small
                    success
                    style={styles.todoBtn}
                    onPress={todoCompleted}
                >
                    <Image 
                        source={checkIcon}
                        resizeMode="contain"
                        style={styles.checkIcon}
                    />
                </Button>                            
            </View>
        </View>
        </>
    )
}

export default TodoItem;