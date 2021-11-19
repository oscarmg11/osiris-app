import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import styles from '../../styles/ManagerScreenStyles';
import { url, messageServerError, messageTokenError } from '../../../app.json';
import ResultItemReport  from '../../components/managerView/ResultItemReport'

function PlantsReportedScreen(){

    const [reports, setReports] = useState([])
    const [searchingReports, setSearchingReports] = useState(true)
    const [token, setToken] = useState(""); 

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

    const updatePlantsReported = (plants) => { setReports(plants) }

    useEffect(() => { 
        const fetchPlants = async (token) => {
            let res = await axios({
                method: 'get',
                url: `${url}/plant/reports`,
                headers: { 'authorization': token },
                timeout: 5000
            }) 
            return res.data.plants           
        }
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchPlants(token).then( plants => {
                setReports(plants)
                setSearchingReports(false)
            }).catch(() => {
                setSearchingReports(false)
                alert(`${messageServerError}`)
            })               
        }
        getTokenFromAsyncStorage() 
    }, [])

    return (
        <View style={styles.reportsBody}>
            {!searchingReports ? (
                <>
                    {reports.length === 0 ? (
                        <Text>No se han reportado problemas</Text>
                    ):(
                        <View style={styles.resultsReports}>
                            <FlatList 
                                data={reports}
                                extraData={reports}
                                renderItem={ ({ item }) => (
                                    <ResultItemReport report={item} updatePlantsReported={updatePlantsReported}/>
                                ) }
                                keyExtractor={ item => item._id }
                            />
                        </View>
                    )}
                </>
            ):(
                <ActivityIndicator color="green" size={40}/>
            )}            
        </View>
    )
}

export default PlantsReportedScreen
