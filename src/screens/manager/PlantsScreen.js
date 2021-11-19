import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, BackHandler, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { url, messageServerError, messageTokenError } from '../../../app.json'
import ResultPlants from '../../components/managerView/ResultPlants';
import ModalTask from '../../components/managerView/ModalTask';
import SearcherPlants from '../../components/managerView/SearcherPlants';
import styles from '../../styles/ManagerScreenStyles';
import Alert from '../../components/Alert';

function PlantsScreen({ navigation }){

    const [token, setToken] = useState("");
    const [plants, setPlants] = useState([])
    const [owners, setOwners] = useState([])
    const [searching, setSearching] = useState(false)
    const [alertActive, setAlertActive] = useState(false)
    const [activeModalTask, setActiveModalTask] = useState(false)
    const [collapsedSearcher, setCollapsedSearcher] = useState(false);
    const [orientation, setOrientation] = useState('portrait')

    const handleOrientation = () => {
        const { width, height } = Dimensions.get('window')
        if(width > height){ setOrientation('landscape') }
        else{ setOrientation('portrait') }
    }    

    const onSearchDone = (plants) => {
        setPlants(plants)
        endSearching()
    }

    const searchingCollapsed = (value) => { setCollapsedSearcher(value) }

    const startSearching = () => { setSearching(true) }
    
    const endSearching = () => { setSearching(false) } 

    const setTask = () => { setActiveModalTask(true) } 
    
    const closeModalTask = () => { setActiveModalTask(false) }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setAlertActive(true)             
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress); 
            Dimensions.addEventListener('change', handleOrientation);
            return () => {
                Dimensions.removeEventListener('change', handleOrientation)
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }
        },[])
    )

    useEffect(() => {         
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token) 
            fetchOwners(token).then(({users}) => {
                setOwners(users)
            }).catch(() => alert(`${messageServerError}`))
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

    const fetchOwners = async (token) => {
        let res = await axios({
            method: 'GET',
            url: `${url}/user?rol=owner`,
            headers: { 'authorization': token },
            timeout: 5000
        })
        return res.data
    }

    const closeAlert = () => { setAlertActive(false) }    

    const handleAlert = () => {
        closeAlert() 
        navigation.navigate('Login') 
    }
 
    return(
        <View style={styles.flex1}>
            <Alert 
                activeAlert={alertActive}
                title={'CERRAR SESIÓN'}
                body={'¿Está seguro que desea cerrar sesión?'}
                cancelFunction={closeAlert}
                okayFunction={handleAlert}
            />
            <ModalTask 
                activeModal={activeModalTask}
                closeModal={closeModalTask}
                plants={plants}
            />
            <View 
                style={ orientation === "portrait" ? (
                    collapsedSearcher ? styles.searcherContainerHeight : styles.searcherContainer
                ) : (
                    collapsedSearcher ? styles.searcherContainerHeightLandscape : styles.searcherContainerLandscape
                )
            }>                
                <SearcherPlants
                    startSearching={startSearching}
                    onSearchDone={onSearchDone}
                    collapsed={collapsedSearcher}
                    setCollapsed={searchingCollapsed}
                    owners={owners}
                />                
            </View>
            {plants.length !== 0 && collapsedSearcher && (
                <>
                    <View style={styles.btnResultsContainer}>                     
                        <Button 
                            style={styles.btnItemResult}
                            onPress={setTask}
                        >
                            <Text style={styles.textBtnSearch}>ASIGNAR TAREA</Text>
                        </Button>
                    </View>
                </>
            )}
            {collapsedSearcher && (
                searching ? (
                    <View style={styles.resultsContainer}>                    
                        <ActivityIndicator size={30}/>
                    </View>
                ): (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.textResults}>RESULTADOS: {plants.length}</Text> 
                        <ResultPlants plants={plants} />
                    </View>
                )
            )}
        </View> 
    )
}

export default PlantsScreen;