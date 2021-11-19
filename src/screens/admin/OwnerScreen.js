import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, BackHandler, Image} from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import Alert from '../../components/Alert';
import { url, messageServerError, messageTokenError } from '../../../app.json'
import styles from '../../styles/AdminScreenSytles';

const greenLogo = require('../../assets/logo-verde.png')

function OwnerScreen({ navigation }){

    const [activeAlert, setActiveAlert] = useState(false)
    const [token, setToken] = useState('')
    const [owners, setOwners] = useState([])

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

    const fetchOwners = async (token) => {
        let res = await axios({
            method: 'get',
            url: `${url}/user/?rol=owner`,
            headers: { 'authorization': token }
        })                
        return res.data 
    }

    useEffect(() => {
        
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            
        }
        getTokenFromAsyncStorage()
    },[])

    const navigateToMap = (owner) => { 
        navigation.navigate('Map', { owner })
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setActiveAlert(true)           
                return true
            }
            if(token !== ""){
                fetchOwners(token).then(({users}) => {
                    setOwners(users)
                }).catch( (e) => {
                    console.log(e)
                    if(token !== ""){alert(`${messageServerError}`)}
                })
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);                        
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },[token])
    )

    const closeAlert = () => { setActiveAlert(false) }

    const handleAlert = () => {
        closeAlert()
        navigation.navigate('Login')
    } 

    return (
        <View style={styles.btnOwnersContainer}>
            <Alert 
                activeAlert={activeAlert}
                title={'CERRAR SESIÓN'}
                body={'¿Está seguro que desea cerrar sesión?'}
                cancelFunction={closeAlert}
                okayFunction={handleAlert}
            />
            <Image 
                source={greenLogo}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.listContainerBtnOwners}>
                <FlatList 
                    data={owners}
                    extraData={owners}
                    renderItem={ ({item}) => (
                        <Button
                            onPress={() => { navigateToMap(item) }}
                            style={styles.btnOwner}
                        >
                            <Text style={{ color: 'white' }}>{item.userName}</Text>
                        </Button>
                     ) }
                    keyExtractor={ item => item._id }
                    contentContainerStyle={{ alignItems: 'center' }}
                />
            </View>
        </View>
    )
}

export default OwnerScreen
