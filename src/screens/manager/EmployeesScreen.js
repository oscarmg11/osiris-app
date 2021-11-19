import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import SearcherEmployee from '../../components/managerView/SearcherEmployee';
import ResultEmployees from '../../components/managerView/ResultEmployees';
import styles from '../../styles/ManagerScreenStyles';
import { url, messageServerError, messageTokenError } from '../../../app.json';

function EmployeesScreen(){

    const labelsTypePicker = [{ value: 'section', label: 'Sección' }]

    const [searching, setSearching] = useState(true);
    const [token, setToken] = useState(""); 
    const [employees, setEmployees] = useState([])
    const [orientation, setOrientation] = useState('portrait')

    const handleOrientation = () => {
        const { width, height } = Dimensions.get('window')
        if(width > height){ setOrientation('landscape') }
        else{ setOrientation('portrait') }
    }

    const searchingDone = () => { setSearching(false) }
    
    const searchingStarted = () => { setSearching(true) }

    const setEmployeesResult = (employees) => { setEmployees(employees) }

    useFocusEffect(
        React.useCallback(() => {
            const fetchUsers = async () => {
                let res = await axios({
                    method: 'get',
                    url: `${url}/user/?rol=employee`,
                    headers: { 'authorization': token },
                    timeout: 5000
                })
                return res.data.users            
    
            }
            if(token !== ""){
                fetchUsers().then( users => {
                    setEmployeesResult(users)
                    searchingDone()
                }).catch(() => {
                    alert(`${messageServerError}`)
                    searchingDone()
                })
            }
            Dimensions.addEventListener('change', handleOrientation);
            return () => {
                Dimensions.removeEventListener('change', handleOrientation)
            }
        },[])
    )

    useEffect(() => {
        const fetchUsers = async (token) => {
            let res = await axios({
                method: 'get',
                url: `${url}/user/?rol=employee`,
                headers: { 'authorization': token },
                timeout: 5000
            })
            return res.data.users 
        } 
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchUsers(token).then( users => {
                setEmployeesResult(users)
                searchingDone()
            }).catch((e) => {
                alert(`${messageServerError}`)
                console.log(e)
                searchingDone()
            })
        }
        getTokenFromAsyncStorage()
    }, [])

    const updateEmployees = (employeesResponse) => {         
        let newEmployees = [...employees]         
        for(let i = 0; i < employees.length; i++){
            let idx = employeesResponse.findIndex( employee => employee._id === newEmployees[i]._id )
            if(idx >= 0){ newEmployees.splice(i,1,employeesResponse[idx]) }
        }                
        setEmployees(newEmployees)
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

    return(
        <View style={styles.flex1}>
            <View style={ orientation === "portrait" ? styles.searcherContainerEmployee : styles.searcherContainerEmployeeLandscape}>
                <SearcherEmployee 
                    labelsTypePicker={labelsTypePicker}
                    searchingDone={searchingDone}
                    searchingStarted={searchingStarted}
                    setEmployeesResult={setEmployeesResult}    
                    orientation={orientation}                                   
                />
            </View>
            <View style={styles.resultsContainer}> 
                <ResultEmployees 
                    employees={employees} 
                    searching={searching}
                    updateEmployees={updateEmployees} 
                    orientation={orientation}   
                />
            </View>
        </View>
    )
}

export default EmployeesScreen;