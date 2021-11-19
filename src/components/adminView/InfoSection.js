import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, FlatList } from 'react-native';

import styles from '../../styles/AdminScreenSytles';

function InfoSection({ employees, plants, section, infoType }){

    const [orientation, setOrientation] = useState('portrait')

    const handleOrientation = () => {
        const { width, height } = Dimensions.get('window')
        if(width > height){ setOrientation('landscape') }
        else{ setOrientation('portrait') }
    }

    useEffect(() => {
        Dimensions.addEventListener('change', handleOrientation);
        return () => Dimensions.removeEventListener('change', handleOrientation)
    },[])

    return (
        <> 
        <Text style={styles.infoTitle}>INFORMACIÓN DE LA SECCIÓN</Text>
        <View style={styles.infoTitleContainer}>
            <Text style={styles.infoTitle}>SECCIÓN {section.sectionName.toUpperCase()}</Text>
        </View>
        <View style={ styles.rowInfoSectionLabelContainer}>
            <View style={styles.infoSectionLabelsContainer}>
                <Text style={styles.labelInfoSection}>PLANTAS: {section.plants}</Text>
                <Text style={styles.labelInfoSection}>TEMPERATURA: {section.temperature} °C</Text> 
                <Text style={styles.labelInfoSection}>EMPLEADOS:</Text>
                <View style={{ paddingLeft: 10 }}>
                    {employees.map( employee => (
                        <Text key={employee._id} style={styles.employeesInfoSection}>{employee.name.toUpperCase()}</Text>
                    ) )}
                </View>
            </View> 
            <View style={styles.thumbnailInfoSectionContainer}>
                    {employees.map( employee => (
                    <Image 
                        source={{ uri: employee.photo }}
                        style={{...styles.thumbnail, marginVertical: 5}}
                        key={employee._id}
                        />
                ) )}
            </View>
        </View>
         <View style={ orientation === "portrait" ? styles.rowTableInfoSectionHeader: styles.rowTableInfoSectionHeaderLandscape}>
            <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                <Text style={styles.rowTableInfoSectionTitle}>PLANTA</Text>
            </View>
            {infoType === "numberFruits" && (
                <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                    <Text style={styles.rowTableInfoSectionTitle}>FRUTOS</Text>
                </View>
            )}
            {infoType === "height" && (
                <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                    <Text style={styles.rowTableInfoSectionTitle}>ALTURA</Text>
                </View>
            )}
            {infoType === "width" && (
                <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                    <Text style={styles.rowTableInfoSectionTitle}>ANCHO</Text>
                </View>
            )}
            {infoType === "type" && (
                <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                    <Text style={styles.rowTableInfoSectionTitle}>TIPO</Text>
                </View>
            )}
            {infoType === "plague" && (
                <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                    <Text style={styles.rowTableInfoSectionTitle}>REPORTE</Text>
                </View>
            )}
        </View>  
        <FlatList 
            data={plants}
            extraData={plants}
            renderItem={({item}) => (
                <View style={ orientation === "portrait" ? styles.rowTableInfoSectionHeader: styles.rowTableInfoSectionHeaderLandscape} key={item._id}>
                    <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                        <Text style={styles.textTableInfoSection}>{item.name}</Text>
                    </View>
                    {infoType === "numberFruits" && (
                        <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                            <Text style={styles.textTableInfoSection}>{item.numberFruits}</Text>
                        </View>
                    )}
                    {infoType === "height" && (
                        <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                            <Text style={styles.textTableInfoSection}>{item.height}</Text>
                        </View>
                    )}
                    {infoType === "width" && (
                        <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                            <Text style={styles.textTableInfoSection}>{item.width}</Text>
                        </View>
                    )}
                    {infoType === "type" && (
                        <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                            <Text style={styles.textTableInfoSection}>{item.type}</Text>
                        </View>
                    )}
                    {infoType === "plague" && (
                        <View style={ orientation === "portrait" ? styles.cellTableInfoSection: styles.cellTableInfoSectionLandscape }>
                            {item.statusReported ? (
                                <Text style={{...styles.textTableInfoSection, color: 'black', fontFamily: 'Montserrat-SemiBold'}}>Con Reporte</Text>
                            ) : <Text style={styles.textTableInfoSection}>Sin Reporte</Text>}
                            
                        </View>
                    )}
                </View>
            )}
            keyExtractor={ item => item._id}
        />
        </>
    )
}

export default InfoSection
