import React from 'react'
import { View, ActivityIndicator, Modal } from 'react-native'

function Loading({active}){
    return (
        <Modal
            transparent
            visible={active}
            animationType="none"
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color="green" size={40}/>
            </View>
        </Modal>
    )
}

export default Loading
