import React from 'react';
import {RNCamera} from 'react-native-camera';

import styles from '../../styles/EmployeeScreenStyles';

function QRScanner({onReadQR}){

    const onQRRead = (e) => {
        const {data} = e
        onReadQR(data)                
    }

    return(
        <>
            <RNCamera
                style={styles.QRCamera}
                onBarCodeRead={onQRRead}
                captureAudio={false}
            >

            </RNCamera>
        </>
    )
}

export default QRScanner;