import React, { useState, useEffect, useRef} from 'react'
import { View, Dimensions, Text } from 'react-native'
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { isPointInPolygon, getCenter } from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import styles from '../../styles/AdminScreenSytles';
import { url, messageServerError, messageTokenError, messageLocationError } from '../../../app.json'

const markerIcon = require('../../assets/marker-icon.png')

const { width } = Dimensions.get('window') 

function Map({ numberSection, 
                coordinatesMarker, 
                setCoordinatesMarker,
                numberEdited,
                sectionsId,
                setNumberEdited,
                owner,
                sections,
                openLoader,
                closeLoader,
                editing,
                activeModalPolygon,
                navigation 
            }){  

    const markerRef = useRef([])  
    const mapRef = useRef(null)  
    
    const [token, setToken] = useState("");
    const [markersSection, setMarkersSection] = useState([]);
    const [markerCoordinates, setMarkerCoordinates] = useState({});
    const [initialCoords, setInitialCoords] = useState({
        latitude: 25.505,
        longitude: -103.510555556,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });

    const moveMarker = (e,lastCoordinate) => {        
        let { coordinate  } = e.nativeEvent
        let newMarkersSection = [...markersSection]
        let newCoordinates = [...coordinatesMarker]
        let index = newMarkersSection.findIndex( coordinate => coordinate._id === lastCoordinate._id)
        newMarkersSection.splice(index, 1, {...lastCoordinate, ...coordinate})
        newCoordinates[numberEdited -1] = newMarkersSection
        setMarkersSection(newMarkersSection)
        setCoordinatesMarker(newCoordinates)
    }

    const showCoordinates = (e) => {
        let { coordinate  } = e.nativeEvent
        setMarkerCoordinates(coordinate)
    }

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
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
        }
        getTokenFromAsyncStorage()
        getCurrentPosition()
    },[])

    useEffect(() => {
        setMarkersSection(coordinatesMarker[numberEdited - 1])
    },[numberEdited, coordinatesMarker])

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

    const renderMarkers = () => {
        let markersToRender = []
        //for(let i = numberEdited - 1; i < numberEdited; i++){
        if(markersSection){
            for(let i = 0; i < markersSection.length; i++){
                markersToRender.push(
                    <Marker                        
                        coordinate={{
                            latitude: markersSection[i].latitude,
                            longitude: markersSection[i].longitude
                        }}
                        draggable
                        onDrag={(e) => { showCoordinates(e);  markerRef.current[i].showCallout()}}
                        onDragEnd={(e) => { moveMarker(e,markersSection[i]) }}
                        onPress={() => markerRef.current[i].showCallout()}
                        onCalloutPress={() => markerRef.current[i].hideCallout()}
                        key={markersSection[i]._id}
                        icon={markerIcon}
                        ref={ marker => markerRef.current[i] = marker }
                    >      
                        <Callout >
                            <View style={{
                               justifyContent: 'center',
                               alignItems: 'center',
                               width: width * 0.35
                            }}>
                                <Text style={{ fontFamily: 'Montserrat-Light' }}>lat: {Number(markerCoordinates.latitude).toFixed(7)}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Light' }}>lon: {Number(markerCoordinates.longitude).toFixed(7)}</Text>
                            </View>
                        </Callout>
                    </Marker> 
                )
            }    
        }        
        //}
        return markersToRender;
    }

    const colorSections = (section) => {
        if(section){
            if(section.owner === owner._id){
                if(section.finishRead){ return 'rgba(0, 150, 0, 0.5)' }
                else{ return 'rgba(150, 0, 0, 0.5)' }
            }else{ return 'rgba(140, 140, 140, 0.5)' }
        }else{ return 'rgba(140, 140, 140, 0.5)' }
    }

    const checkPressOnPolygon = (section, i) => {
        if(!editing){
            if(section){
                if(owner._id === section.owner){
                    pressPolygon(i)
                }
            }
        }else{
            setNumberEdited(i+1)
        }
    }

    const renderPolygons = () => {
        let polygons = []
        for(let i = 0; i < coordinatesMarker.length; i++){
            polygons.push(
                <View key={sectionsId[i] || Math.random().toString()}>
                    {sections[i] && (
                        <Marker
                            coordinate={getCenter(coordinatesMarker[i])}
                            onPress={() => checkPressOnPolygon(sections[i], i)}
                        >
                            
                            <Text note style={styles.textSectionName}>
                                {sections[i].sectionName}
                            </Text>
                        </Marker>
                    )}
                    <Polygon
                        tappable
                        coordinates={coordinatesMarker[i]}
                        fillColor={colorSections(sections[i])}
                        onPress={() => checkPressOnPolygon(sections[i], i)}
                        style={{ zIndex: 1 }}
                    /> 
                </View>
            ) 
        }
        return polygons;
    }

    const pressPolygon = (index) => {
        openLoader()
        fetchInfo(sectionsId[index]).then(({ employees, plants, section }) => {
            closeLoader()
            navigation.navigate('InfoSection', { employees, plants, section })
        }).catch(() => {
            alert(`${messageServerError}`)
        })
    }

    const fetchInfo = async (id) => {
        let res = await axios({
            method: 'get',
            url: `${url}/section/info?id=${id}`,
            headers: { 'authorization': token }
        })
        return res.data
    }

    const onLongPress = (e) => {
        let isPolygon = false
        let numberPolygon = -1
        for(let i = 0; i < numberSection; i++){
            if(isPointInPolygon(e.nativeEvent.coordinate, coordinatesMarker[i])){
                isPolygon = true
                numberPolygon = i
            }
        }
        if(isPolygon){ activeModalPolygon(numberPolygon) }
    }

    const handleLongPress = (e) => {
        if(sections[ numberEdited - 1 ]){
            if(editing && owner._id === sections[ numberEdited - 1 ].owner){ onLongPress(e) }
        }else{
            if(editing ){ onLongPress(e) }
        }
    }

    const controlRenderMarkers = (e) => {
        if(sections[ numberEdited - 1 ]){
            if(editing && owner._id === sections[ numberEdited - 1 ].owner){ return renderMarkers(e) }
        }else{
            if(editing ){ return renderMarkers(e) }
        }
    }

    return (
        <View>
            <MapView 
                style={styles.map}
                initialRegion={initialCoords}
                onLongPress={handleLongPress}
                ref={mapRef}
                showsUserLocation
            >
                {controlRenderMarkers()}
                {coordinatesMarker.length !== 0 && renderPolygons()}              
            </MapView>           
        </View>
    )
}

export default Map
