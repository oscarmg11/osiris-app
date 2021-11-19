import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import PDFDocumentItem from '../../components/adminView/PDFDocumentItem';
import BtnAdd from '../../components/BtnAdd';
import styles from '../../styles/AdminScreenSytles';
import { messageDocsError } from '../../../app.json';
import { appContext } from '../../../App';

function PDFScreen({ navigation }){

    const context = useContext(appContext)

    useEffect(() => {
        getDocuments().then( docs => {
            context.dispatchDocuments({ type: 'SET', value: docs })
        })
    }, [])

    useEffect(() => {
        setDocuments(context.documents)
    }, [context.documents])

    const getDocuments = async () => {
        try{
            let doc = await AsyncStorage.getItem('@documents')
            if(doc){
                return JSON.parse(doc)
            }
            return []
        }catch(e){
            alert(`${messageDocsError}`)
        }
    }

    const setDocuments = async (newDocuments) => {
        try{
            await AsyncStorage.setItem('@documents', JSON.stringify(newDocuments))
        }catch(e){
            alert(`${messageDocsError}`)
        }
    }

    const gotoCreatePDF = () => navigation.navigate('PDFCreate')

    return (
        <View style={styles.bodyCreateUser}>
            < BtnAdd onPress={gotoCreatePDF}/>
            <Text style={styles.pdfTitle}>DOCUMENTOS</Text>
            <View style={styles.listPDFContainer}>
                {context.documents.length === 0 ? (
                    <Text style={styles.labelEmptyPdf}>Todavía no hay ningún documento.</Text>
                ): (
                    <FlatList 
                        data={context.documents}
                        extraData={context.documents}
                        renderItem={({item}) => (
                            < PDFDocumentItem doc={item} navigation={navigation}/>
                        )}
                        keyExtractor={item => item.fileName + Math.random().toString()}
                    />
                )}
            </View>
            
        </View>
    )
}

export default PDFScreen
