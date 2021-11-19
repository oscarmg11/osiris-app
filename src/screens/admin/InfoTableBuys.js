import React, { useEffect, useState } from 'react';
import { View, Text, TouchableNativeFeedback, Modal, Dimensions, FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';
import Pdf from 'react-native-pdf';

import styles from '../../styles/AdminScreenSytles';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import { url, messageTokenError, messageServerError } from '../../../app.json'


function RowTable({ id, item, navigation, seeDoc, orientation }){

    const [alertDelete, setAlertDelete] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [token, setToken] = useState('')

    const activeAlert = () => setAlertDelete(true)

    const closeAlert = () => setAlertDelete(false)

    const handleAlert = () => {    
        setDeleting(true)    
        fetchDeleteBuy().then(({deleted, buy}) => {
            if(deleted){
                setDeleting(false)    
                Toast.show({
                    text: 'La compra se ha borrado correctamen!',
                    duration: 3000,
                    position: 'bottom',
                    type: 'success'
                })
                navigation.navigate('Buys', { buy, type: 'REMOVE' })
            }
        }).catch(() => {
            setDeleting(false)    
            alert(`${messageServerError}`)
        })
    }

    const fetchDeleteBuy = async () => {
        const res = await axios({
            method: "DELETE",
            url: `${url}/buy/${id}`,
            headers: { 'authorization': token},
            timeout: 5000
        })
        return res.data
    }

    const btnDelete = () => (
        <RectButton
            style={styles.btnDeleteBuy}
            onPress={activeAlert}
        >
            <Icon name="trash" color="white" size={20}/>
        </RectButton>
    )

    useEffect(() => {
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
        }
        getTokenFromAsyncStorage()
    },[])

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

    return(
        <>
        <Loading active={deleting} />
        <Alert 
            activeAlert={alertDelete}
            title={'ELIMINAR COMPRA'}
            body={'¿Está seguro que desea eliminar esta compra?'}
            cancelFunction={closeAlert}
            okayFunction={handleAlert}
        />
        <Swipeable 
            renderLeftActions={btnDelete}
            overshootLeft={false}
        >
            <View style={orientation === "portrait" ? styles.rowTableInfoSection : styles.rowTableInfoSectionLandscape}>
                <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                    <Text style={styles.textTableInfoSection}>{item.name}</Text>
                </View>
                <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                    <Text style={styles.textTableInfoSection}>{item.total}</Text>
                </View>
                <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                    <Text style={styles.textTableInfoSection}>{item.weight}</Text>
                </View>
                <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                    <Text style={styles.textTableInfoSection}>{item.date}</Text>
                </View>                
                <TouchableNativeFeedback onPress={() => seeDoc(item.document)}>
                <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                        <Text style={styles.textTableInfoSection}>VER DOC</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </Swipeable>
        </>
    )
}

function InfoTableBuys({ route, navigation }){

    const [buys, setBuys] = useState([])
    const [uri, setUri] = useState('')
    const [loading, setLoading] = useState(true)
    const [modalDoc, setModalDoc] = useState(false)
    const [orientation, setOrientation] = useState('portrait')

    const handleOrientation = () => {
        const { width, height } = Dimensions.get('window')
        if(width > height){ setOrientation('landscape') }
        else{ setOrientation('portrait') }
    }

    useEffect(() => {
        if(route.params){
            setBuys(route.params.buys)
            setLoading(false)
        }
        Dimensions.addEventListener('change', handleOrientation);
        return () => Dimensions.removeEventListener('change', handleOrientation)
    },[])

    const seeDoc = (uri) => {
        setUri(uri)
        setModalDoc(true)
    }

    const closeModal = () => setModalDoc(false)

    return (
        <View style={styles.createBuyFormContainer}>
            <Modal
                visible={modalDoc}
                animationType="none"
                onRequestClose={closeModal}
                
            >
                <Pdf 
                    source={{ uri }}
                    style={styles.pdf}
                    activityIndicator={<Loading active={true}/>}
                />
            </Modal>
            <Text style={{...styles.infoTitle, marginBottom: 20}}>INFORMACIÓN DE LAS COMPRAS</Text>
            <Loading active={loading}/>
            {buys.length !== 0 && (
                <>
                <View style={orientation === "portrait" ? styles.rowTableInfoSectionHeader : styles.rowTableInfoSectionHeaderLandscape}>
                    <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                        <Text style={styles.rowTableInfoSectionTitle}>VENDEDOR</Text>
                    </View>
                    <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                        <Text style={styles.rowTableInfoSectionTitle}>PRECIO</Text>
                    </View>
                    <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                        <Text style={styles.rowTableInfoSectionTitle}>KG</Text>
                    </View>
                    <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                        <Text style={styles.rowTableInfoSectionTitle}>FECHA</Text>
                    </View>
                    <View style={orientation === "portrait" ? styles.cellTableInfoBuys : styles.cellTableInfoBuysLandscape}>
                        <Text style={styles.rowTableInfoSectionTitle}>DOCUMENTO</Text>
                    </View>
                </View>
                    <FlatList 
                        data={buys}
                        extraData={buys}
                        renderItem={({item}) => (
                            <RowTable 
                                item={item}
                                id={item._id}
                                seeDoc={seeDoc}
                                navigation={navigation}
                                orientation={orientation}
                            />
                        )}
                        keyExtractor={item => item._id}

                    />
                </>
            )}
        </View>
    )
}

export default InfoTableBuys
