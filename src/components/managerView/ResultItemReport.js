import React, { useState, useEffect } from 'react'
import { View, Text, Image, Modal, TouchableHighlight, ActivityIndicator, FlatList, ScrollView, TouchableNativeFeedback } from 'react-native'
import { CardItem } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import ModalTask from './ModalTask';
import Alert from '../Alert';
import styles from '../../styles/ManagerScreenStyles'
import { url, messageServerError, messageTokenError } from '../../../app.json';

function ResultItemReport({ report, updatePlantsReported }){

    const [token, setToken] = useState("");
    const [fullImage, setFullImage] = useState(""); 
    const [searchingImages, setSearchingImages] = useState(false);
    const [activeFullImage, setActiveFullImage] = useState(false);
    const [activeAlert, setActiveAlert] = useState(false);
    const [activeModalTask, setActiveModalTask] = useState(false);

    const closeModalTask = () => { setActiveModalTask(false) } 

    const openModalTask = () => { setActiveModalTask(true) }  

    const openFullImage = (image) => { 
        setActiveFullImage(true)
        setFullImage(image) 
    }

    const closeFullImage = () => { setActiveFullImage(false) }

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
    }, [])     

    const deleteReport = () => {
        fetchDeleteReport().then( ({ deleted, plants }) => {
            if(deleted){
                updatePlantsReported(plants)
            }
        }).catch( () => {
            alert(`${messageServerError}`)
            setSearchingImages(false)
        } )
    }   

    const fetchDeleteReport = async () => {
        let res = await axios({
            method: 'DELETE',
            url: `${url}/plant/deleteReport`,
            headers: { 'authorization': token},
            data: { id: report._id }
        })
        return res.data
    }

    const renderBtnDelete = () => (
        <RectButton
            style={styles.btnDelete}
            onPress={openAlert}
        >
            <Icon name="trash" color="white" size={30}/>
        </RectButton>
    )

    const renderDate = (date) => {
        let dateArray = date.split(' ')
        let month = ''
        switch(dateArray[1]){
            case 'Jan':
                month = 'Ene'   
                break;         
            case 'Apr':
                month =  'Abr'
                break;
            case 'Aug':
                month = 'Ago'
                break;
            default:
                month = dateArray[1]
        }
        return `${dateArray[2]} ${month} ${dateArray[3]}`
    }

    const openAlert = () => { setActiveAlert(true) }

    const closeAlert = () => { setActiveAlert(false) }

    return (
        <>
        <Alert 
            title="ELIMINAR REPORTE"
            cancelFunction={closeAlert}
            okayFunction={deleteReport}
            activeAlert={activeAlert}
            body="¿Está seguro que desea eliminar este reporte?"
        />
         <ModalTask 
            activeModal={activeModalTask}
            closeModal={closeModalTask}
            plantsAlreadyOrdenated={true}
            userName={report.report.user}
        />
        <Swipeable
            renderLeftActions={renderBtnDelete}
            overshootLeft={false}
        >
            <View style={styles.cardItemReport}>
                <CardItem header>
                    <View style={styles.titleItemPlantContainer}>
                        <Text style={styles.textItemEmployee}>Reporte por {report.report.user}</Text> 
                    </View>
                </CardItem>
                <CardItem > 
                    <View style={styles.cardBodyItemReport}>
                        <Text style={styles.textItemEmployee}>{report.report.description}</Text>
                        <Text style={styles.textItemEmployee}>Fecha: {renderDate(report.report.date)}</Text>
                        <View style={{ marginTop: 10 }}>
                            <FlatList 
                                data={report.imagesReport}
                                extraData={report.imagesReport}
                                renderItem={ ({item}) => (
                                    <TouchableHighlight
                                        underlayColor="rgb(255,255,255)"
                                        onPress={() => { openFullImage(item.uri) }}
                                    >
                                        <Image 
                                            style={{width: 100, height: 100, marginRight: 10}} 
                                            source={{uri: item.uri}}
                                        />
                                    </TouchableHighlight>
                                )}
                                horizontal
                                keyExtractor={item => item._id}
                            />
                        </View>
                        <View style={styles.footerItemResultReports}>
                            <View style={styles.btnItemResultEmployee} >
                            </View>         
                            <TouchableNativeFeedback onPress={openModalTask}>
                                <View  style={styles.btnItemResultEmployee} >
                                    <Text style={styles.textBtnItemEmployee}>ASIGNAR TAREA</Text>
                                </View>
                            </TouchableNativeFeedback>          
                        </View>
                    </View>                               
                </CardItem> 
               
            </View>
        </Swipeable>
        <Modal
            visible={activeFullImage}
            transparent
            animationType="none"
            onRequestClose={closeFullImage}
        >
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0)"
                onPress={closeFullImage}
                style={styles.modalReportImages}
            >
                <Image 
                    style={styles.fullImage}
                    source={{uri: fullImage}}
                />
            </TouchableHighlight>
        </Modal>
        <Modal
            visible={searchingImages}
            transparent
            animationType="none"
        >
            <View style={styles.modalReportImages}>
                <ActivityIndicator color="green"  size={40}/>
            </View>
        </Modal>
        
        </>
    )
}

export default ResultItemReport
