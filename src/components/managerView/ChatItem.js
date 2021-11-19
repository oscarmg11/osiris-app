import React, { useContext } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles/ManagerScreenStyles'
import { appContext } from '../../../App';

function ChatItem({ chat, navigation }) { 

    const context = useContext(appContext)   

    const gotoChat = () => {
        context.dispatchTabBarVisibleforQR({ type: 'SET', value: false })        
        navigation.navigate(`Chat${chat.from}` , { chatObject: chat })
    }

    return(
        <>
            <TouchableHighlight
                style={styles.containerBtnGotoChat} 
                onPress={gotoChat}                
            >
                <View style={styles.containerBtnGotoChatRow}>
                    <View style={styles.iconUser}>
                        < Icon name="user" color="white" size={30}/>
                    </View>
                    <Text style={styles.textTitleChat}>{chat.from}</Text>                    
                </View>
            </TouchableHighlight>
        </>
    )
}

export default ChatItem;