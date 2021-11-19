import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from '../../styles/AdminScreenSytles';
import Alert from '../Alert'



function CoordinatesItem({ latitude, longitude, deleteCoordinate, index, markers }){

    const [activeAlert, setActiveAlert] = useState(false)

    const renderBtnDelete = () => (
        <RectButton
            style={styles.btnDeleteCoordinates}
            onPress={activeDeleteCoordinateAlert}
        >
            <Icon name="trash" color="white" size={30}/>
        </RectButton>
    )

    const deleteItem = () => { 
        deleteCoordinate({latitude, longitude}) 
        closeAlert()
    }

    const closeAlert = () => { setActiveAlert(false) }

    const activeDeleteCoordinateAlert = () => { setActiveAlert(true) }

    return (
        <>
        <Alert 
            title="BORRAR COORDENADA"
            body="¿Está seguro que desea borrar está coordenada?"
            activeAlert={activeAlert}
            cancelFunction={closeAlert}
            okayFunction={deleteItem}
        />
        <Swipeable
            renderLeftActions={renderBtnDelete}
            overshootLeft={false}   
        >
            <View style={index === markers.length - 1 ? styles.lastRowCoordinatesEditSection :  styles.rowCoordinatesEditSection}>
                <Text style={ index === markers.length - 1 ? styles.lastCoordinate : styles.textInfoUser}>LATITUD: {latitude}</Text>
                <Text style={ index === markers.length - 1 ? styles.lastCoordinate : styles.textInfoUser}>LONGITUD: {longitude}</Text>
            </View>
        </Swipeable>
        </>
    )
}

export default CoordinatesItem
