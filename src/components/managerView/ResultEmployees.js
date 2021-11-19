import React from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';

import ResultItemEmployee from './ResultItemEmployee';
import styles from '../../styles/ManagerScreenStyles';

function ResultEmployees({ employees, searching, updateEmployees, orientation }){

    return(
        <>
            {searching ? (
                <ActivityIndicator color="green" size={40}/>
            ): (  
                <>              
                    <Text style={styles.textResults}>RESULTADOS: {employees.length}</Text>
                    <FlatList
                        style={ orientation === "portrait" ? styles.resultsList : styles.resultsListLandscape} 
                        data={employees}
                        renderItem={({item}) => <ResultItemEmployee employee={item} updateEmployees={updateEmployees} orientation={orientation}/> }
                        keyExtractor={item => item._id}
                        extraData={employees}
                        contentContainerStyle={{ alignItems: 'center' }}                        
                        numColumns={orientation === "portrait" ? 1 : 2}
                        key={orientation}
                    />
                </>
            )}
        </>
    )
}

export default ResultEmployees;