import React, { useState } from 'react';
import { FlatList, Text, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import ResultItemPlant from './ResultItemPlant';
import styles from '../../styles/ManagerScreenStyles';

function ResultPlants({ plants }){

    const [orientation, setOrientation] = useState('portrait')

    const handleOrientation = () => {
        const { width, height } = Dimensions.get('window')
        if(width > height){ setOrientation('landscape') }
        else{ setOrientation('portrait') }
    }

    useFocusEffect(React.useCallback(() => {
        Dimensions.addEventListener('change', handleOrientation);
        return () => Dimensions.removeEventListener('change', handleOrientation)
    },[]))

    return(
        <>
            {plants.length > 0 ? (
                <FlatList
                    style={ orientation === "portrait" ? styles.resultsList : styles.resultsListLandscape} 
                    data={plants}
                    renderItem={({item}) => <ResultItemPlant plant={item}/> }
                    keyExtractor={item => item._id}
                    extraData={plants}
                    numColumns={orientation === "portrait" ? 2 : 4}
                    contentContainerStyle={{ alignItems: 'center' }} 
                    key={orientation}
                />
            ): (
                <Text style={styles.ResultsNotFoundLabel}>No se han encontrado resultados</Text>
            )}           
        </> 
    )
}

export default ResultPlants;