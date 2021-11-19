import React from 'react'
import { View, Text, Modal, TouchableHighlight, Dimensions } from 'react-native'

import Checkbox from '../Checkbox'
import styles from '../../styles/AdminScreenSytles'

function ModalSections({ active, sections, closeModal, sectionsChecked, updateSections }){

    const checkIfSectionIsChecked = (sectionName) => {
        let index = sectionsChecked.split('-').findIndex( name => sectionName === name)
        if(index >= 0){ return true }
        else{ return false }
    }

    const handleChecbox = (value) => {
        updateSections(value)
    }


    return (
        <Modal
            visible={active}
            transparent
            animationType="none"
        >
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0)"
                onPress={closeModal}
                style={{...styles.flex1, justifyContent: 'center', alignItems: 'center'}}
            >
                <TouchableHighlight
                    underlayColor="rgb(255, 255, 255)"
                    onPress={() => {}}
                    style={{...styles.modalSections, height: Dimensions.get('window').height * 0.05 * sections.length}} 
                >
                    <View style={{...styles.modalBody, height: sections.length * Dimensions.get('window').height * 0.07 }}>
                        {sections.map( section => (
                            <Checkbox 
                                user={section} 
                                key={section._id} 
                                checked={checkIfSectionIsChecked(section.sectionName)}
                                setCheckbox={handleChecbox}
                            />
                        ))}
                    </View>
                </TouchableHighlight>
            </TouchableHighlight>
        </Modal>
    )
}

export default ModalSections
