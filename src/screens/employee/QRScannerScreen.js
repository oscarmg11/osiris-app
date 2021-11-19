import React, { useState, useEffect, useContext } from 'react';
import { View, Vibration, BackHandler, PermissionsAndroid, Image, Text, TouchableNativeFeedback } from 'react-native';
import { Button } from 'native-base';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { isPointInPolygon } from 'geolib'; 
import io from 'socket.io-client';

import Weather from '../../components/Weather';
import QRScanner from '../../components/employeeView/QRScanner';
import InfoQR from '../../components/employeeView/InfoQR';
import styles from '../../styles/EmployeeScreenStyles';
import {url, messageServerError, messageTokenError, messageLocationError, messageUpdateLocalPlant, messageGetLocalPlant} from '../../../app.json' 
import {appContext} from '../../../App';
import ReportPlant from '../../components/employeeView/ReportPlant';
import Alert from '../../components/Alert';

const addIcon = require('../../assets/add-icon.png')
const pencilIcon = require('../../assets/lapiz-icon.png')
const blackLogo = require('../../assets/logo-verde.png')
const stopIcon = require('../../assets/stop.png')
const playIcon = require('../../assets/play.png')

function QRScannerScreen({ navigation }){    

    const context = useContext(appContext)

    const [QRActive, setQRAtive] = useState(false);
    const [alertActive, setAlertActive] = useState(false);
    const [alertActiveMissingPlants, setAlertActiveMissingPlants] = useState(true);
    const [alertFinishActive, setAlertFinishActive] = useState(false);
    const [editInfoSelected, setEditInfoSelected] = useState(false)
    const [readStarted, setReadStarted] = useState(false);
    const [readFinished, setReadFinished] = useState(false);
    const [permissionLocation, setPermissionLocation] = useState(false);
    const [permissionCamera, setPermissionCamera] = useState(false);
    const [alertLocalPlants, setAlertLocalPlants] = useState(false);
    const [btnString, setBtnString] = useState("Iniciar Lectura");
    const [plant, setPlant] = useState({});
    const [dateStarted, setDateStarted] = useState(0);
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState(""); 
    const [idPlant, setIdPlant] = useState(""); 
    const [reads, setReads] = useState([]);
    const [ socket, setSocket ] = useState({})
    
    const editInfo = () => {
        setEditInfoSelected(!editInfoSelected) 
    }

    const statusReading = () => {
        if(btnString === "Iniciar Lectura"){            
            setDateStarted(Date.now())
            useQR()
            readFinished && setReadFinished(false)
        }else{   
            setAlertFinishActive(true)                                 
        }
    }

    const finishReading = () => { 
        fetchFinishReading().then(() => {
            setReadStarted(false)
            setReadFinished(true)
            setBtnString("Iniciar Lectura")
            setReads([])
            closeAlertFinish()
        }).catch( () =>  alert(`${messageServerError}`))
    } 

    const fetchFinishReading = async () => {
        let request = {
            reads,
            userName,
            dateStarted,
            dateFinished: Date.now()               
        }
        axios({
            method: 'PUT',
            url: `${url}/user/finishReading`, 
            data: request,
            headers: { 'authorization': token },
            timeout: 5000
        })
    }

    const useQR = () => {
        context.dispatchTabBarVisibleforQR({ type: 'SET', value: false })
        setQRAtive(true)               
    }

    const closeQRScanner = () => { 
        setQRAtive(false) 
        Vibration.vibrate(250)
    }

    const emitAlert = () => {
        socket.emit('alertPosition', { userName: context.userName })
    }

    const onReadQR = (data) => {
        closeQRScanner()
        context.dispatchTabBarVisibleforQR({ type: 'SET', value: true}) 
        setIdPlant(data)   
        if(context.isInternetReachable){
            fetchInfo(data)
        }else{
            setNewRead(data)
            setBtnString("Finalizar Lectura")
            setReadStarted(true) 
            let idx = context.localPlants.findIndex(plant => plant.id === data)
            if(idx >= 0){ setPlant(context.localPlants[idx]) }
            else{ setPlant({}) }
        }
    }

    const fetchInfo = (data) => {
        fetchInfoQR(data).then( ({plant, status}) => {
            if(status){ 
                setBtnString("Finalizar Lectura")
                setReadStarted(true) 
                setPlant(plant) 
                setNewRead(data)
            }
            else{ alert('Código no encontrado') } 
        }).catch( e => {
            if(e.response.status=== 400){ alert(e.response.data) }
            else{ alert(`${messageServerError}`) }
        })
    }

    const setNewRead = (plantId, latitude, longitude) => {
        let read = {
            lat: latitude,
            lng: longitude,
            date: Date.now(),
            plantId
        }
        let newRead = [...reads]
        let indexRead = newRead.findIndex( readDone => readDone.plantId === plantId )
        if(indexRead !== -1){
            newRead.splice(indexRead,1,read)
        }else{
            newRead.push(read)
        }
        setReads(newRead) 
    }

    const fetchInfoQR = async (id) => {
        let res = await axios({
            data: { plantsUser: context.plants },
            url: `${url}/plant/get?id=${id}`,
            headers: { 'authorization': token },
            timeout: 5000,
            method: 'PUT'
        })                              
        return res.data
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

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if(QRActive){
                    context.dispatchTabBarVisibleforQR({ type: 'SET', value: true})
                    setQRAtive(false)
                }else{
                    if(editInfoSelected){ setEditInfoSelected(false) }
                    else{ setAlertActive(true) }
                }             
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);                        
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },[editInfoSelected, QRActive])
    )

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permiso de ubicación',
              message: 'Necesitamos conocer tú ubicación',              
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionLocation(true)
          } else {
            alert('No se puede utilizar la apclicación debido a que no tiene permisos para obtener la ubicación')
          }
        } catch (err) {
          console.warn(err);
        }
    }

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Permiso de camera',
              message: 'Necesitamos poder acceder a la camara',              
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionCamera(true)
          } else {
            alert('No se puede utilizar la apclicación debido a que no tiene permisos para acceder a la camara')
          }
        } catch (err) {
          console.warn(err);
        }
    }

    const initializeSocket = () => {
        let newSocket = io(`${url}`)
        newSocket.on('userConnected', (callback) => callback({userName: context.userName }))
        setSocket(newSocket)
    }

    useEffect(() => {
        const callRequestLocationPermission = async () => {
            await requestLocationPermission()
            await requestCameraPermission()
        }
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }
        getTokenFromAsyncStorage()       
        callRequestLocationPermission()
        setUserName(context.userName)
        initializeSocket()
    },[])

    useEffect(() => {
        if(context.isInternetReachable){
            getLocalPlants().then( plants => {
                if(plants.length !== 0){
                    updateLocalPlants(plants)
                        .then(() => {
                            context.dispatchLocalPlants({ type: 'SET', value: [] })
                            setAlertLocalPlants(true)
                        })
                        .catch(() => alert(`${messageServerError}`))
                }
            })
        } 
    },[context.isInternetReachable])

    const getLocalPlants = async () => { 
        try {
            const value = await AsyncStorage.getItem('@plants')
            if(!value) {
                return []
            }
            return JSON.parse(value)
        } catch(e) {
            alert(`${messageGetLocalPlant}`)
        }
    }

    const updateLocalPlants = async (plants) => {
        let res = await axios({
            url: `${url}/plant/update`,
            method: 'PUT',
            data: {plants},
            timeout: 5000,
            headers: { 'authorization': token }
        })
        return res.data
    }


    const closeAlert = () => { setAlertActive(false) }

    const closeAlertFinish = () => { setAlertFinishActive(false) }

    const handleAlert = () => {
        closeAlert() 
        navigation.navigate('Login')  
    }

    const openQRReader = () => { 
        Geolocation.getCurrentPosition(
            (position) => {
                let { latitude, longitude } = position.coords
                let rightPosition = isPointInPolygon({latitude, longitude}, context.section)
                if(!rightPosition){
                    emitAlert()
                    alert('Tienes que estar dentro de la sección para poder realizar lecturas.')
                }else{
                    if(permissionLocation && permissionCamera){ statusReading()  }
                }
            },
            (error) => {
                alert(`${messageLocationError}`)
                return false
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
        );
    }

    const closeAlertMissingPlants = () => { setAlertActiveMissingPlants(false) }

    const closeAlertLocalPlants = () => setAlertLocalPlants(false)

    return(
        <View style={styles.body}>
            < Weather position="right"/>
            <Alert 
                activeAlert={alertActive}
                title={'CERRAR SESIÓN'}
                body={'¿Está seguro que desea cerrar sesión?'}
                cancelFunction={closeAlert}
                okayFunction={handleAlert}
            />
            <Alert 
                activeAlert={alertFinishActive}
                title={'TERMINAR LECTURA'}
                body={'¿Está seguro que desea terminar la lectura?'}
                cancelFunction={closeAlertFinish}
                okayFunction={finishReading}
            /> 
            <Alert 
                activeAlert={alertLocalPlants}
                title={'PLANTAS ACTUALIZADAS'}
                body={'Todas las plantas han sido actualizadas correctamente'}
                cancelFunction={closeAlertLocalPlants}
                okayFunction={closeAlertLocalPlants}
            /> 
            <Alert 
                activeAlert={alertActiveMissingPlants}
                title={'LECTURAS PENDIENTES'}
                body={context.missingPlants}
                cancelFunction={closeAlertMissingPlants}
                okayFunction={closeAlertMissingPlants}
            />           
            {QRActive && (
            <QRScanner
                onReadQR={onReadQR}
            />)}
            {!QRActive && (
                <View style={readStarted ? styles.infoContainer : styles.infoContainerFull}> 
                    <View style={styles.flex1}>
                        {readStarted ? (
                            <InfoQR 
                                plantRead={plant}                                            
                                editInfo={editInfo}
                                editInfoSelected={editInfoSelected}
                                idPlant={idPlant}
                            />
                            ) : (
                            <View style={styles.containerLogo}>
                                <Image 
                                    source={blackLogo}
                                    resizeMode="contain"
                                    style={styles.logo}
                                />
                                <TouchableNativeFeedback
                                    onPress={openQRReader}
                                >
                                    <View style={styles.btnStartReading}>
                                        <Image 
                                            source={playIcon}
                                            style={styles.icon}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                        <Text style={styles.textBtnStartReading}>INICIAR LECTURA</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                                            ) }
                    </View>                              
                </View>
            )}
            {!QRActive && readStarted && (
                <View style={styles.btnInfoPLantContainer}>
                    <View style={styles.btnContainer}>
                        <ReportPlant userName={userName}  plantid={plant._id}/>                    
                        <Button
                            primary
                            large
                            style={styles.btnInfoPlant}
                            onPress={useQR}
                        >
                            <Image 
                                source={addIcon}
                                resizeMode="contain"
                                style={styles.btnNextReadingQRIcon}
                            />
                        </Button>                                                                 
                        <Button
                            warning
                            small
                            onPress={editInfo}
                            style={styles.btnInfoPlant}
                        >
                            <Image 
                                source={pencilIcon}
                                resizeMode="contain"
                                style={styles.btnNextReadingQRIcon}
                            />
                        </Button>
                    </View>
                    <View style={styles.btnDoneReadingContainer}>
                        <TouchableNativeFeedback
                            onPress={() => { permissionLocation && permissionCamera && statusReading() }}
                        >
                            <View style={styles.btnEndReading}>
                                <Image 
                                    source={stopIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <Text style={styles.textBtnStartReading}>FINALIZAR</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            )}                                              
        </View>
    )
}

export default QRScannerScreen;