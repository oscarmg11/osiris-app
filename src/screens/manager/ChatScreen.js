import React, { useEffect, useState, useContext,useRef, useReducer } from 'react'
import { View, Text, TextInput, ScrollView, TouchableNativeFeedback, Vibration } from 'react-native'
import io from 'socket.io-client';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Player, Recorder } from '@react-native-community/audio-toolkit'; 
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import styles from '../../styles/ManagerScreenStyles'
import { url, messageTokenError, messageServerError } from '../../../app.json';
import { appContext } from '../../../App';
import { reducerChat } from '../../reducers/reducers'


const ChatScreen = ({ route }) => {   

    
    const [chat, dispatchChat] = useReducer(reducerChat, [])

    const context = useContext(appContext)

    const ScrollViewRef = useRef(null);

    const [socket, setSocket] = useState({})
    const [message, setMessage] = useState('')
    const [ audioURI, setAudioURI ] = useState('')  
    const [ token, setToken ] = useState('')  
    const [userDestination, setUserDestination] = useState('')
    const [ recording, setRecording ] = useState(false)
    const [ endRecording, setEndRecording ] = useState(false)
    const [ mayStopRecording, setMayStopRecording ] = useState(false)
    const [ recorder, setRecorder ] = useState(null)
    const [ player, setPlayer ] = useState(null)    

    const sendMessage = () => {        
        if(message !== ""){            
            socket.emit('messageFromManager', {
                userName: context.userName,
                from: userDestination,
                message,
                date: Date(Date.now()).toString(),
                typeMessage: 'text'
            })
            setMessage('')            
        }
    }

    const sendAudioMessage = (audioURI) => {
        socket.emit('messageFromManager', {
            userName: context.userName,
            from: userDestination,
            message: audioURI,
            date: Date(Date.now()).toString(),
            typeMessage: 'audio'
        })
        deleteAudio()
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

    const createFormData = () => {
        let data = new FormData();

        data.append('audio', {
            type: 'audio/mp4',
            uri: `file://${audioURI}`,
            name: `${context.userName.replace(/\s+/g, '-')}_audio_${new Date().toISOString().replace(/:/g, '-')}.mp4`
        })
        
        return data;
    }
    
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

    const handleInput = (e) => {
        let { text } = e.nativeEvent
        setMessage(text)
    }

    const initializaSocket = (chatObject) => {
        let newSocket = io(`${url}`)        
        newSocket.on('userConnected', (callback) => callback({userName: context.userName }))
        newSocket.emit('userConnectedToChat', {chatFrom: chatObject.from}, (data) => { dispatchChat({ type: 'SET', value: data.chat })  })
        newSocket.on('newMessage', (data)=> {  dispatchChat({ type: 'ADD', value: data })  })
        setSocket(newSocket) 
    }

    useEffect(() => {
        let { chatObject } = route.params
        setUserDestination(chatObject.from)
        initializaSocket(chatObject)
        ScrollViewRef.current.scrollToEnd()
        context.dispatchTabBarVisibleforQR({ type: 'SET', value: false }) 
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }
        getTokenFromAsyncStorage()  
        return () => {
            context.dispatchTabBarVisibleforQR({ type: 'SET', value: true }) 
        }
        
    }, [])

    useEffect(() => {
        ScrollViewRef.current.scrollToEnd()
    }, [chat])

    const startRecording = () => {
        Vibration.vibrate(100)
        setRecording(true)
        let newRecorder = new Recorder('audio.mp4',{
            bitrate: 256000,
            channels: 2,
            sampleRate: 44100,
            format: 'mp4',
            encoder: 'mp4'
        })
        newRecorder.record()
        setRecorder(newRecorder)
        setTimeoutToStopRecording()
    }

    const handleBtnRecord = () => {
        if(!endRecording){
             if(!recording){ startRecording()  }
             else{
                 if(mayStopRecording){ endRecord() }
             }
        }
        else{ sendAudio() }
    }

    const setTimeoutToStopRecording = () => {
        setTimeout(() => {
            setMayStopRecording(true)
        }, 1000);
    }

    const endRecord = () => {
        setEndRecording(true)
        setAudioURI(recorder.fsPath)
        recorder.stop()
        let newPLayer = new Player('audio.mp4', {
            autoDestroy: false
        })
        setPlayer(newPLayer)
    }

    const sendAudio = () => {
        let formData = createFormData()
        fetchAudio(formData).then(({audioURI}) => {
            sendAudioMessage(audioURI)
        }).catch((e) => {
            alert(`${messageServerError}`)
        })
    }

    const fetchAudio = async (data) => {
        const res = await axios({
            url: `${url}/user/audio`,
            data,
            headers: { 
                'Content-Type': 'multipart/form-data',
                'authorization': token
            },
            timeout: 5000,
            method: 'POST'
        })
        return res.data
    }

    const deleteAudio = () => {
        setAudioURI('')
        setEndRecording(false)
        setRecording(false)
        setMayStopRecording(false)
    }

    const playAudio = () => { player.play() }

    const playAudioMessage = (audioURI) => {
        let newPLayer = new Player(audioURI, {
            autoDestroy: false
        })
        newPLayer.play()
    }
    

    return (
        <View  
            style={styles.chatContainer} 
        >
                <View style={styles.titleChatContainer}>
                    <Text style={styles.titleChat}>Preguntas</Text> 
                </View>
                <View style={styles.bodyChat}>
                    <ScrollView
                        style={styles.styles1}
                        ref={ScrollViewRef}
                    > 
                        {chat.map(message => (                         
                            <View 
                                style={message.userName === context.userName ? styles.messageContainerRight : styles.messageContainerLeft}
                                key={message.date + Math.random().toString()}
                            >
                            {message.userName !== context.userName &&(
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
                </View>                                                         
                <View style={styles.inputContainerChat}> 
                {recording ? (
                    <View style={{...styles.inputChatContainer, paddingLeft: 20}}>
                        {endRecording ? (
                            <TouchableNativeFeedback onPress={playAudio}>
                                <View style={styles.audioChatContainer}>
                                    <Icon name="play" color="white" size={20} />
                                </View>
                            </TouchableNativeFeedback>
                        ): (
                            <Text style={styles.recordingText}>Grabando</Text>
                        )}
                    </View>
                ): (
                    <View style={styles.inputChatContainer}>
                        <TextInput 
                            style={styles.inputChat}
                            placeholder="Escribe un mensaje"
                            multiline
                            value={message}
                            onChange={handleInput} 
                            blurOnSubmit={true}
                            returnKeyType="default"                                        
                        />
                        <Button
                            style={styles.btnSend}
                            onPress={sendMessage}
                        >
                            <Icon name="send" color="white" size={15}/>
                        </Button>
                    </View>
                )}
                {endRecording && (
                     <TouchableNativeFeedback onPress={deleteAudio}>
                        <View style={{...styles.btnRecordAudio, marginRight: 10}}>
                            <Icon name="trash" color="white" size={15}/>
                        </View>
                    </TouchableNativeFeedback>
                )}
                <TouchableNativeFeedback  onPress={handleBtnRecord} >
                    <View style={styles.btnRecordAudio}>
                        {endRecording ? (
                            <Icon name="send" color="white" size={15}/>
                        ): (
                            recording ? (
                                <Icon name="stop" color="white" size={15}/>
                            ): (
                                <Icon name="microphone" color="white" size={15}/>
                            )
                        )}
                    </View>
                </TouchableNativeFeedback>
                
            </View>                
        </View>
    )
}

export default ChatScreen
