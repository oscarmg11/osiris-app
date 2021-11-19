import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableNativeFeedback, ScrollView, Dimensions } from 'react-native'
import { Button, Picker } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Collapsible from 'react-native-collapsible'
import { useFocusEffect } from '@react-navigation/native'

import styles from '../../styles/ManagerScreenStyles';
import { url, messageServerError, messageTokenError } from '../../../app.json'

const SearcherPlants = ({  onSearchDone, startSearching, collapsed, setCollapsed, owners }) => {

    const [numberPlant, setNumberPlant] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [numberFruits, setNumberFruits] = useState('')    
    const [section, setSection] = useState('')
    const [widthPicker, setWidthPicker] = useState('more')
    const [heightPicker, setHeightPicker] = useState('more')
    const [numberFruitsPicker, setNumberFruitsPicker] = useState('more') 
    const [ownerPicker, setOwnerPicker] = useState('') 
    const [token, setToken] = useState("");
    const [reported, setReported] = useState(false)
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

    const handleReportCheckbox = () => setReported(!reported)

    const numberPlantInput = (e) => {
        let { text } = e.nativeEvent
        setNumberPlant(text)
    }

    const widthPlantInput = (e) => {
        let { text } = e.nativeEvent
        setWidth(text)
    }

    const heightPlantInput = (e) => {
        let { text } = e.nativeEvent
        setHeight(text)
    }

    const numberFruitsPlantInput = (e) => {
        let { text } = e.nativeEvent
        setNumberFruits(text)
    }

    const sectionPlantInput = (e) => {
        let { text } = e.nativeEvent
        setSection(text)
    }

    const search = () => {
        if(collapsed){
            setCollapsed(false)
        }else{
            setCollapsed(true)
            startSearching()        
            fetchResults().then( results => {
                onSearchDone(results)
            }).catch( () => {
                alert(`${messageServerError}`)
                onSearchDone([])
            })
        }
    }

    const handlePickerWidth = (value) => { setWidthPicker(value) }

    const handlePickerOwner = (value) => { setOwnerPicker(value) }

    const handlePickerHeight = (value) => { setHeightPicker(value) }

    const handlePickerNumberFruits = (value) => { setNumberFruitsPicker(value) }

    const fetchResults = async () => { 
        let urlToFetch = url + '/plant/specific?serialNumber=' + numberPlant + 
                        '&width=' + width + '&widthType=' + widthPicker +
                        '&height=' + height + '&heightType=' + heightPicker +
                        '&numberFruits=' + numberFruits + '&numberFruitsType=' + numberFruitsPicker + 
                        '&section=' + section + '&reported=' + reported + '&ownerID=' + ownerPicker  
        let res = await axios({
            method: 'get',
            url: urlToFetch,
            headers: { 'authorization': token },
            timeout: 5000
        })                
        return res.data.plants
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

    useEffect(() => {        
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }
        getTokenFromAsyncStorage()
    },[])

    return (
        <>
        <Collapsible collapsed={collapsed}>
            <View style={ orientation === "portrait" ? styles.searcherPlants : styles.searcherPlantsLandscape}>
            <ScrollView 
                contentContainerStyle={styles.formSpecificSearcher} 
                style={styles.flex1}
            >
                <Text style={styles.titleSearchLight}>TIPO DE</Text>
                <Text style={styles.titleSearchBold}>BUSQUEDA</Text>
                 <View style={styles.pickerSearchContainer}> 
                    <Text style={styles.labelSearch}>PROPIETARIO: </Text>               
                    <Picker 
                        selectedValue={ownerPicker}
                        style={styles.pickerSearch}
                        onValueChange={handlePickerOwner}
                    >
                        {owners.map(owner => (
                            <Picker.Item label={owner.userName} value={owner._id} key={owner._id}/>
                        ))}
                    </Picker>
                </View>               
                <View style={styles.inputSearchContainer}>
                    <View style={styles.labelSearchContainer}>
                        <View style={styles.checkBoxContainerSearch}>
                            {numberPlant !== '' && <View style={styles.checkBoxSearch}></View>}
                        </View>
                        <Text style={styles.labelSearch}>No. PLANTA</Text>
                    </View>
                    <View style={styles.textInputSearchContainer}>
                        <TextInput 
                            onChange={numberPlantInput}
                            value={numberPlant}
                            style={styles.inputSearch}
                            placeholder="----"
                            placeholderTextColor="white"
                            keyboardType="numeric"                        
                        />
                    </View>
                </View> 
                <View style={styles.inputSearchContainer}>
                    <View style={styles.labelSearchContainer}>
                        <View style={styles.checkBoxContainerSearch}>
                            {width !== '' && numberPlant === '' && <View style={styles.checkBoxSearch}></View>}
                        </View>
                        <Text style={styles.labelSearch}>ANCHO</Text>
                    </View>
                    <View style={styles.textInputSearchContainer}>
                        <TextInput 
                            onChange={widthPlantInput}
                            value={width}
                            style={styles.inputSearch}                        
                            keyboardType="numeric"
                            placeholder="--- cm"
                            placeholderTextColor="white"
                            editable={numberPlant === '' ? true : false}
                        />
                    </View>
                </View>
                {width !== '' && (
                    <View style={styles.pickerSearchContainer}> 
                        <Text style={styles.labelSearch}>CONDICIÓN: </Text>               
                        <Picker 
                            selectedValue={widthPicker}
                            style={styles.pickerSearch}
                            onValueChange={handlePickerWidth}
                        >
                            <Picker.Item label="MAYOR" value="more"/>
                            <Picker.Item label="MENOR" value="less"/>
                        </Picker>
                    </View>
                )}
                <View style={styles.inputSearchContainer}>
                    <View style={styles.labelSearchContainer}>
                        <View style={styles.checkBoxContainerSearch}>
                            {height !== '' && numberPlant === '' && <View style={styles.checkBoxSearch}></View>}
                        </View>
                        <Text style={styles.labelSearch}>ALTURA</Text>
                    </View>
                    <View style={styles.textInputSearchContainer}>
                        <TextInput 
                            onChange={heightPlantInput}
                            value={height}
                            style={styles.inputSearch}
                            placeholder="--- cm"
                            keyboardType="numeric"
                            placeholderTextColor="white"
                            editable={numberPlant === '' ? true : false}
                        />                    
                    </View>
                </View>
                {height !== '' && (
                    <View style={styles.pickerSearchContainer}> 
                        <Text style={styles.labelSearch}>CONDICIÓN: </Text>               
                        <Picker 
                            selectedValue={heightPicker}
                            style={styles.pickerSearch}
                            onValueChange={handlePickerHeight}    
                        >
                            <Picker.Item label="MAYOR" value="more"/>
                            <Picker.Item label="MENOR" value="less"/>
                        </Picker>
                    </View>
                )}
                <View style={styles.inputSearchContainer}>
                    <View style={styles.labelSearchContainer}>
                        <View style={styles.checkBoxContainerSearch}>
                            {numberFruits !== '' && numberPlant === '' && <View style={styles.checkBoxSearch}></View>}
                        </View>
                        <Text style={styles.labelSearch}>No. FRUTOS</Text>
                    </View>
                    <View style={styles.textInputSearchContainer}>                     
                        <TextInput 
                            onChange={numberFruitsPlantInput}
                            value={numberFruits}
                            style={styles.inputSearch}
                            placeholder="----"
                            keyboardType="numeric"
                            placeholderTextColor="white"
                            editable={numberPlant === '' ? true : false}
                        />                   
                    </View>
                </View>
                {numberFruits !== "" && (
                    <View style={styles.pickerSearchContainer}> 
                        <Text style={styles.labelSearch}>CONDICIÓN: </Text>               
                        <Picker 
                            selectedValue={numberFruitsPicker}
                            style={styles.pickerSpecificSearch}
                            onValueChange={handlePickerNumberFruits}    
                        >
                            <Picker.Item label="MAYOR" value="more"/>
                            <Picker.Item label="MENOR" value="less"/>
                        </Picker>
                    </View>
                )}
                <View style={styles.inputSearchContainer}>
                    <View style={styles.labelSearchContainer}>
                        <View style={styles.checkBoxContainerSearch}>
                            {section !== '' && numberPlant === '' && <View style={styles.checkBoxSearch}></View>}
                        </View>
                        <Text style={styles.labelSearch}>SECCIÓN</Text>
                    </View>
                    <View style={styles.textInputSearchContainer}>
                        <TextInput 
                            onChange={sectionPlantInput}
                            value={section}
                            style={styles.inputSearch}
                            placeholder="-----"
                            placeholderTextColor="white"
                            editable={numberPlant === '' ? true : false}
                        />                   
                    </View>
                </View>
                <TouchableNativeFeedback onPress={handleReportCheckbox}>
                    <View style={styles.inputSearchContainer}>
                        <View style={styles.labelSearchContainerFull}>
                            <View style={styles.checkBoxContainerSearch}>
                                {reported && numberPlant === '' && <View style={styles.checkBoxSearch}></View>}
                            </View>
                            <Text style={styles.labelSearch}>CON REPORTE</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
            </View>
        </Collapsible>
        <Button
            style={styles.btnSearch}
            onPress={search}
        >
            <Text style={styles.textBtnSearch}>BUSCAR</Text>
        </Button>                        
        </>
    )
}

export default SearcherPlants
