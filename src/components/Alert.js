import React from 'react';
import { Modal, View, Text, TouchableHighlight } from 'react-native';

import styles from '../styles/AlertStyles';

function Alert({ activeAlert, title, body, okayFunction, cancelFunction }){
    return (
        <Modal
            transparent
            animationType="slide"
            visible={activeAlert}
        >
            <View style={styles.alertContainer}>
                <View style={styles.alert}>
                    <View style={styles.flex1}>
                        <View style={styles.alertTitleContainer}>
                            <Text style={styles.alertTitle}>{title}</Text>
                        </View>
                        <View style={styles.alertBodyContainer}>
                            <Text style={styles.alertText}>{body}</Text>
                        </View>
                        <View style={styles.alertFooterContainer}>
                            <TouchableHighlight
                                underlayColor="rgba(0,0,0,0)"
                                onPress={cancelFunction}
                                style={styles.btnAlert}
                            >
                                <Text style={styles.textBtnCancel}>CANCELAR</Text>
                            </TouchableHighlight> 
                            <TouchableHighlight
                                underlayColor="rgba(0,0,0,0)"
                                onPress={okayFunction}
                                style={styles.btnAlert}
                            >
                                <Text style={styles.textBtnOk}>OK</Text>
                            </TouchableHighlight>                            
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default Alert
