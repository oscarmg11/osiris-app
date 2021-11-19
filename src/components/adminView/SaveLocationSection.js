import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Button} from 'native-base';
import MapView, { Marker, Polygon } from 'react-native-maps';

import styles from '../../styles/AdminScreenSytles' 
import CoordinatesItem from './CoordinatesItem';
import { messageLocationError } from '../../../app.json'

const markerIcon = require('../../assets/marker-icon.png')

function SaveLocationSection({ 
        numberEdited,
        coordinates,
        setCoordinatesMarker,
        polygonToEdit
    }){

    const [markers, setMarkers] = useState([])
    const [position, setPosition] = useState({})
    const [watchID, setWatchID] = useState(0)

    const handleBtnUbications = () => {     
        let newMarkers = [...markers]
        newMarkers.push(position)
        setMarkers(newMarkers)
        let newCoordinates = [...coordinates]
        newCoordinates[numberEdited - 1] = newMarkers
        setCoordinatesMarker(newCoordinates)
    } 

    useEffect(() => {
        let ID = Geolocation.watchPosition(
            (position) => {
                let { latitude, longitude } = position.coords
                setPosition({ latitude, longitude })
            },
            (error) => {
                alert(`${messageLocationError}`)
            },
            { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 10000, 
                distanceFilter: 1, 
                forceRequestLocation: true,
                interval: 1500,
                fastestInterval: 1000 
            }
        );
        setWatchID(ID)
        return () => Geolocation.clearWatch(watchID)
    },[])

    useEffect(() => {
        let newMarkers = []
        if(markers.length === 0){
            newMarkers = [...coordinates[polygonToEdit]] 
            newMarkers.push(position)
        }
        else{ 
            newMarkers = [...markers] 
            newMarkers.splice(newMarkers.length - 1, 1, position)
        }
        setMarkers(newMarkers)
    },[position])

    const deleteCoordinate = lastCoordinate => {
        let newMarkers = [...markers]
        let index = newMarkers.findIndex( coordinate => coordinate.latitude === lastCoordinate.latitude && coordinate.longitude === lastCoordinate.longitude )
        newMarkers.splice(index, 1)
        setMarkers(newMarkers)
        let newCoordinates = [...coordinates]
        newCoordinates[numberEdited - 1] = newMarkers
        setCoordinatesMarker(newCoordinates)
    }

    const polygonToRender = () => {
        let coordinates = [...markers]
        coordinates.splice( coordinates.length - 1, 1 )
        return coordinates
    }

    return (
        <View style={styles.saveLocationContainer}>
        <Text style={styles.infoTitle}>SECCIÓN {numberEdited}</Text>
        <View style={styles.listCoordinatesEditSection}>
            {position.latitude && (
                <MapView 
                    style={styles.mapSaveLocation}
                    initialRegion={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    minZoomLevel={13}
                >
                    <Marker                        
                        coordinate={position}
                        icon={markerIcon}
                    />
                    {markers.length >= 2 && (
                        <Polygon 
                            coordinates={polygonToRender()}
                            fillColor="rgba(0, 26, 0, 0.5)"
                        />
                    )}
                </MapView>
            )}
            
            <FlatList 
                data={markers}
                extraData={markers}
                renderItem={ ({item, index}) => (
                    <CoordinatesItem 
                        latitude={item.latitude}
                        longitude={item.longitude}
                        deleteCoordinate={deleteCoordinate}
                        index={index}
                        markers={markers}
                    />
                )}
                keyExtractor={item => (item.latitude + item.longitude).toString() + Math.random().toString()}
                contentContainerStyle={{ alignItems: 'center' }}
            />
        </View>
        <Button
            onPress={handleBtnUbications}
            style={{...styles.btnEditSectionMap, marginBottom: 20}}
        >
            <Text style={styles.textBtnEditMap}>ESTABLECER UBICACIÓN</Text>
        </Button>
        </View>
    )
}

export default SaveLocationSection
