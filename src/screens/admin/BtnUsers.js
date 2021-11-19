import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

import styles from '../../styles/AdminScreenSytles';

function BtnUsers({ navigation }){

    const gotoEmployees = () => { navigation.navigate('Employees') }

    const gotoManagers = () => { navigation.navigate('Managers') }

    const gotoOwners = () => { navigation.navigate('Owners') }


    return (
        <View style={styles.containerBtnUsers}>
            <Button
                style={styles.btnGotoUser}
                onPress={gotoEmployees}
            >
                <Text style={styles.textBtnGotoUser}>EMPLEADOS</Text>
            </Button>
            <Button
                style={styles.btnGotoUser}
                onPress={gotoManagers}
            >
                <Text style={styles.textBtnGotoUser}>ASISTENTES</Text>
            </Button>
            <Button
                style={styles.btnGotoUser}
                onPress={gotoOwners}
            >
                <Text style={styles.textBtnGotoUser}>PROPIETARIOS</Text>
            </Button>
        </View>
    )
}

export default BtnUsers
