import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableHighlight, TextInput, Image, TouchableNativeFeedback, Keyboard} from 'react-native'
import { Button }  from 'native-base';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import Camera from '../../components/Camera';
import Loading from '../../components/Loading';
import styles from '../../styles/AdminScreenSytles';
import { url, messageServerError, messageTokenError } from '../../../app.json'

function ModalEditUser({ user, activeModal, closeModal, updateUsers }){

    const [userName, setUserName] = useState('')
    const [photo, setPhoto] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [plants, setPlants] = useState('0000')
    const [activeCamera, setActiveCamera] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [token, setToken] = useState('')

    const openCamera = () => { setActiveCamera(true) }

    const handleInputUserName = (e) => {
        let { text } = e.nativeEvent
        setUserName(text)
    }

    const handlePassword = (e) => {
        let { text } = e.nativeEvent
        setPassword(text)
    }

    const handleConfirmPassword = (e) => {
        let { text } = e.nativeEvent
        setConfirmPassword(text)
    }

    const handleInputPlants = (e) => {
        let { text } = e.nativeEvent
        setPlants(text.replace(/[^0-9]/g, ''))
    }

    const handleInputName = (e) => {
        let { text } = e.nativeEvent
        setName(text)
    }

    const handleInputAddress = (e) => {
        let { text } = e.nativeEvent
        setAddress(text)
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
        setUserName(user.userName)
        setName(user.name)
        setAddress(user.address)
        if(user.rol === "owner"){ setPlants(user.nPlants) }
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );
      
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [user])

    const updateUser = () => {
        if(updatePassword){
            if(password === confirmPassword){
                setUpdating(true)
                fetchPassword().then(({user}) => {
                    updateUsers(user)
                    setUpdating(false)
                    doBeforCloseModal()
                }).catch(() => {
                    alert(`${messageServerError}`)
                    setUpdating(false)
                })
            }else{ alert('Las contraseñas deben coincidir') } 
        }else{
            setUpdating(true)
            if(photo !== ""){
                let data = {
                    id: user._id,
                    userName,
                    address,
                    name
                }
                if(user.rol === "owner"){  data.plants = plants  }
                let formData = createFormData(data)
                fetchUserwPhoto(formData).then( ({user}) => {
                    updateUsers(user)
                    setUpdating(false)
                    doBeforCloseModal()
                }).catch(() => {
                    alert(`${messageServerError}`)
                    setUpdating(false)
                })
            }else{
                fetchUser().then(({user}) => {
                    fetchPassword(user)
                    setUpdating(false)
                    doBeforCloseModal()
                }).catch(() => {
                    alert(`${messageServerError}`)
                    setUpdating(false)
                })
                
            }
        }
        
    }

    const fetchUserwPhoto = async (data)  => {
        let res = await axios({
            method: 'PUT',
            url : `${url}/user/updatewphoto`,
            data,
            headers: { 'authorization': token },
            timeout: 5000
        })
        return res.data
    }

    const fetchUser = async ()  => {
        let data = {
            id: user._id,
            userName,
            address,
            name
        }
        if(user.rol === "owner"){  data.plants = plants  }
        let res = await axios({
            method: 'PUT',
            url : `${url}/user/update`,
            data,
            headers: { 'authorization': token },
            timeout: 5000
        })
        return res.data
    }

    const fetchPassword = async ()  => {
        let data = { password, id: user._id }        
        let res = await axios({
            method: 'PUT',
            url : `${url}/user/password`,
            data,
            headers: { 'authorization': token },
            timeout: 5000
        })
        return res.data
    }

    const closeCamera = () => { setActiveCamera(false) }

    const takePicture = async (camera) => {
        const data = await camera.takePictureAsync({ quality: 0.5 });        
        closeCamera()
        setPhoto(data.uri)       
    }; 

    const changePassword = () => setUpdatePassword(!updatePassword)

    const doBeforCloseModal = () => {
        setUpdatePassword(false)
        closeModal()
    }

    return (
        <>
        <Loading active={updating}/>
        <Camera 
            active={activeCamera}
            closeCamera={closeCamera}
            takePicture={takePicture}
        />
        <Modal
            transparent
            visible={activeModal}
            animationType="fade"
            onRequestClose={doBeforCloseModal}
        >
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0)" 
                onPress={doBeforCloseModal}
                style={styles.modalContainer}
            >
                <TouchableHighlight
                    underlayColor="rgb(255,255,255)"
                    onPress={() => {}}
                    style={styles.modalNewSectionsBody}
                >
                    <View style={styles.modalBody}>
                        <View style={styles.modalContent}>
                            {updatePassword ? (
                                <>
                                <Text style={styles.labelInputModalEditUser}>CONTRASEÑA</Text>
                                <TextInput 
                                    value={password}
                                    onChange={handlePassword}
                                    style={styles.inputEditUser}
                                    secureTextEntry
                                />
                                <Text style={styles.labelInputModalEditUser}>CONFIRMAR CONTRASEÑA</Text>
                                <TextInput 
                                    value={confirmPassword}
                                    onChange={handleConfirmPassword}
                                    style={styles.inputEditUser}
                                    secureTextEntry
                                />
                                </>
                            ): (
                                <>
                                {(user.photo || photo !== "") && !isKeyboardVisible && (
                                    <View style={styles.btnCameraModalEditUser}>
                                    <TouchableNativeFeedback onPress={openCamera}>
                                        <Image 
                                            source={ photo !== "" ? { uri: photo } : { uri: user.photo }}
                                            style={styles.thumbnailMini}
                                        />
                                    </TouchableNativeFeedback>
                                    </View>
                                )} 
                                <Text style={{...styles.labelInputModalEditUser, marginTop: 20}}>NOMBRE</Text>
                                <TextInput 
                                    value={name}
                                    onChange={handleInputName}
                                    style={styles.inputEditUser}
                                />                           
                                <Text style={styles.labelInputModalEditUser}>USUARIO</Text>
                                <TextInput 
                                    value={userName}
                                    onChange={handleInputUserName}
                                    style={styles.inputEditUser}
                                />
                                <Text style={styles.labelInputModalEditUser}>DIRECCIÓN</Text>
                                <TextInput 
                                    value={address}
                                    onChange={handleInputAddress}
                                    style={styles.inputEditUser}
                                />
                                {user.rol === "owner" && (
                                    <>                                      
                                        <Text style={styles.labelInputModalEditUser}>NÚMERO DE PLANTAS</Text> 
                                        <TextInput 
                                            value={plants}
                                            onChange={handleInputPlants}
                                            style={styles.inputEditUser}
                                            keyboardType="numeric"
                                        />
                                    </>
                                )}
                            
                                </>
                            )}
                        </View>
                        <View style={styles.footerModal}>
                            <Button
                                onPress={changePassword}
                                style={styles.btnEditPasswordUser}
                            >
                                <Text style={styles.textBtnSaveEditUser}>{ updatePassword ? 'CANCELAR' : 'CAMBIAR CONTRASEÑA' }</Text>
                            </Button>
                        </View>
                        <View style={styles.footerModal}>
                            <Button
                                onPress={updateUser}
                                style={styles.btnSaveEditUser}
                            >
                                <Text style={styles.textBtnSaveEditUser}>GUARDAR</Text>
                            </Button>
                        </View>
                    </View>
                </TouchableHighlight>
            </TouchableHighlight>
        </Modal>
        </>
    )
}

export default ModalEditUser
