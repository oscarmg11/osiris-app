import React, { useState, useEffect } from 'react'
import { View, Text, Picker, TextInput, Modal, TouchableHighlight, Image, ScrollView, TouchableNativeFeedback } from 'react-native'
import {Button, Toast} from 'native-base'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'

import Camera from '../../components/Camera'
import Loading from '../../components/Loading'
import styles from '../../styles/AdminScreenSytles'
import { url, messageServerError, messageTokenError } from '../../../app.json';

const cameraIcon = require('../../assets/camara-icon.png')

function NewUserScreen({ navigation, route }){

    const [newUserRol, setNewUserRol] = useState('employee')
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')    
    const [photo, setPhoto] = useState('')
    const [password, setPassword] = useState('')
    const [plants, setPlants] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, setToken] = useState('')
    const [errPassword, setErrPassword] = useState(false)
    const [errIncomplete, setErrIncomplete] = useState(false)
    const [errMissingPhoto, setErrMissingPhoto] = useState(false)
    const [activeCamera, setActiveCamera] = useState(false)
    const [modalPhoto, setModalPhoto] = useState(false)
    const [loading, setLoading] = useState(false)

    const openCamera = () => setActiveCamera(true)

    const handlePlants = (e) => {
        let { text } = e.nativeEvent
        setErrIncomplete(false)
        setErrPassword(false)
        setPlants(text.replace(/[^0-9]/g, ''))
    }

    const handleInputName = (e) => {
        let { text } = e.nativeEvent
        setErrIncomplete(false)
        setErrPassword(false)
        setName(text)
    }

    const handleInputAddress = (e) => {
        let { text } = e.nativeEvent
        setErrIncomplete(false)
        setErrPassword(false)
        setAddress(text)
    }

    const handleInputUserName = (e) => {
        let { text } = e.nativeEvent
        setUserName(text)
        setErrIncomplete(false)
        setErrPassword(false)
    }

    const handleInputPassword = (e) => {
        let { text } = e.nativeEvent
        setPassword(text)
        setErrIncomplete(false)
        setErrPassword(false)
    }

    const handleInputConfirmPassword = (e) => {
        let { text } = e.nativeEvent
        setConfirmPassword(text)
        setErrIncomplete(false)
        setErrPassword(false)
    }

    const handleBtn = () => {
        if( name !== "" && userName !== "" && (password === confirmPassword) 
        && password !== "" && confirmPassword !== "" && photo !== "" && address !== ""){
            if(newUserRol === "owner"){
                if(plants !== ""){ createUser() }
                else{ setErrIncomplete(true) }
            }else{ createUser() }
        }else{
            if(password !== confirmPassword){ setErrPassword(true) }
            if(name === "" || userName === "" || password === "" || confirmPassword === "" || address === "" 
                || (newUserRol === "owner" && plants === "")){ setErrIncomplete(true) }
            if(photo === ""){ setErrMissingPhoto(true) }
        }
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

    const createFormData = (body) => {        
        let data = new FormData();
        data.append('photo', {
            type: 'image/jpg',
            uri: photo,
            name: `${userName.replace(/\s+/g, '-')}_photo_${new Date().toISOString().replace(/:/g, '-')}.jpg`
        })          
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        
        return data;
    }

    const createUser = () => {
        setLoading(true)
        let data = {
            userName,
            password,
            address,
            name,
            rol: newUserRol
        }        
        if(newUserRol === "owner"){ data.plants = plants }
        let FormData = createFormData(data)

        fetchNewUser(FormData).then( ({user}) => {
            setLoading(false)
            Toast.show({
                text: 'Se ha creado un nuevo usuario correctamente!',
                duration: 3000,
                type: "success",
                position: 'bottom'
            })
            navigation.navigate('Users')
        }).catch( (e) => {
            setLoading(false)
            if(e.response.status=== 400){ alert(e.response.data) }
            else{ 
                alert(`${messageServerError}`) 
                navigation.navigate('Users')
            }
        })
    }

    const fetchNewUser = async (data) => {
        let res = await axios({
            method: 'POST',
            url: `${url}/user/create`,
            headers: { 'authorization': token },
            data
        })                
        return res.data
    }

    useEffect(() => {
        const { rol } = route.params
        setNewUserRol(rol)
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
        }
        getTokenFromAsyncStorage()
    }, [])

    const takePicture = async (camera) => {
        setErrMissingPhoto(false)
        const data = await camera.takePictureAsync({ quality: 0.5 });        
        closeCamera()
        setPhoto(data.uri)       
    };

    const closeCamera = () => { setActiveCamera(false) }

    return ( 
        <View style={styles.bodyCreateUser}>
            <Modal
                visible={modalPhoto}
                animationType="fade"
            >
                <TouchableHighlight
                    onPress={() => setModalPhoto(false)}
                    underlayColor="rgba(0,0,0,0)"
                    style={styles.flex1}
                >
                    <Image 
                        source={{ uri: photo }}
                        resizeMode="contain"
                        style={styles.fullImage}
                    />
                </TouchableHighlight>
            </Modal>
            <Camera 
                active={activeCamera}
                closeCamera={closeCamera}
                takePicture={takePicture} 
            />
            < Loading active={loading}/>
            <View style={{ flex: 8 }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.viewNewUser}>
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
                    <Text style={{...styles.labelInputModalEditUser, marginTop: 10}}>NOMBRE</Text>
                    <TextInput 
                        value={name}
                        onChange={handleInputName}
                        style={styles.inputEditUser}
                    />
                    <Text style={styles.labelInputModalEditUser}>DIRECCIÓN</Text>
                    <TextInput 
                        value={address}
                        onChange={handleInputAddress}
                        style={styles.inputEditUser}
                    />
                    <Text style={styles.labelInputModalEditUser}>USUARIO</Text>
                    <TextInput 
                        value={userName}
                        onChange={handleInputUserName}
                        style={styles.inputEditUser}
                    />
                    <Text style={styles.labelInputModalEditUser}>CONTRASEÑA</Text>
                    <TextInput 
                        value={password}
                        onChange={handleInputPassword}
                        style={styles.inputEditUser}
                        secureTextEntry
                    />
                    <Text style={styles.labelInputModalEditUser}>CONFIRMAR CONTRASEÑA</Text>
                    <TextInput 
                        value={confirmPassword}
                        onChange={handleInputConfirmPassword}
                        style={styles.inputEditUser}
                        secureTextEntry
                    />
                    {newUserRol === "owner" && (
                        <>
                            <Text style={styles.labelInputModalEditUser}>NÚMERO DE PLANTAS</Text> 
                            <TextInput 
                                value={plants}
                                onChange={handlePlants}
                                style={styles.inputEditUser}
                                keyboardType="numeric"
                            />
                        </>
                    )}
                    <View style={styles.rowInputEditUser}>
                        <View style={styles.rowInputEditUserLabelContainer}>
                            <Text style={styles.labelInputModalEditUserRow}>ROL</Text>
                        </View>
                        <View style={styles.rowInputEditUserInputContainer}>
                        <Picker
                            onValueChange={ value => setNewUserRol(value) }
                            selectedValue={newUserRol}
                        >
                            <Picker.Item value="employee" label="Empleado"/>
                            <Picker.Item value="manager" label="Asistente"/>
                            <Picker.Item value="owner" label="Propietario"/>
                        </Picker>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={(errPassword || errIncomplete || errMissingPhoto) ? { flex: 2, alignItems: 'center' } : { flex: 1, alignItems: 'center' }}>
                <Button
                    style={{...styles.btnSaveEditUser, marginTop: 10}}
                    onPress={handleBtn}
                >
                    <Text style={styles.textBtnSaveEditUser}>GUARDAR</Text>
                </Button>
                {errPassword && <Text style={{ color: 'red' }}>Las contraseñas no coinciden</Text>}
                {errIncomplete && <Text style={{ color: 'red' }}>Debes llenar todos los campos</Text>}
                {errMissingPhoto && <Text style={{ color: 'red' }}>Debes tomar una foto antes de continuar</Text>}
            </View>
        </View>
    )
}

export default NewUserScreen
