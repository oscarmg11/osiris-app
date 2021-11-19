import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';


import styles from '../../styles/ManagerScreenStyles';
import ChatItem from '../../components/adminView/ChatItem';
import { appContext } from '../../../App';

function ChatsScreen({ navigation }){

    const context = useContext(appContext)      

    return(
        <View style={styles.flex1}>
            <Text style={styles.chatTitle}>MENSAJES</Text>
            <View style={styles.chatsContainer}>
                <FlatList 
                    data={context.chats}
                    extraData={context.chats}
                    renderItem={({item}) => (
                        <ChatItem chat={item} navigation={navigation}/>
                    )}
                    keyExtractor={item => item._id}
                    style={styles.chatFlatlist}
                    contentContainerStyle={styles.flatListContentContainerChats}
                />
            </View>
        </View>
    )
}

export default ChatsScreen;