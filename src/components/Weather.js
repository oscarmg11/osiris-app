import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Linking, TouchableNativeFeedback, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {url, messageServerError, messageTokenError} from '../../app.json';
import { appContext } from '../../App';

const { width ,height } = Dimensions.get('window')

const styles  = StyleSheet.create({
    containerRight: {
        width : width * 0.15,
        height: height * 0.08,
        backgroundColor : 'rgb(0, 26, 0)',
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    containerLeft: {
        width : width * 0.15,
        height: height * 0.08,
        backgroundColor : 'rgb(0, 26, 0)',
        position: 'absolute',
        top: 10,
        left: width * 0.05,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    text: {
        fontFamily: 'Montserrat-Light',
        color: 'white',
        fontSize: 12
    },
    icon: {
        width: 20,
        height: height * 0.04,
        marginRight: 10        
    }
})

const termIcon = require('../assets/thermometer.png')

function Weather({ position }){

    const urlToWeather = "https://www.google.com/search?sxsrf=ALeKk00AOaV2JJTyATMZdHOz6PVQH1HKMQ%3A1587505984865&ei=QGufXo2xNNKisAWLtJewBQ&q=clima&oq=clima&gs_lcp=CgZwc3ktYWIQAzIHCCMQJxCdAjIECAAQQzIECAAQQzIECAAQQzIECAAQQzIFCAAQgwEyBAgAEEMyAggAMgQIABBDMgUIABCDAToECAAQRzoHCCMQ6gIQJ1Dv9xFY5v4RYImCEmgBcAJ4AIABjAOIAYwDkgEDMy0xmAEAoAEBqgEHZ3dzLXdperABCg&sclient=psy-ab&ved=0ahUKEwiN0bnSwProAhVSEawKHQvaBVYQ4dUDCAw&uact=5"

    const context = useContext(appContext)

    const [temperature, setTemperature] = useState(0)
    const [token, setToken] = useState('')

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
            fetchTemperature(token).then(({temperature}) => {
                setTemperature(temperature)
            }).catch( (e) =>  console.log(e))//alert(`${messageServerError}`))
        } 
        getTokenFromAsyncStorage()
    }, [])   

    const fetchTemperature = async (token) => { 
        let response = await axios({
            method: 'GET',
            url: `${url}/user/temperature?userId=${context.id}`, 
            headers: { 'authorization': token },
            timeout: 5000
        }) 
        return response.data  
    }

    const openWeather = async () => {
        const supported = await Linking.canOpenURL(urlToWeather);
        if (supported) {
            await Linking.openURL(urlToWeather);
        } else {
            alert(`No se pudo abrir la aplicación del clima`);
        } 
    }

    return (
        <TouchableNativeFeedback onPress={openWeather}>
            <View style={position === "right" ? styles.containerRight : styles.containerLeft}>
                <Image 
                    source={termIcon}
                    style={styles.icon}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
                <Text style={styles.text}>{temperature} °C</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default Weather
