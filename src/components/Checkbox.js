import React from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        width: width * 0.8,
        height: height * 0.05,
        backgroundColor: 'rgb(230, 230, 230)',
        alignItems: 'center',
        paddingLeft: width * 0.1
    },
    checkbox: {
        width: width * 0.06,
        height: width * 0.06,
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxMarker: {
        width: width * 0.04,
        height: width * 0.04,
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 3,
    },
    label: {
        fontFamily: 'Montserrat-Light'
    }
})

function Checkbox({ user, checked, setCheckbox }){
    
 
    const handleCheckbox = () => {
        setCheckbox(user._id) 
    }

    return (
        <TouchableNativeFeedback onPress={handleCheckbox}>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkbox}>
                    {checked && <View style={styles.checkboxMarker}></View>}
                </View>
                <Text style={styles.label}>{user.name || user.sectionName}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default Checkbox
