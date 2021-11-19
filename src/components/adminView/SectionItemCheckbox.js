import React from 'react'
import { View, Text } from 'react-native'
import { CheckBox } from 'native-base';

import styles from '../../styles/AdminScreenSytles'

function SectionItemCheckbox({checked, section, setSectionChecbox}){

 
    const handleCheckbox = () => {
        setSectionChecbox(section.sectionName) 
    }

    return (
        <View style={{...styles.itemEmployeeCheckbox, justifyContent: 'space-around'}}>
            <CheckBox checked={checked} onPress={handleCheckbox}/>
            <Text>{section.sectionName}</Text>
        </View>
    )
}


export default SectionItemCheckbox
