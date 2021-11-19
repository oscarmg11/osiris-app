import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'

import styles from '../../styles/AdminScreenSytles'

function InputNamePdf({ setNameDocument }){

    const [namePDF, setNamePDF] = useState('')

    const handleInput = e => {
        let { text } = e.nativeEvent
        setNamePDF(text)
        setNameDocument(text)
    }

    return (
        <>
            <Text style={styles.labelInputNamePdf}>NOMBRE DEL DOCUMENTO</Text>
            <TextInput 
                value={namePDF}
                onChange={handleInput}
                style={styles.inputNamePdf}
            />
        </>
    )
}

export default InputNamePdf
