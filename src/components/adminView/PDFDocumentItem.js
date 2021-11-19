import React, { useState, useContext } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles/AdminScreenSytles';
import Alert from '../Alert';
import { appContext } from '../../../App'

function PDFDocumentItem({ doc, navigation  }){

    const context = useContext(appContext)

    const [alertDeletePDF, setAlertDeletePDF] = useState(false)

    const renderBtnDelete = () => (
        <RectButton
            style={styles.btnDeletePdf}
            onPress={activeAlert}
        >
            <Icon name="trash" color="white" size={30}/>
        </RectButton>
    )

    const activeAlert = () => { setAlertDeletePDF(true) }

    const closeAlert = () => { setAlertDeletePDF(false) }

    const deletePDF = () => {
        context.dispatchDocuments({ type: 'REMOVE', value: doc })
    }

    const readPDF = () => {
        navigation.navigate('PDFreader', { path: doc.path })
    }

    return (
        <>
        <Alert 
            activeAlert={alertDeletePDF}
            title={'ELIMINAR DOCUMENTO'}
            body={'¿Está seguro que desea eliminar este documento?. \nSi lo elimina no será posible volver a acceder a el desde la aplicación.'}
            cancelFunction={closeAlert}
            okayFunction={deletePDF}
        />
        <Swipeable
            renderLeftActions={renderBtnDelete}
            overshootLeft={false}
        >
            <TouchableNativeFeedback onPress={readPDF}>
                <View style={styles.pdfDocumentItem}>
                    <Text style={styles.textpdfDocumentItem}>{doc.fileName.toUpperCase()}</Text>
                </View>
            </TouchableNativeFeedback>
        </Swipeable>
        </>
    )
}

export default PDFDocumentItem
