import React from 'react';
import { View, Text } from 'react-native';
import { CardItem } from 'native-base';

import styles from '../../styles/ManagerScreenStyles';

function ResultItemPlant({ plant }){
    return(
        <View style={styles.cardItemPlant}> 
            <CardItem header>
                <View style={styles.titleItemPlantContainer}>
                    <Text style={styles.titleItemPlant}>PLANTA {plant.serialNumber}</Text>
                </View>                            
            </CardItem>
            <CardItem>
                <View>
                    <Text style={styles.sectionItemPlant}>SECCIÓN {plant.section}</Text>
                    <Text style={styles.textItemPlant}>Ancho: {plant.width} cm</Text>
                    <Text style={styles.textItemPlant}>Alto: {plant.height} cm</Text>
                    <Text style={styles.textItemPlant}>Número de frutos: {plant.numberFruits}</Text>
                    <Text style={styles.textItemPlant}>Temperatura: {plant.temperature} °C</Text>
                </View>                
            </CardItem>
        </View>
    )
}

export default ResultItemPlant;