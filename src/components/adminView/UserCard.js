import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableNativeFeedback } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toast } from 'native-base';
import axios from 'axios';

import Alert from '../../components/Alert';
import Loading from '../../components/Loading';
import styles from '../../styles/AdminScreenSytles';
import { url, messageServerError } from '../../../app.json'


const pencilIcon = require('../../assets/lapiz-icon.png')

function UserCard({ item, editUser, openPhoto, token, deleteUser, userType, sections, owners}){

    const [alertDeleteUser, setAlertDeleteUser] = useState(false)
    const [loading, setLoading] = useState(false)

    const activeAlert = () => { setAlertDeleteUser(true) }

    const closeAlert = () => { setAlertDeleteUser(false) }

    const handleAlert = () => {
        setLoading(true)
        fetchDeleteUser().then(() => {
            setLoading(false)
            Toast.show({
                text: 'Se ha eliminado el usuario correctamente',
                duration: 3000,
                position: "bottom",
                type: 'success'
            })
            deleteUser(item._id)
        }).catch(() => {
            setLoading(false)
            alert(`${messageServerError}`)
        })
    }

    const fetchDeleteUser = async () => {
        let res = await axios({
            method: 'DELETE',
            url: `${url}/user/delete`,
            data: {id: item._id},
            headers: { 'authorization': token },
            timeout: 5000
        })
        return res.data 
    } 

    const renderBtnDelete = () => (
        <RectButton
            style={styles.btnDelete}
            onPress={activeAlert}
        >
            <Icon name="trash" color="white" size={30}/>
        </RectButton>
    )

    const returOwner = () => {
        let section = sections.find( section => section.sectionName == item.section )
        if(section){
            let owner = owners.find( owner => owner._id === section.owner )
            return owner.name 
        }else{ return 'Sin propietario.' }
    }

    const returnSection = () => {
        let index = sections.findIndex( section => section.sectionName == item.section )
        if(index >= 0){ return item.section }
        else{ return 'Sin sección.' }
    }

    return (
        <>
        <Loading active={loading}/>
        <Alert 
            activeAlert={alertDeleteUser}
            title={'ELIMINAR USUARIO'}
            body={'¿Está seguro que desea eliminar este usuario?'}
            cancelFunction={closeAlert}
            okayFunction={handleAlert}
        />
        <Swipeable
            renderLeftActions={renderBtnDelete}
            overshootLeft={false}
        >
            <View style={styles.cardInfoUser}>
                <View style={styles.headerInfoUser}>
                    <Text style={styles.nameUser}>{item.name.toUpperCase()}</Text>
                    <TouchableNativeFeedback
                        onPress={() => editUser(item)}
                    >
                        <Image 
                            source={pencilIcon}
                            resizeMode="contain"
                            resizeMethod="resize"
                            style={{ width: 20 }}
                        />
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.bodyInfoUser}>
                    {item.photo  && (
                        <TouchableHighlight
                            onPress={() => openPhoto(item.photo)}
                        >
                            <Image 
                                source={{ uri: item.photo }}
                                style={styles.thumbnail}
                                key={item.photo}
                                resizeMethod="resize"
                            />
                        </TouchableHighlight>
                    )}
                    <View style={styles.infoUserContainer}>
                        {userType === "employee" && <Text style={styles.textInfoUserGray}>PROPIETARIO {returOwner()}</Text>}
                        {userType === "employee" && <Text style={styles.textInfoUserGray}>SECCIÓN {returnSection()}</Text>}
                        {userType === "employee" && item.plantsToDisplay && <Text style={styles.textInfoUserGray}>PLANTAS {parseInt(item.plantsToDisplay.split('-')[0])} a {parseInt(item.plantsToDisplay.split('-')[1])}</Text>}
                        {userType === "employee" && <Text style={styles.textInfoUserGray}>PROMEDIO DE LECTURA {item.meanReads ? item.meanReads : 0} min</Text>}
                        <Text style={styles.textInfoUser}>Usuario: {item.userName}</Text>
                        <Text style={styles.textInfoUser}>Dirección: {item.address}</Text>
                    </View>
                </View> 
            </View>
        </Swipeable>
        </>
    )
}

export default UserCard
