import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, BackHandler, Text } from 'react-native'
import MapView, { Polygon, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { getCenter } from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import styles from '../../styles/OwnerScreenStyles'
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';
import { url, messageServerError, messageTokenError, messageLocationError } from '../../../app.json'
import { appContext } from '../../../App'

function Map({ navigation }){

    const mapRef = useRef(null)  

    const context = useContext(appContext)

    const [token, setToken] = useState("");
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeAlert, setActiveAlert] = useState(false)
    const [initialCoords, setInitialCoords] = useState({
        latitude: 25.505,
        longitude: -103.510555556,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                let { latitude, longitude } = position.coords
                mapRef.current.animateToRegion({ ...initialCoords, latitude, longitude }, 100)
            },
            (error) => {
                alert(`${messageLocationError}`)
                return false
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
        );
    }

    useEffect(() => {
        const fetchSections = async (token) => {
            let res = await axios({
                method: 'get',
                url: `${url}/section/`,
                headers: { 'authorization': token }
            })
            return res.data
        }        
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchSections(token).then(({sections}) => {
                setSections(sections)
            }).catch( () => alert(`${messageServerError}`))
        }
        getCurrentPosition()
        getTokenFromAsyncStorage()
    },[])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setActiveAlert(true)           
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);                        
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },[])
    )

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

    const colorSections = (section) => {
        if(section.owner === context.id){
            if(section.finishRead){ return 'rgba(0, 150, 0, 0.5)' }
            else{ return 'rgba(150, 0, 0, 0.5)' }
        }else{ return 'rgba(140, 140, 140, 0.5)' }
    }

    const onPressPolygon = (section) => {
        if(section.owner === context.id){
            openLoader()
            fetchInfo(section._id).then(({ employees, plants, section }) => {
                closeLoader()
                navigation.navigate('InfoSection', {
                    employees,
                    plants,
                    section
                })
            }).catch(() => {
                alert(`${messageServerError}`)
            })
        }
    }

    const fetchInfo = async (id) => {
        let res = await axios({
            method: 'GET',
            url: `${url}/section/info?id=${id}`,
            headers: { 'authorization': token }
        })
        return res.data
    }

    const renderPolygons = () => {
        let polygons = []
        for(let i = 0; i < sections.length; i++){
            polygons.push(
                <View key={sections[i]._id}>
                <Marker
                    coordinate={getCenter(sections[i].coordinates)}
                    onPress={() => onPressPolygon(sections[i]) }
                >
                    <Text style={styles.textSectionName}>
                        {sections[i].sectionName}
                    </Text>
                </Marker>
                <Polygon
                    tappable
                    key={sections[i]._id}
                    coordinates={sections[i].coordinates}
                    fillColor={colorSections(sections[i]) }
                    onPress={() => onPressPolygon(sections[i]) }
                />  
                </View>
            ) 
        }
        return polygons;
    }

    const openLoader = () => { setLoading(true) }

    const closeLoader = () => { setLoading(false) }

    const closeAlert = () => { setActiveAlert(false) }

    const handleAlert = () => {
        closeAlert()
        navigation.navigate('Login')
    }

    return (
        <>
        <Loading active={loading}/>
        <Alert 
            activeAlert={activeAlert}
            title={'CERRAR SESIÓN'}
            body={'¿Está seguro que desea cerrar sesión?'}
            cancelFunction={closeAlert}
            okayFunction={handleAlert}
        />
        <View style={styles.mapContainer}>
            <MapView 
                style={styles.map}
                initialRegion={initialCoords}
                ref={mapRef}
                showsUserLocation
            >
                {sections.length !== 0 && renderPolygons()}              
            </MapView>           
        </View>
        </>
    )
}

export default Map
