import React, { useState, useRef } from 'react'
import { View, TouchableHighlight, Image, Modal, Text } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'native-base';

import styles from '../styles/EmployeeScreenStyles'

const captureIcon = require('../assets/captura-icon.png');
const flashIcon = require('../assets/flash-icon.png');

function Camera({ active, takePicture, closeCamera, startRecording, stopRecording, labelRecording }){

    const [flash, setFlash] = useState(false)
    const cameraRef = useRef(null)

    const endRecording = () => {
        if(labelRecording){ stopRecording(cameraRef.current) }
    }

    const activeFlash = () => { setFlash(!flash) }

    return (
        <Modal
            transparent
            animationType="none"
            visible={active}
            onRequestClose={closeCamera}
        >
            <View style={styles.flex1}>

                <RNCamera   
                    ref={cameraRef}                 
                    style={styles.QRCamera}
                    type={RNCamera.Constants.Type.back}
                    flashMode={flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}   
                    captureAudio
                    orientation="portrait"
                    fixOrientation
                >
                    <View style={styles.cameraStyle}>
                        <View style={styles.btnsCloseReportCameraContainer}>
                            <View style={styles.btnsDivisionCloseReportCameraContainer}>
                                <View style={styles.btnDivisionCloseReportCameraContainer}>
                                    {labelRecording && <Text style={{ color: 'white' }}>Grabando</Text>}
                                </View>
                                <View style={styles.btnDivisionCloseReportCameraContainer}>
                                    <TouchableHighlight
                                        underlayColor="rgba(0,0,0,0)"
                                        onPress={activeFlash}
                                    >
                                        <View style={{alignItems: 'center'}}> 
                                            <Image 
                                                source={flashIcon}
                                                resizeMode="contain"
                                                style={{ height:30 }}
                                            />                                                 
                                        </View>                                            
                                    </TouchableHighlight>
                                </View> 
                                <View style={styles.btnDivisionCloseReportCameraContainer}>
                                    <TouchableHighlight
                                        underlayColor="rgba(0,0,0,0)"
                                        onPress={closeCamera}
                                    >
                                        < Icon name="close" color="white" size={30}/> 
                                    </TouchableHighlight>
                                </View> 
                            </View>                               
                        </View>                            
                        <Button
                            small
                            primary
                            onPress={() => takePicture(cameraRef.current)}
                            onLongPress={() => startRecording(cameraRef.current)}
                            onPressOut={endRecording}
                            style={styles.btnTakePicture}
                        >
                            <Image 
                                source={captureIcon}
                                resizeMode="contain"
                                style={{ width: 70 }}
                            />
                        </Button>
                    </View>
                </RNCamera>
        </View>
        </Modal>                    
    )
}

export default Camera
