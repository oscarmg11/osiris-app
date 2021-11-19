import React from 'react'
import { View, Text } from 'react-native'
import { CheckBox } from 'native-base';

import styles from '../../styles/AdminScreenSytles'

function OwnerItemCheckbox({checked, owner, setOwnerCheckbox}){

 
    const handleCheckbox = () => {
        setOwnerCheckbox(owner.userName) 
    }

    return (
        <View style={{...styles.itemEmployeeCheckbox, justifyContent: 'space-around'}}>
            <CheckBox checked={checked} onPress={handleCheckbox}/>
            <Text>{owner.userName}</Text>
        </View>
    )
}


export default OwnerItemCheckbox
