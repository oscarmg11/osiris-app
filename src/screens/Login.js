import React, { useState, useContext } from 'react';
import { Text, View, TextInput, ActivityIndicator, Image } from 'react-native';
import { Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {appContext} from '../../App';

import styles from '../styles/LoginScreenStyles';
import {url, messageServerError, messageTokenError} from '../../app.json'

const whiteLogo = require('../assets/logo-blanco.png');
const passwordIcon = require('../assets/password-lock-icon.png');
const usernameIcon = require('../assets/username-icon.png');

function Login({navigation}){

    const context = useContext(appContext)

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errLogging, setErrLogging] = useState(false)
    const [logging, setLogging] = useState(false)
    const [placeholderUserName, setPlaceholderUserName] = useState(true)
    const [placeholderPasword, setPlaceholderPassword] = useState(true)

    const changeUserName = (e) => {
        let { text } = e.nativeEvent
        setUserName( text )
        if(errLogging){ setErrLogging(false) }
    }

    const changePassword = (e) => {
        let { text } = e.nativeEvent
        setPassword( text )
        if(errLogging){ setErrLogging(false)}
    }

    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem('@token', token)
        } catch (e) {
            alert(`${messageTokenError}`)
        }
    }

    const userNameInputFocused = () => { setPlaceholderUserName(false) }

    const userNameInputNotFocused = () => { setPlaceholderUserName(true) }

    const passwordInputFocused = () => { setPlaceholderPassword(false) }

    const passwordInputNotFocused = () => { setPlaceholderPassword(true) }

    const fetchUser = async () => {
        let response = await axios({
            method: 'POST',
            url: `${url}/user/login`, 
            data: { userName, password },
            timeout: 5000
        })
        return response.data
    }
    
    const signIn = () => {
        setLogging(true)
        fetchUser().then(({ logged, user, token }) => {
            if(logged && token){
                setToken(token) 
                setLogging(false)
                setUserName('')
                setPassword('')
                switch(user.rol){ 
                    case 'admin':
                        context.dispatchUserName({ type: 'SET', value: userName })
                        context.dispatchId({ type: 'SET', value: user.id })
                        navigation.navigate('Admin') 
                        break;
                    case 'owner':
                        context.dispatchUserName({ type: 'SET', value: userName })
                        context.dispatchId({ type: 'SET', value: user.id })
                        navigation.navigate('Owner') 
                        break;
                    case 'manager':
                        context.dispatchUserName({ type: 'SET', value: userName })
                        context.dispatchId({ type: 'SET', value: user.id })
                        navigation.navigate('Manager', {screen: 'Plants'})
                        break;
                    case 'employee':
                        context.dispatchSection({ type: 'SET', value: user.section })
                        context.dispatchId({ type: 'SET', value: user.id })
                        context.dispatchUserName({ type: 'SET', value: userName })
                        context.dispatchTodos({ type: 'SET', value: user.todos })
                        context.dispatchPlants({ type: 'SET', value: user.plants })
                        context.dispatchMissingPlants({ type: 'SET', value: user.missingPlants })
                        navigation.navigate('Employee',{screen:'Home'})
                        break;
                }
            }else{ setErrLogging(true); setLogging(false) } 
        }).catch((e) => {
            setLogging(false)
            if(e.response.status === 400){ return alert(e.response.data) }
            alert(`${messageServerError}`)
        })
        
    }

    return(
        <View style={styles.body}>
            <View style={styles.imgLogoContainer}>
                <Image 
                    source={whiteLogo}
                    style={styles.imgWhiteLogo}
                    resizeMode="contain"
                />
            </View>                        
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Image 
                        source={usernameIcon}
                        resizeMode="contain"
                        style={styles.inputIcon}
                    />
                    <View style={styles.placeholderContainer}>
                        {placeholderUserName && userName === "" && <Text style={styles.placeholder}>USUARIO</Text>}
                    </View>                    
                    <TextInput 
                        style={styles.input}                                                 
                        value={userName}
                        onChange={changeUserName}
                        onFocus={userNameInputFocused}
                        onBlur={userNameInputNotFocused}/>
                </View>
                <View style={styles.inputContainer}>
                    <Image 
                        source={passwordIcon}
                        resizeMode="contain"
                        style={styles.inputIcon}
                    />
                    <View style={styles.placeholderContainer}>                        
                        {placeholderPasword && password === "" && <Text style={styles.placeholder}>CONTRASEÑA</Text>}
                    </View>
                    <TextInput 
                        style={styles.input}                         
                        value={password}                        
                        onChange={changePassword}
                        secureTextEntry
                        onFocus={passwordInputFocused}
                        onBlur={passwordInputNotFocused}/>
                </View>                
            </View>
            <View style={styles.btnContainer}> 
                <Button 
                    primary 
                    small 
                    style={styles.btnLogin}
                    onPress={signIn}
                    disabled={(userName !== '' && password !== '') ? false : true}>
                    <Text style={styles.btnTextLogin}>INICIAR SESIÓN</Text>
                </Button>
                {errLogging && <Text style={styles.errorLabel}>Usuario o contraseña incorrectos</Text>}
                {logging && <ActivityIndicator color="green" size="large"/>}
            </View>            
        </View>
    );  
}

export default Login;