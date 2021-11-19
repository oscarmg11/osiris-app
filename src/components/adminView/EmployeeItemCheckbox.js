import React, { useState, useEffect } from 'react'
import { View, Text, TouchableNativeFeedback, TextInput } from 'react-native'

import styles from '../../styles/AdminScreenSytles'

const EmployeeItemCheckbox = ({ user, checked, setCheckbox, setPlants }) => {

    const [plantFrom, setPlantFrom] = useState('0000')
    const [plantTo, setPlantTo] = useState('0000')

    const handleCheckbox = () => {
        setCheckbox(user._id) 
    }

    const handleInputPlantFrom = (e) => {
        let { text } = e.nativeEvent
        text = text.replace(/[^0-9]/g, '')
        setPlantFrom(text)      
        setPlants(user._id, `${text}-${plantTo}`)  
    }

    const handleInputPlantTo = (e) => {
        let { text } = e.nativeEvent
        text = text.replace(/[^0-9]/g, '')
        setPlantTo(text)
        setPlants(user._id, `${plantFrom}-${text}`)  
    }

    useEffect(() => {
        if(checked && user.plantsToDisplay){
            setPlantFrom(user.plantsToDisplay.split('-')[0])
            setPlantTo(user.plantsToDisplay.split('-')[1])
            setPlants(user._id, `${user.plantsToDisplay.split('-')[0]}-${user.plantsToDisplay.split('-')[1]}`)  
        }
    },[checked])

    return (
        <>
            <TouchableNativeFeedback onPress={handleCheckbox}>
                <View style={styles.checkboxContainer}>
                    <View style={styles.checkboxEmployeeItem}>
                        {checked && <View style={styles.checkboxMarker}></View>}
                    </View>
                    <Text style={styles.label}>{user.name || user.sectionName}</Text>
                </View>
            </TouchableNativeFeedback>
            {checked && (
                 <View style={styles.inputPlantsNewSection}>
                    <Text style={styles.label}>PLANTAS</Text>
                    <TextInput 
                        value={plantFrom}
                        style={styles.inputEditUserPlantasNewSection}
                        keyboardType="numeric"
                        onChange={handleInputPlantFrom}
                    />
                    <Text>-</Text>
                    <TextInput 
                        value={plantTo}
                        style={styles.inputEditUserPlantasNewSection}
                        keyboardType="numeric"
                        onChange={handleInputPlantTo}
                    />
                </View>
            )}
        </>
    )
}


export default EmployeeItemCheckbox
