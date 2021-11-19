import React, { useEffect, useState, useContext,useRef } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableNativeFeedback } from 'react-native'
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Player } from '@react-native-community/audio-toolkit'; 

import styles from '../../styles/ManagerScreenStyles'
import stylesAdmin from '../../styles/AdminScreenSytles'
import { url } from '../../../app.json';
import { appContext } from '../../../App';

const ChatScreen = ({ route }) => {    

    const context = useContext(appContext)

    const ScrollViewRef = useRef(null);

    const [chat, setChat] = useState([])
    const [socket, setSocket] = useState({})
    const [userDestination, setUserDestination] = useState('')    

    
    const renderMonthSpanish = (month) => {
        switch(month){
            case 'Jan':
                return 'Ene'            
            case 'Apr':
                return 'Abr'
            case 'Aug':
                return 'Ago'
            default:
                return month
        }
    }

    const initializaSocket = (chatObject) => {
        let newSocket = io(`${url}`)        
        newSocket.on('userConnected', (callback) => callback({userName: context.userName }))
        newSocket.emit('userConnectedToChat', {chatFrom: chatObject.from}, (data) => { setChat(data.chat) })
        newSocket.on('newMessage', (data)=> {                       
            setChat(data) 
        })
        setSocket(newSocket) 
    }

    useEffect(() => {
        let { chatObject } = route.params
        setUserDestination(chatObject.from)
        initializaSocket(chatObject)
        ScrollViewRef.current.scrollToEnd()       
    }, [])

    useEffect(() => {
        ScrollViewRef.current.scrollToEnd()
    }, [chat])

    const playAudioMessage = (audioURI) => {
        let newPLayer = new Player(audioURI, {
            autoDestroy: false
        })
        newPLayer.play()
    }
    

    return (
        <KeyboardAvoidingView behavior="heigth" style={styles.flex1} enabled>
                <View style={styles.titleChatContainer}>
                    <Text style={styles.titleChat}>Preguntas</Text> 
                </View>
                <ScrollView
                    style={stylesAdmin.chat}
                    ref={ScrollViewRef}
                > 
                    {chat.map(message => (                        
                        <View 
                            style={message.userName === context.userName ? styles.messageContainerRight : styles.messageContainerLeft} 
                            key={message.date + Math.random().toString()}
                        >
                        {message.userName !== userDestination &&(
                            <View style={styles.userIconChatContainer}>
                                <Icon name="user" color="white" size={20} />
                            </View>
                        )}                            
                        <View style={styles.messageBorder}>
                            {message.typeMessage === "audio" ? (
                                <TouchableNativeFeedback onPress={() => playAudioMessage(message.message)}>
                                    <View style={styles.iconPlayAudioMessageContainer}>
                                        <Icon name="play" color="black" size={15}/>
                                        <Text style={{ marginLeft: 10 }}>Audio</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            ): (
                                <Text>{message.message}</Text>
                            )}
                            <Text style={styles.messageDateText}>{`${renderMonthSpanish(message.date.split(' ')[1])} ${message.date.split(' ')[2]} ${message.date.split(' ')[4].split(':')[0]}:${message.date.split(' ')[4].split(':')[1]}`}</Text>
                        </View>                            
                    </View>
                    ))}
                </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen
