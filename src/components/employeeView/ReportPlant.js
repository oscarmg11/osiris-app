import React, { useState, useEffect } from 'react';
import { Text, Modal, TouchableHighlight, View, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Button, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { url, messageServerError, messageTokenError } from '../../../app.json';
import styles from '../../styles/EmployeeScreenStyles';
import Camera from '../Camera';

const cameraIcon = require('../../assets/camara-icon.png');

function ReportPlant({ userName, plantid, ref }){

    let defaultImages = [{
        uri: '1',
        empty: true,
        selected: false
    },{
        uri: '2',
        empty: true,
        selected: false
    },{
        uri: '3',
        empty: true,
        selected: false
    }]

    const [images, setImages] = useState(defaultImages)
    const [modalActive, setModalActive] = useState(false)
    const [cameraActive, setActiveCamera] = useState(false)
    const [fullImage, setFullImage] = useState(false)
    const [reporting, setReporting] = useState(false)
    const [imagetoFullImage, setImagetoFullImage] = useState('')
    const [inputReport, setInputReport] = useState('')
    const [token, setToken] = useState(""); 

    const startReporting = () => {
        openModal()
    }

    const closeModal = () => { setModalActive(false) }

    const openModal = () => { setModalActive(true) }

    const activeCamera = () => { setActiveCamera(true) }
    
    const closeCamera = () => { setActiveCamera(false) }

    const openFullImage = () => { setFullImage(true) }

    const closeFullImage = () => { setFullImage(false) }

    const takePicture = async (camera) => {        
        const data = await camera.takePictureAsync({ quality: 0.5 });        
        closeCamera()
        let newImages = [...images];    
        if(newImages[0].empty){ 
            newImages[0] = {uri: data.uri, selected: false, empty: false}
            setImages(newImages)
            return 
        }
        if(newImages[1].empty){ 
            newImages[1] = {uri: data.uri, selected: false, empty: false}
            setImages(newImages)
            return 
        }
        if(newImages[2].empty){ 
            newImages[2] = {uri: data.uri, selected: false, empty: false} 
            setImages(newImages)
            return
        }        
    };

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
    },[])

    const displayFullImage = (image) => {
        setImagetoFullImage(image)
        openFullImage()        
    }

    const selectImage = (uri) => {
        let newImages = [...images]
        for(let i = 0; i < images.length; i++){
           if(images[i].uri === uri){
                newImages[i].selected = !newImages[i].selected
           }
        }
        setImages(newImages) 
    }    

    const deleteImageReport = (uri) => {
        let newImages = [...images]
        for(let i = 0; i < images.length; i++){
           if(images[i].uri === uri){
                newImages.splice(i,1,{
                    uri: Date(Date.now()).toString(),
                    empty: true,
                    selected: false
                })
           }
        }
        setImages(newImages)
    }

    const handleInputReport = (e) => {
        let {text} = e.nativeEvent
        setInputReport(text)
    }

    const postReport = async (formData) => {
        let response = await axios({
            method: 'post',
            url: `${url}/plant/report`,
            data: formData ,
            headers: { 
                'Content-Type': 'multipart/form-data',
                'authorization': token
            },
            timeout: 5000
        })
        return response.data.reported
    }

    const report = () => {
        if(!images[0].empty && inputReport !== ""){
            setReporting(true)
            let formData = createReportData({ 
                user: userName,
                plantid,
                description: inputReport,
                date: Date(Date.now())
            })
            postReport(formData).then( reported => {
                reportDone(reported)
                setReporting(false)
            }).catch(() => {
                alert(`${messageServerError}`)
                setReporting(false)
            })
        }else{
            alert('Tienes que ingresar mínimo una foto y una descripción del reporte')
        } 
    }

    const reportDone = (reported) => {
        if(reported){
            setInputReport('')
            setImages(defaultImages)
            setImagetoFullImage('')
            setModalActive(false)
            Toast.show({
                text: 'Planta Reportada',
                buttonText: 'Okay',
                type: "success"
            })
        }
    }

    const createReportData = (body) => {        
        let data = new FormData();
        for(let i = 0; i < images.length; i++){
            if(!images[i].empty){
                data.append('reports', {
                    type: 'image/jpg',
                    uri: images[i].uri,
                    name: `${userName.replace(/\s+/g, '-')}_report${i+1}_${new Date().toISOString().replace(/:/g, '-')}.jpg`
                })
            }            
        }          
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        
        return data;
    }

    return(
        <>
            <Modal
                visible={reporting} 
                animationType="none"
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="green" size={40}/>
                </View>
            </Modal>  
            <Modal   
                visible={fullImage} 
                animationType="none"
                transparent={true}
            >
                <TouchableHighlight
                    underlayColor="rgba(0,0,0,0)"
                    onPress={closeFullImage}
                    style={styles.flex1}
                >
                    <Image 
                        source={{uri: imagetoFullImage, isStatic: true}}
                        style={styles.flex1}
                    />
                </TouchableHighlight>                
            </Modal>            
            <Camera 
                active={cameraActive}
                takePicture={takePicture}
                closeCamera={closeCamera}
                startRecording={() => {}}
                stopRecording={() => {}} 
                labelRecording={false}
            />             
            <Modal
                animationType="none"
                transparent={true}
                visible={modalActive}
                onRequestClose={closeModal}
            >
                <TouchableHighlight
                    underlayColor="rgba(0,0,0,0)"
                    onPress={closeModal}
                    style={styles.modal}
                >
                    <View style={styles.modalBody}>                        
                        <TouchableHighlight 
                            style={styles.flex1}
                            underlayColor="rgba(0,0,0,0)">
                            <>
                            <View style={styles.modalBodyContainer}>
                                <View style={styles.reportModalTitleContainer}>
                                    <Text style={styles.reportModalTitle}>REPORTE</Text>
                                    <Icon name="exclamation-circle" color="rgb(0, 26, 0)" size={20}/>
                                </View>
                                <View style={styles.imagesReportContainer}>
                                    <FlatList 
                                        data={images}
                                        extraData={images}
                                        horizontal={true}
                                        renderItem={({item}) => {                                            
                                            if(item.empty){
                                                return (
                                                    <TouchableHighlight 
                                                        underlayColor="rgb(210,210,210)"
                                                        style={styles.containerDefaultImageReport}
                                                        onPress={activeCamera}>
                                                        <Image 
                                                            source={cameraIcon}
                                                            resizeMode="contain"
                                                            style={{width: 40}}
                                                        />
                                                    </TouchableHighlight>
                                                )
                                            }else{
                                                return(
                                                    <View style={
                                                        item.selected ? styles.containerImageReport : styles.containerImageReportwoMargin                                            
                                                    }>                                            
                                                        <TouchableHighlight
                                                            underlayColor="rgba(0,0,0,0)"
                                                            onPress={() => { displayFullImage(item.uri) }}
                                                            onLongPress={() => { selectImage(item.uri) }}                                                
                                                            key={item.uri}                                                    
                                                        >                                             
                                                            <Image                                                                                        
                                                                source={{ uri: `${item.uri}`, isStatic: true}}
                                                                style={{ width: 100,height: 100 }} 
                                                            />
                                                        </TouchableHighlight>
                                                        {item.selected && (
                                                            <Button
                                                                small
                                                                danger
                                                                style={styles.deleteImgBtnReport}
                                                                onPress={() => { deleteImageReport(item.uri) }}
                                                            >
                                                                < Icon name="trash-o" color="white" size={15}/> 
                                                            </Button>
                                                        )}                                                
                                                    </View>
                                                )
                                            }
                                        }}
                                        keyExtractor={item => item.uri + Math.random().toString()}
                                    />     
                                </View>
                                <View style={styles.inputReportContainer}>
                                    <TextInput 
                                        value={inputReport}
                                        onChange={handleInputReport}
                                        placeholder="Agrega una descripción"
                                        style={styles.inputReport}
                                        multiline={true}
                                    />
                                </View>
                            </View>
                            <View style={styles.btnModalContainer}>                             
                                <Button
                                    success                                    
                                    rounded
                                    style={styles.btnModalReport}
                                    onPress={report}
                                >
                                    <View style={styles.iconBtnModalReport}>
                                        < Icon name="check" color="white" size={15}/>
                                    </View>                                    
                                </Button>
                            </View>
                            </>
                        </TouchableHighlight>
                    </View>  
                </TouchableHighlight>
            </Modal>
            <Button
                danger
                small
                onPress={startReporting}
                style={styles.btnInfoPlant}
            >
                <Icon name="question" color="rgb(0, 26, 0)" size={35}/>
            </Button>
        </>
    )
}

export default ReportPlant;