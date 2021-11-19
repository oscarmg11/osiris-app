import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, TouchableNativeFeedback, Image, Modal } from 'react-native'
import { Button, Toast } from 'native-base';
import SignatureCapture from 'react-native-signature-capture';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment'
import { Line } from 'react-native-svg';

import Camera from '../../components/Camera'
import Loading from '../../components/Loading'
import styles from '../../styles/AdminScreenSytles';
import { url, messageServerError, messageTokenError } from '../../../app.json';

const cameraIcon = require('../../assets/camara-icon.png')

function CreateBuyScreen({ navigation }){

    const date = moment().format('DD/MM/YYYY')

    let signCapture = useRef(null)

    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [weight, setHeight] = useState('')
    const [total, setTotal] = useState('')
    const [photo, setPhoto] = useState('')
    const [sign, setSign] = useState('')
    const [section, setSection] = useState("");
    const [day, setDay] = useState(`${date.split('/')[0]}`);
    const [month, setMonth] = useState(`${date.split('/')[1]}`);
    const [year, setYear] = useState(`${date.split('/')[2]}`);
    const [activeCamera, setActiveCamera] = useState(false)
    const [activeSign, setActiveSign] = useState(false)
    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(false)

    const closeCamera = () => { setActiveCamera(false) }

    const openCamera = () => setActiveCamera(true)

    const handleInputName = (e) => {
        let { text } = e.nativeEvent
        setName(text)
    }

    const handleInputSection = (e) => {
        let { text } = e.nativeEvent
        setSection(text)
    }

    const handleInputHeight = (e) => {
        let { text } = e.nativeEvent
        setHeight(text.replace(/[^0-9]/g, ''))
    }

    const handleInputTotal = (e) => {
        let { text } = e.nativeEvent
        setTotal(text.replace(/[^0-9]/g, ''))
    }

    const handleInputDay = (e) => {
        let { text } = e.nativeEvent
        if(text.length < 3 && Number(text.replace(/[^0-9]/g, '')) <= 31){
            setDay(text.replace(/[^0-9]/g, ''))
        }
    }

    const handleInputMonth = (e) => {
        let { text } = e.nativeEvent
        if(text.length < 3 && Number(text.replace(/[^0-9]/g, '')) <= 12){
            setMonth(text.replace(/[^0-9]/g, ''))
        }
    }

    const handleInputYear = (e) => {
        let { text } = e.nativeEvent
        if(text.length < 5){
            setYear(text.replace(/[^0-9]/g, ''))
        }
    }

    const takePicture = async (camera) => {
        const data = await camera.takePictureAsync({ quality: 0.5 });        
        setPhoto(data.uri)
        closeCamera()    
    };

    const postBuy = async (data) => {
        let res = await axios({
            method: "POST",
            url: `${url}/buy`,
            headers: { 'authorization': token},
            timeout: 5000,
            data
        })
        return res.data
    }

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

    const normalizaText = (text) => {
        return text
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
        .normalize()
        .toUpperCase()
    }

    const createFormData = (body) => {        
        let data = new FormData(); 
        data.append('buy', {
            type: 'image/jpg',
            uri: photo,
            name: `${name.replace(/\s+/g, '-')}_photo_${new Date().toISOString().replace(/:/g, '-')}.jpg`
        })
        data.append('buy', {
            type: 'image/png',
            uri: sign,
            name: `${name.replace(/\s+/g, '-')}_sign_${new Date().toISOString().replace(/:/g, '-')}.png`
        })         
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        
        return data;
    }

    useEffect(() => {
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
        }
        getTokenFromAsyncStorage()
    }, [])

    const openSign = () => {
        if(!signed) setActiveSign(true)
        else{
            if(!checkForm()){ return alert('Llena todos los campos') }
            setLoading(true)
            let data = createFormData({
                name: normalizaText(name),
                weight: Number(weight),
                total: Number(total),
                section: section.toUpperCase(),
                date: `${day}/${month}/${year}`
            })
            postBuy(data).then( ({created, buy}) => {
                if(created){
                    setLoading(false)
                    RNFetchBlob.fs.unlink(sign).then(() => {
                        Toast.show({
                            text: 'Se ha guardado la compra correctamente!',
                            duration: 3000,
                            type: 'success',
                            position: 'bottom'
                        })
                        const newBuy = {
                            ...buy,
                            weight: Number(buy.weight),
                            total: Number(buy.total)
                        }
                        navigation.navigate('Buys', { buy: newBuy, type: 'ADD' })
                    }).catch(() => {})
                }
            }).catch((e) => {
                setLoading(false)
                alert(`${messageServerError}`)
            })
        } 
    }
    const checkForm = () => {
        if(photo !== "" && name !== "" && section !== "" && day !== "" && month !== "" 
        && year !== "" && weight !== "" && total !== "" && sign !== ""){
            return true
        }else{ return false }
    }

    const handleSign = (res) => {
        setSign(`file://${res.pathName}`)
        setSigned(true)
        setActiveSign(false)
    }

    const onPressSign = () => signCapture.current.saveImage()

    const resetSign = () => signCapture.current.resetImage()

    return (
        <View style={styles.createBuyFormContainer}> 
            <Loading active={loading}/>
            <Camera 
                active={activeCamera}
                closeCamera={closeCamera}
                takePicture={takePicture} 
            />
            <Text style={styles.titleNewSection}>NUEVA VENTA</Text>
            {photo !== "" ? (
                <TouchableNativeFeedback
                    onPress={openCamera} 
                >
                    <Image 
                        source={{ uri: photo }}
                        style={styles.thumbnail}
                    />
                </TouchableNativeFeedback>
            ) : (
                <Button
                    style={styles.thumbnailwoPhoto}
                    onPress={openCamera}
                >
                    <Image 
                        source={cameraIcon}
                        style={{ width: 40 }}
                        resizeMode="contain"
                    />
                </Button>
            )}
            <Text style={{...styles.labelInputModalEditUser, marginTop: 10}}>VENDEDOR (Nombre Completo)</Text>
            <TextInput 
                value={name}
                onChange={handleInputName}
                style={styles.inputEditUser}
            />
            <Text style={styles.labelInputModalEditUser}>PESO (kg)</Text>
            <TextInput 
                value={weight}
                onChange={handleInputHeight}
                style={styles.inputEditUser}
                keyboardType="numeric"
            />
            <Text style={styles.labelInputModalEditUser}>PRECIO</Text>
            <TextInput 
                value={total}
                onChange={handleInputTotal}
                style={styles.inputEditUser}
                keyboardType="numeric"
            />
            <Text style={styles.labelInputModalEditUser}>SECCIÓN DE DESHIDRATADO</Text>
            <TextInput 
                value={section}
                onChange={handleInputSection}
                style={styles.inputEditUser}
            />
            <Text style={styles.labelInputModalEditUser}>FECHA</Text>
            <View style={styles.inputPlantsModalNewSections}>
                <View style={styles.textDateNewBuy}>
                    <Text style={{ fontFamily: 'Montserrat-Light' }}>{day}</Text>
                </View>
                <Text> / </Text>
                <View style={styles.textDateNewBuy}>
                    <Text style={{ fontFamily: 'Montserrat-Light' }}>{month}</Text>
                </View>
                <Text> / </Text>
                <View style={styles.textDateNewBuy}>
                    <Text style={{ fontFamily: 'Montserrat-Light' }}>{year}</Text>
                </View>
            </View>
             <Button
                style={{...styles.btnSaveEditUser, marginTop: 10}}
                onPress={openSign}
            >
                <Text style={styles.textBtnSaveEditUser}>{signed ? 'GUARDAR' : 'FIRMAR'}</Text>
            </Button>
            <Modal
                visible={activeSign}
                animationType="none"
                onRequestClose={() => setActiveSign(false)}
            >
                <View style={styles.flex1}>
                    <View style={styles.signatureLine}>
                    </View>
                    <Text style={styles.signatureLabel}>FIRMA</Text>
                    <SignatureCapture
                        style={[styles.flex1,styles.flex1]}
                        onSaveEvent={handleSign}
                        showNativeButtons={false}
                        saveImageFileInExtStorage
                        viewMode="portrait"
                        ref={signCapture}
                    />
                    <View style={styles.btnSignCaptureContainer}>
                        <Button onPress={resetSign} style={styles.btnSaveEditUser}>
                            <Text style={styles.textBtnSaveEditUser}>BORRAR FIRMA</Text>
                        </Button>
                        <Button onPress={onPressSign} style={styles.btnSaveEditUser}>
                            <Text style={styles.textBtnSaveEditUser}>GUARDAR FIRMA</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CreateBuyScreen
