import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Pdf from 'react-native-pdf';

import Loading from '../../components/Loading'
import styles from '../../styles/AdminScreenSytles';

function PDFReader({ route }){

    const [loading, setLoading] = useState(true)
    const [pathPDF, setPathPDF] = useState('')

    useEffect(() => {
        const { path } = route.params
        if(path){
            setLoading(false)
            setPathPDF(`file://${path}`)
        }
    },[])

    const PDFLoaded = () => {

    }

    return (
        <View style={styles.pdfContainer}>
            <Pdf 
                source={{ uri: pathPDF }}
                style={styles.pdf}
                activityIndicator={<Loading active={true}/>}
            />
        </View>
    )
}

export default PDFReader
