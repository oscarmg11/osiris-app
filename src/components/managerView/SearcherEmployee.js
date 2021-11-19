import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Collapsible from 'react-native-collapsible';

import styles from '../../styles/ManagerScreenStyles';
import { url, messageServerError, messageTokenError } from '../../../app.json';

function SearcherEmployee({ searchingStarted, searchingDone, setEmployeesResult }){

    const [ inputSearcher, setInputSearcher ] = useState('')
    const [token, setToken] = useState(""); 
    const [collapsible, setCollapsible] = useState(true); 
    const [searchAll, setSearchAll] = useState(false); 
    
    const search = () => {
        if(collapsible){
            setCollapsible(false)
        }else{
            if(inputSearcher !== ""){
                searchingStarted()
                fetchResults().then( ({users}) => {
                    setEmployeesResult(users)
                    searchingDone()
                    setCollapsible(true)
                }).catch( () => {
                    alert(`${messageServerError}`)
                    searchingDone()
                })
            }
            if(searchAll){
                fetchResultsAll().then( ({users}) => {
                    setEmployeesResult(users)
                    setCollapsible(true)
                    searchingDone()
                }).catch( () => {
                    alert(`${messageServerError}`)
                    searchingDone()
                })
            }
        }
    }

    const searchAllCheckbox = () => { setSearchAll(!searchAll); setInputSearcher('') }

    const fetchResults = async () => {
        let res = await axios({
            method: 'get',
            url: `${url}/user/?rol=employee&section=${inputSearcher}`, 
            headers: { 'authorization': token },
            timeout: 5000
        })        
        console.log(res.data)
        return res.data
    }

    const fetchResultsAll = async () => {
        let res = await axios({
            method: 'get',
            url: `${url}/user/?rol=employee`, 
            headers: { 'authorization': token },
            timeout: 5000
        })        
        return res.data
    }

    const handleInputSearcher = (e) => {  
        let { text } = e.nativeEvent
        setInputSearcher(text)
        setSearchAll(false)
    }

    useEffect(() => {         
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }        
        getTokenFromAsyncStorage()
    }, [])

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
        <>
        <Collapsible collapsed={collapsible}>
            <View style={styles.formSpecificSearcher}>
                <Text style={styles.titleSearchLight}>TIPO DE</Text>
                <Text style={styles.titleSearchBold}>BUSQUEDA</Text>
                <View style={styles.inputSearchContainer}>
                    <View style={styles.labelSearchContainer}>
                        <View style={styles.checkBoxContainerSearch}>
                            {inputSearcher !== '' && <View style={styles.checkBoxSearch}></View>}
                        </View>
                        <Text style={styles.labelSearch}>SECCIÓN</Text>
                    </View>
                    <View style={styles.textInputSearchContainer}>
                        <TextInput 
                            style={styles.inputSearch}
                            placeholder="----"
                            placeholderTextColor="white"
                            value={inputSearcher}
                            onChange={handleInputSearcher}
                        />
                    </View>
                </View>
                <TouchableHighlight 
                    style={styles.inputSearchContainer}
                    underlayColor="rgba(0,0,0,0)"
                    onPress={searchAllCheckbox}
                >
                    <View style={styles.labelSearchContainerFull}>
                        <View style={styles.checkBoxContainerSearch}>
                            {searchAll && <View style={styles.checkBoxSearch}></View>}
                        </View>
                        <Text style={styles.labelSearch}>TODOS</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </Collapsible>
        <Button
            small
            style={styles.btnSearch}
            onPress={search}
        >
            <Text style={styles.textBtnSearch}>BUSCAR</Text>
        </Button>
        </>
    )
}

export default SearcherEmployee;