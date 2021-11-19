import React from 'react';
import { Image } from 'react-native';
import { Button } from 'native-base';

import styles from '../styles/AdminScreenSytles'; 

const addIcon = require('../assets/add-icon.png')

function BtnAddUser({ onPress }){

    return (
        <>
        <Button 
            onPress={onPress}
            style={styles.btnAddUser}
        >
            <Image 
                source={addIcon}
                resizeMode="contain"
                style={{ width: 30 }}
            />
        </Button>
        </>
    )
}

export default BtnAddUser
