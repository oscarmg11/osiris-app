import React, { useState, useRef, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Button, Toast }  from 'native-base'

import InputNamePdf from '../../components/adminView/InputNamePdf';
import CreatePDF from '../../components/adminView/CreatePDF';
import styles from '../../styles/AdminScreenSytles'
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';
import { appContext } from '../../../App'

function PDFCreateScreen({ navigation }){

    const context = useContext(appContext)

    const CreatePDFRef = useRef()

    const [namePDF, setNamePDF] = useState('')
    const [stepCreatingPDF, setStepCreatingPDF] = useState(false)
    const [activeAlert, setActiveAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ctrlPressingOnce, setCtrlPressingOnce] = useState(true)

    const setNameDocument = name => {
        setNamePDF(name)
    }

    const next = () => {
        if(stepCreatingPDF){ setActiveAlert(true) }
        else{
            if(namePDF !== ""){ setStepCreatingPDF(true) }
        }
    }

    const closeAlert = () => { setActiveAlert(false) } 

    const createPDF = async () => { 
        if(ctrlPressingOnce){
            setCtrlPressingOnce(false)
            setLoading(true)
        }
    }

    useEffect(() => {
        if(!ctrlPressingOnce){
            CreatePDFRef.current.createPDF().then( path => {
                setLoading(false)
                closeAlert()
                context.dispatchDocuments({ type: 'ADD', value: { path, fileName: namePDF, id: Math.random() + Date.now() } })
                Toast.show({
                    text: 'Se ha creado el documento exitosament!',
                    type: 'success',
                    duration: 3000,
                    position: 'bottom'
                })
                navigation.navigate('PDF')
            }).catch( () => {
                setLoading(false)
                closeAlert()
                alert(`${messageCreateDocError}`)
            })
        }
    },[ctrlPressingOnce])


    return (
        <View style={styles.containerPdf}>
            <Loading active={loading}/>
            {stepCreatingPDF ? (
                < CreatePDF ref={CreatePDFRef} namePDF={namePDF}/>
            ): (
                < InputNamePdf setNameDocument={setNameDocument}/>
            )}
            <Button
                onPress={next}
                style={styles.btnOwner}
            >
                <Text style={styles.textBtnEditMap}>{stepCreatingPDF ? 'CREAR': 'SIGUIENTE'}</Text>
            </Button>
            <Alert 
                activeAlert={activeAlert}
                title={'CREAR PDF'}
                body={'¿Estás seguro que quieres crear un archivo PDF con estas imagenes?'}
                cancelFunction={closeAlert}
                okayFunction={createPDF}
            />
        </View>
    )
}

export default PDFCreateScreen
