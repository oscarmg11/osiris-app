import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableNativeFeedback, TouchableWithoutFeedback} from 'react-native'
import { Form, Button,Toast } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import styles from '../../styles/EmployeeScreenStyles'
import {url, messageServerError, messageTokenError} from '../../../app.json'
import {appContext} from '../../../App'

const heightIcon = require('../../assets/altura.png')
const fruitIcon = require('../../assets/fruit.png')
const typeIcon = require('../../assets/type.png')
const calendarIcon = require('../../assets/calendar.png')
const saveIcon = require('../../assets/guardar.png')

function infoQR({plantRead, editInfoSelected, editInfo, idPlant}){

    const context = useContext(appContext)
    
    const inputHeight = useRef(null)
    const inputName = useRef(null)
    const inputWidth = useRef(null)
    const inputNumberFruits = useRef(null)
    const inputType = useRef(null)
    const inputPlantedDateDay = useRef(null)
    const inputPlantedDateMonth = useRef(null)
    const inputPlantedDateYear = useRef(null)
   
    const [nameEdited, setNameEdited] = useState('')
    const [heightEdited, setHeightEdited] = useState('')
    const [widthEdited, setWidthEdited] = useState('')
    const [numberFruitsEdited, setNumberFruitsEdited] = useState('')
    const [typePlantEdited, setTypePlantEdited] = useState('')
    const [plantedDateEditedDay, setPlantedDateEditedDay] = useState("");
    const [plantedDateEditedMonth, setPlantedDateEditedMonth] = useState("");
    const [plantedDateEditedYear, setPlantedDateEditedYear] = useState("");
    const [token, setToken] = useState(""); 
    const [plant, setPlant] = useState({});   

    const focusInputHeight = () => inputHeight.current.focus()
    const focusInputName = () => inputName.current.focus()
    const focusInputWidth = () => inputWidth.current.focus()
    const focusInputNumberFruits = () => inputNumberFruits.current.focus()
    const focusInputType = () => inputType.current.focus()  
    const focusInputDateDay = () => inputPlantedDateDay.current.focus()       

    const editName = (e) => {
        const {text} = e.nativeEvent
        setNameEdited(text)
    }

    const editPlantedDateDay = (e) => {
        const {text} = e.nativeEvent
        if(text.length <= 2){ setPlantedDateEditedDay(text.replace(/[^0-9]/g, '')) }
        if(text.length === 2){ inputPlantedDateMonth.current.focus() }
    }

    const editPlantedDateMonth = (e) => {
        const {text} = e.nativeEvent
        if(text.length <= 2){ setPlantedDateEditedMonth(text.replace(/[^0-9]/g, '')) }
        if(text.length === 2){ inputPlantedDateYear.current.focus() }
    }

    const editPlantedDateYear = (e) => {
        const {text} = e.nativeEvent
        if(text.length <= 2){ setPlantedDateEditedYear(text.replace(/[^0-9]/g, '')) }
    }
    
    const editTypePlant = (e) => {
        const {text} = e.nativeEvent
        setTypePlantEdited(text)
    }

    const editHeight = (e) => {
        const {text} = e.nativeEvent
        setHeightEdited(text)
    }

    const editWidth = (e) => {
        const {text} = e.nativeEvent
        setWidthEdited(text)
    }

    const editNumberFruits = (e) => {
        const {text} = e.nativeEvent
        setNumberFruitsEdited(text)
    }

    const showToast = () => {
        Toast.show({
            text: 'Se han guardado los cambios correctamente',
            buttonText: 'Okay',
            type: 'success',
            duration: 3000
        })
    }

    const saveChanges = () => {        
        let newPlant = {
            name: nameEdited,
            height: heightEdited,
            width: widthEdited,
            numberFruits: numberFruitsEdited,
            id: plant._id || idPlant,
            type: typePlantEdited,
            date: Date.now(),
            plantedDate: `${plantedDateEditedDay}/${plantedDateEditedMonth}/${plantedDateEditedYear}`
        }
        if(context.isInternetReachable){
            postChanges(newPlant).then( plantUpdated => {
                setDataPlant(plantUpdated.plant)        
                showToast()
                editInfo() 
            }).catch(() => alert(`${messageServerError}`))
        }else{ 
            newPlant.height = Number(newPlant.height)
            newPlant.width = Number(newPlant.width)
            newPlant.numberFruits = Number(newPlant.numberFruits)
            context.dispatchLocalPlants({ type: 'UPDATE', value: newPlant })
            setDataPlant(newPlant)
            showToast()
            editInfo()
        }
               
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

    const postChanges = async (newPlant) => { 
        let res = await axios({
            method: 'PUT',
            url: `${url}/plant`, 
            data: {newPlant},
            headers: { 'authorization': token },
            timeout: 5000
        })
        return res.data
    }

    const setDataPlant = (plant) => {
        setPlant(plant)
        if(plant.name){ setNameEdited(plant.name) }
        if(plant.height){ setHeightEdited(plant.height.toString()) }
        if(plant.width){ setWidthEdited(plant.width.toString()) }
        if(plant.numberFruits){ setNumberFruitsEdited(plant.numberFruits.toString()) }
        if(plant.type){ setTypePlantEdited(plant.type) }
        if(plant.plantedDate){ 
            setPlantedDateEditedDay(plant.plantedDate.split('/')[0])
            setPlantedDateEditedMonth(plant.plantedDate.split('/')[1])
            setPlantedDateEditedYear(plant.plantedDate.split('/')[2])
        }
    }

    useEffect(() => {
        if(JSON.stringify(plantRead) !== "{}"){
            setDataPlant(plantRead)            
        }                            
    }, [plantRead])

    useEffect(() => {
        if(context.localPlants.length !== 0){
            setLocalPlants(context.localPlants)
        }
    },[context.localPlants])

    useEffect(() => {
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }
        getTokenFromAsyncStorage() 
    },[])

    const setLocalPlants = async (newPlants) => {
        try {
            await AsyncStorage.setItem('@plants', JSON.stringify(newPlants)) 
        } catch(e) {
            alert(`${messageUpdateLocalPlant}`)
        }
    }

    return(
        <View  style={styles.infoPlantContainer}>            
            <ScrollView contentContainerStyle={styles.infoPlantContainerContent}>
                {editInfoSelected ? (
                    <>
                    <Form>
                        <TouchableWithoutFeedback onPress={focusInputName}>
                        <View>
                            <Text style={styles.labelEditPlant}>NOMBRE</Text>
                            <View style={styles.inputEditInfoContainer}>
                                <TextInput 
                                    value={nameEdited}
                                    onChange={editName}
                                    style={{...styles.inputEditInfo, marginLeft: 0}}
                                    ref={inputName}
                                />
                            </View>
                        </View>
                        </TouchableWithoutFeedback>                        
                        <View>
                            <Text style={styles.labelEditPlant}>ALTURA (cm)</Text>
                            <View style={styles.inputEditInfoContainer}>
                                <View style={styles.inputEditInfoContainerRow}>
                                    <View style={styles.inputEditInfoIconContainer}>
                                        <Image 
                                            source={heightIcon}
                                            style={styles.icon}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </View>
                                    <View style={styles.inputEditInfoPlantContainer}>
                                        <TextInput 
                                            value={heightEdited}
                                            onChange={editHeight}
                                            style={styles.inputEditInfo}
                                            keyboardType="numeric"
                                            ref={inputHeight}
                                        />
                                    </View>
                                    <TouchableWithoutFeedback onPress={focusInputHeight}>
                                        <View style={styles.flex1}></View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.labelEditPlant}>ANCHO (cm)</Text>
                            <View style={styles.inputEditInfoContainer}>
                                <View style={styles.inputEditInfoContainerRow}>
                                    <View style={styles.inputEditInfoIconContainer}>
                                        <Image 
                                            source={heightIcon}
                                            style={{...styles.icon, transform: [{ rotate: '90deg' }] }}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </View>
                                    <View style={styles.inputEditInfoPlantContainer}>
                                        <TextInput 
                                            value={widthEdited}
                                            onChange={editWidth}
                                            style={styles.inputEditInfo}
                                            keyboardType="numeric"
                                            ref={inputWidth}
                                        />
                                    </View>
                                    <TouchableWithoutFeedback onPress={focusInputWidth}>
                                        <View style={styles.flex1}></View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.labelEditPlant}>NÚMERO DE FRUTOS</Text>
                            <View style={styles.inputEditInfoContainer}>
                                <View style={styles.inputEditInfoContainerRow}>
                                    <View style={styles.inputEditInfoIconContainer}>
                                        <Image 
                                            source={fruitIcon}
                                            style={styles.icon}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </View>
                                    <View style={styles.inputEditInfoPlantContainer}>
                                        <TextInput 
                                            value={numberFruitsEdited}
                                            onChange={editNumberFruits}
                                            style={styles.inputEditInfo}
                                            keyboardType="numeric"
                                            ref={inputNumberFruits}
                                        />
                                    </View>
                                    <TouchableWithoutFeedback onPress={focusInputNumberFruits}>
                                        <View style={styles.flex1}></View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.labelEditPlant}>FECHA DE PLANTACIÓN</Text>
                            <View style={styles.inputEditInfoContainer}>
                                <View style={styles.inputEditInfoContainerRow}>
                                    <View style={styles.inputEditInfoIconContainer}>
                                        <Image 
                                            source={calendarIcon}
                                            style={styles.icon}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </View>
                                    <View style={{...styles.inputEditInfoPlantContainer, flexDirection: 'row'}}>
                                        <TextInput 
                                            value={plantedDateEditedDay}
                                            onChange={editPlantedDateDay}
                                            style={styles.inputEditInfoDate}
                                            keyboardType="numeric"
                                            ref={inputPlantedDateDay}
                                        />
                                        <Text>/</Text>
                                        <TextInput 
                                            value={plantedDateEditedMonth}
                                            onChange={editPlantedDateMonth}
                                            style={styles.inputEditInfoDate}
                                            keyboardType="numeric"
                                            ref={inputPlantedDateMonth}
                                        />
                                        <Text>/</Text>
                                        <TextInput 
                                            value={plantedDateEditedYear}
                                            onChange={editPlantedDateYear}
                                            style={styles.inputEditInfoDate}
                                            keyboardType="numeric"
                                            ref={inputPlantedDateYear}
                                        />
                                    </View>
                                    <TouchableWithoutFeedback onPress={focusInputDateDay}>
                                        <View style={styles.flex1}></View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View> 
                        <View>
                            <Text style={styles.labelEditPlant}>TIPO</Text>
                            <View style={styles.inputEditInfoContainer}>
                                <View style={styles.inputEditInfoContainerRow}>
                                    <View style={styles.inputEditInfoIconContainer}>
                                        <Image 
                                            source={typeIcon}
                                            style={styles.icon}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </View>
                                    <View style={styles.inputEditInfoPlantContainer}>
                                        <TextInput 
                                            value={typePlantEdited}
                                            onChange={editTypePlant}
                                            style={styles.inputEditInfo}
                                            ref={inputType}
                                        />
                                    </View>
                                    <TouchableWithoutFeedback onPress={focusInputType}>
                                        <View style={styles.flex1}></View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>                        
                    </Form>
                    </>
                ):(                    
                    <>
                     <Text style={styles.titleInfoPlant}>PLANTA</Text>
                        <Text style={styles.numberInfoPlant}>{plant.serialNumber ? plant.serialNumber: '...'}</Text>
                        <View style={styles.rowInfoPlant}>
                            <View style={styles.labelInfoPlantContainer}>
                                <Image 
                                    source={heightIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <Text style={styles.labelInfoPlant}>ALTURA</Text>
                            </View>
                            <View style={styles.valueInfoPlantContainer}>
                                <Text style={styles.valueInfoPlant}>{plant.height ? `${plant.height} cm`: '...'}</Text>
                            </View>
                        </View>
                        <View style={styles.rowInfoPlant}>
                            <View style={styles.labelInfoPlantContainer}>
                                <Image 
                                    source={heightIcon}
                                    style={{...styles.icon, transform: [{ rotate: '90deg' }] }}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <Text style={styles.labelInfoPlant}>ANCHO</Text>
                            </View>
                            <View style={styles.valueInfoPlantContainer}>
                                <Text style={styles.valueInfoPlant}>{plant.width ? `${plant.width} cm`: '...'}</Text>
                            </View>
                        </View>
                        <View style={styles.rowInfoPlant}>
                            <View style={styles.labelInfoPlantContainer}>
                                <Image 
                                    source={fruitIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <Text style={styles.labelInfoPlant}>No. FRUTOS</Text>
                            </View>
                            <View style={styles.valueInfoPlantContainer}>
                                <Text style={styles.valueInfoPlant}>{plant.numberFruits ? plant.numberFruits: '...'}</Text>
                            </View>
                        </View>
                        <View style={styles.rowInfoPlant}>
                            <View style={styles.valueInfoPlantforID}>
                                <Image 
                                    source={calendarIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <Text style={{...styles.labelInfoPlant, fontSize: 12}}>FECHA DE PLANTACIÓN: {plant.plantedDate ? plant.plantedDate: '...'}</Text>
                            </View>
                        </View>
                        <View style={styles.rowInfoPlant}>
                            <View style={styles.valueInfoPlantforID}>
                                <Image 
                                    source={typeIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <Text style={styles.labelInfoPlant}>TIPO: {plant.type ? plant.type: '...'}</Text>
                            </View>
                        </View>
                        <View style={styles.rowInfoPlant}>
                            <View style={styles.valueInfoPlantforID}>
                                <Text style={styles.labelInfoPlant}>ID: {idPlant.replace(/\"/g, '')}</Text>
                            </View>
                        </View>                   
                    </>                    
                )}
                {editInfoSelected && (
                    <TouchableNativeFeedback onPress={saveChanges}>
                        <View style={styles.btnEditInfo} >
                            <Image 
                                source={saveIcon}
                                style={styles.icon}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                            <Text style={styles.textBtnEditInfo}>Guardar</Text>
                        </View>
                    </TouchableNativeFeedback>
                )}
                                    
            </ScrollView>         
        </View>
    )
}

export default infoQR;