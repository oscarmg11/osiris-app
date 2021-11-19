import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Modal, TouchableHighlight, TextInput, FlatList, Image, TouchableNativeFeedback } from 'react-native'
import { Picker, Button, Toast } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import io from 'socket.io-client';

import { appContext } from '../../../App';
import Camera from '../Camera';
import Loading from '../Loading';
import styles from '../../styles/ManagerScreenStyles';
import { url, messageServerError, messageTokenError } from '../../../app.json';

const cameraIcon = require('../../assets/camara-icon.png');

function ModalTask({ activeModal, closeModal, plants, plantsAlreadyOrdenated, userName, updateEmployees }){

    const context = useContext(appContext)

    let defaultImages = [{
        uri: '1',
        empty: true,
        selected: false
    },{
        uri: '2',
        empty: true,
        selected: false
    },{
        uri: '3',
        empty: true,
        selected: false
    }]

    const [titleTask, setTitleTask] = useState('Regar')
    const [descriptionTask, setDescriptionTask] = useState('')
    const [token, setToken] = useState(""); 
    const [uriVideo, setUriVideo] = useState(""); 
    const [imagetoFullImage, setImagetoFullImage] = useState('')
    const [cameraActive, setActiveCamera] = useState(false)
    const [seeMedia, SetSeeMedia] = useState(false)
    const [images, setImages] = useState(defaultImages)
    const [fullImage, setFullImage] = useState(false)
    const [fullVideo, setFullVideo] = useState(false)
    const [labelRecording, setLabelRecording] = useState(false)
    const [loading, setLoading] = useState(false)
    const [socket, setSocket] = useState({})

    const openFullImage = () => { setFullImage(true) }

    const closeFullImage = () => { setFullImage(false) }

    const activeCamera = () => { setActiveCamera(true) }
    
    const closeCamera = () => { setActiveCamera(false) }

    const displayFullVideo = () => { setFullVideo(true) }

    const closeFullVideo = () => { setFullVideo(false) }
    
    const seeMediaOnModal = () => { 
        if(descriptionTask === ""){
            alert('Tienes que introducir primero la descripción y el titulo de la tarea')
        }else{
            activeCamera()
        }
    }

    const handlePickerTask = (value) => { setTitleTask(value) }

    const handleInputTask = (e) => {
        let { text } = e.nativeEvent
        setDescriptionTask(text)
    }

    const deleteImageReport = (uri) => {
        let newImages = [...images]
        for(let i = 0; i < images.length; i++){
           if(images[i].uri === uri){
                newImages.splice(i,1,{
                    uri: Date(Date.now()).toString(),
                    empty: true,
                    selected: false
                })
           }
        }
        setImages(newImages)
    }

    const emitNewTodo = (todo, users) => {
        socket.emit('newTodo', {
            todo,
            usersTodo: users
        })
    }

    const createReportData = (body) => {         
        let data = new FormData();
        for(let i = 0; i < images.length; i++){
            if(!images[i].empty){
                data.append('todo', {
                    type: 'image/jpg',
                    uri: images[i].uri,
                    name: `${context.userName.replace(/\s+/g, '-')}_todo_${titleTask}_${new Date().toISOString().replace(/:/g, '-')}.jpg`
                })
            }            
        }    
        if(uriVideo !== ""){
            data.append('todo', {
                type: 'video/mp4',
                uri: uriVideo,
                name: `${context.userName.replace(/\s+/g, '-')}__todo_${titleTask}_${new Date().toISOString().replace(/:/g, '-')}.mp4`
            })
        }
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        
        return data;
    }

    const createTask = () => {
        if(descriptionTask !== ""){
            setLoading(true)
            let task = {}
            if(plantsAlreadyOrdenated){                
                task = {
                    title: titleTask,
                    description: descriptionTask,
                    plantsAlreadyOrdenated,
                    userName 
                }
            }else{
                let plantsOrdenated = ordenateNumberPlants()                
                task = {
                    title: titleTask,
                    description: descriptionTask,
                    plants: JSON.stringify(plantsOrdenated)
                }
            }
            if(uriVideo === "" && images[0].empty && images[1].empty && images[2].empty ){
                postNewTask(task).then( ({todo, users}) => {
                    setLoading(false)
                    emitNewTodo(todo, users)
                    closeModal()
                    setDescriptionTask('')
                    setImages(defaultImages)
                    setUriVideo('')
                    setLoading(false)
                    Toast.show({
                        text: 'Tarea enviada!',
                        buttonText: 'Okay',
                        duration: 3000,
                        type: 'success'
                    })
                    if(updateEmployees){ updateEmployees(users) }
                }).catch( (e) => {
                    setLoading(false)
                    if(e.response.status === 400){ return alert(e.response.data) }
                    alert(`${messageServerError}`)
                } )
            }else{
                let data = createReportData(task)
                postNewTaskwMedia(data).then( ({todo, users}) => {
                    setLoading(false)
                    emitNewTodo(todo, users)
                    closeModal()
                    console.log(todo)
                    console.log(user)
                    console.log(users)
                    setDescriptionTask('')
                    setImages(defaultImages)
                    setUriVideo('')
                    Toast.show({
                        text: 'Tarea enviada!',
                        buttonText: 'Okay',
                        duration: 3000,
                        type: 'success'
                    })
                    if(updateEmployees){ updateEmployees(users) }
                }).catch( (e) => {
                    setLoading(false)
                    if(e.response.status === 400){ return alert(e.response.data) }
                    alert(`${messageServerError}`)
                } )
            }       
        }else{
            alert('Tienes que ingresar alguna descripción a la tarea')
        }
    }

    const displayFullImage = (image) => {
        setImagetoFullImage(image)
        openFullImage()        
    }

    const selectImage = (uri) => {
        let newImages = [...images]
        for(let i = 0; i < images.length; i++){
           if(images[i].uri === uri){
                newImages[i].selected = !newImages[i].selected
           }
        }
        setImages(newImages) 
    }

    const returnSerialNumber = (number) => {
        let lastNumberSerial = ''
        if(number >= 0){ lastNumberSerial = `000${number}` }
        if(number >= 10){ lastNumberSerial = `00${number}` }
        if(number >= 100){ lastNumberSerial = `0${number}` }
        if(number >= 1000){ lastNumberSerial = `${number}` }
        return lastNumberSerial
    }

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            if(value !== null) {
                return value
            }
        } catch(e) {
            alert(`${messageTokenError}`)
        }
    }

    const initializaSocket = () => {
        let newSocket = io(`${url}`)        
        newSocket.on('userConnected', (callback) => callback({userName: context.userName }))
        setSocket(newSocket) 
    }

    useEffect(() => {        
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)                
        }
        getTokenFromAsyncStorage() 
        initializaSocket()
    },[])

    const ordenateNumberPlants = () => {                
        let stringPlants = []   
        stringPlants.push({
            number: [plants[0].serialNumber],
            section: plants[0].section
        })
        let plantsSorted = plants.sort( (a,b) => a.serialNumber - b.serialNumber )
        let lastNumber = {}       
        lastNumber.number = Number(plants[0].serialNumber)
        lastNumber.section = plants[0].section
        for(let i = 1; i < plantsSorted.length; i++){
            if(lastNumber.number === Number(plantsSorted[i].serialNumber) - 1){
                if(lastNumber.section === plantsSorted[i].section){
                    lastNumber.number = Number(plantsSorted[i].serialNumber)
                    if(i === plantsSorted.length - 1){                        
                        stringPlants[stringPlants.length - 1].number[stringPlants[stringPlants.length - 1].number.length - 1] += ` - ${returnSerialNumber(lastNumber.number)}`
                    }
                }else{                    
                    stringPlants[stringPlants.length - 1].number[stringPlants[stringPlants.length - 1].number.length - 1] += ` - ${returnSerialNumber(lastNumber.number)}`
                    stringPlants.push({
                        number: [plantsSorted[i].serialNumber],
                        section: plantsSorted[i].section
                    })
                    lastNumber.number = Number(plantsSorted[i].serialNumber)
                    lastNumber.section = plantsSorted[i].section
                }
            }else{
                if(lastNumber.section === plantsSorted[i].section){                    
                    stringPlants[stringPlants.length - 1].number[stringPlants[stringPlants.length - 1].number.length - 1] += ` - ${returnSerialNumber(lastNumber.number)}`
                    stringPlants[stringPlants.length - 1].number.push(plantsSorted[i].serialNumber)
                    lastNumber.number = Number(plantsSorted[i].serialNumber)
                }else{                    
                    stringPlants[stringPlants.length - 1].number[stringPlants[stringPlants.length - 1].number.length - 1] += ` - ${returnSerialNumber(lastNumber.number)}`
                    stringPlants.push({
                        number: [plantsSorted[i].serialNumber],
                        section: plantsSorted[i].section
                    })
                    lastNumber.number = Number(plantsSorted[i].serialNumber)
                    lastNumber.section = plantsSorted[i].section
                }                
            }
        }
        return stringPlants;
    }

    const postNewTask = async (task) => {
        let res = await axios({
            method: 'post',
            url: `${url}/user/newTask`, 
            data: task,
            headers: { 'authorization': token },
            timeout: 5000
        })        
        return res.data
    }

    const postNewTaskwMedia = async (data) => {
        let res = await axios({
            method: 'post',
            url: `${url}/user/newTaskwMedia`, 
            data,
            headers: { 'authorization': token },
            timeout: 5000
        })        
        return res.data
    } 

    const takePicture = async (camera) => {   
        const data = await camera.takePictureAsync({ quality: 0.5 });
        closeCamera()
        SetSeeMedia(true)
        let newImages = [...images];    
        if(newImages[0].empty){ 
            newImages[0] = {uri: data.uri, selected: false, empty: false}
            setImages(newImages)
            return 
        }
        if(newImages[1].empty){ 
            newImages[1] = {uri: data.uri, selected: false, empty: false}
            setImages(newImages)
            return 
        }
        if(newImages[2].empty){ 
            newImages[2] = {uri: data.uri, selected: false, empty: false} 
            setImages(newImages)
            return
        }      
    };

    const startRecording = async (camera) => {     
        setLabelRecording(true)   
        const { uri, codec = "mp4" } = await camera.recordAsync({ quality: 0.5 });    
        setUriVideo(uri)    
    };

    const stopRecording = async (camera) => { 
        SetSeeMedia(true)
        setLabelRecording(false)   
        camera.stopRecording() 
        closeCamera()
    };

    const handleCloseModel = () => {
        setDescriptionTask('')
        setImages(defaultImages)
        setUriVideo('')
        SetSeeMedia(false); 
        closeModal()
    }

    return (
        <>
        <Loading active={loading}/>
        <Modal   
            visible={fullImage} 
            animationType="none"
            transparent
            onRequestClose={closeFullImage}
        >
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0)"
                onPress={closeFullImage}
                style={styles.flex1}
            >
                <Image 
                    source={{uri: imagetoFullImage, isStatic: true}}
                    style={styles.flex1}
                    resizeMode="contain"
                />
            </TouchableHighlight>                
        </Modal>
        <Modal   
            visible={fullVideo} 
            animationType="none"
            onRequestClose={closeFullVideo}
        >
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0)"
                onPress={closeFullVideo}
                style={styles.flex1}
            >
                <Video 
                    source={{uri: uriVideo}}
                    onError={(e) => console.log(e)}
                    style={styles.flex1} 
                    repeat
                    controls={true}
                    resizeMode="contain"
                />
            </TouchableHighlight>                
        </Modal>
        <Modal
            visible={activeModal}
            animationType="node"
            transparent      
            onRequestClose={handleCloseModel}      
        >
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0)"
                onPress={handleCloseModel}
                style={styles.containerModalTask}
            >
                <View
                    style={styles.modalTask}
                >
                    <TouchableHighlight 
                        style={styles.flex1}
                        underlayColor="rgba(0,0,0,0)"
                    >
                        <>
                        <View style={styles.headerModalTask}>
                            <Text style={styles.titleModalTask}>INGRESA TIPO DE TAREA</Text>
                            <View style={styles.pickerTitleTaskContainer}>
                                <Picker
                                    onValueChange={handlePickerTask}
                                    selectedValue={titleTask}
                                    style={styles.pickerTitleTask}
                                >
                                    <Picker.Item label="Podar" value="Podar"/>
                                    <Picker.Item label="Regar" value="Regar"/>
                                    <Picker.Item label="Fertilizar" value="Fertilizar"/>
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.bodyModalTask}>
                            <Text style={styles.titleTask}>TAREA</Text>
                            {seeMedia ? (
                                <>
                                <View style={styles.imagesNewTaskContainer}>
                                    <FlatList 
                                        data={images}
                                        extraData={images}
                                        horizontal={true}
                                        renderItem={({item}) => {                                            
                                            if(item.empty){
                                                return (
                                                    <View style={styles.containerDefaultImageNewTask}>
                                                    </View>
                                                )
                                            }else{
                                                return(
                                                    <View style={
                                                        item.selected ? styles.containerImageNewTask : styles.containerImageNewTaskwoMargin                                            
                                                    }>                                            
                                                        <TouchableHighlight
                                                            underlayColor="rgba(0,0,0,0)"
                                                            onPress={() => { displayFullImage(item.uri) }}
                                                            onLongPress={() => { selectImage(item.uri) }}                                                
                                                            key={item.uri}                                                    
                                                        >                                            
                                                            <Image                                                                                        
                                                                source={{ uri: `${item.uri}`, isStatic: true}}
                                                                style={{ width: 100,height: 100 }} 
                                                            />
                                                        </TouchableHighlight>
                                                        {item.selected && (
                                                            <Button
                                                                small
                                                                danger
                                                                style={styles.deleteImgBtnNewTask}
                                                                onPress={() => { deleteImageReport(item.uri) }}
                                                            >
                                                                < Icon name="trash-o" color="white" size={15}/> 
                                                            </Button>
                                                        )}                                                
                                                    </View>
                                                )
                                            }
                                        }}
                                        keyExtractor={item => item.uri + Math.random().toString()}
                                    />
                                </View>
                                <View style={styles.imagesNewTaskContainer}>
                                {uriVideo !== "" && !fullVideo && (
                                    <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center' }}>
                                    <TouchableNativeFeedback onPress={displayFullVideo}>
                                        <Video 
                                            source={{uri: uriVideo}}
                                            onError={(e) => alert('Ha sucedido un error reproduciendo el video')}
                                            style={styles.videoThumbnail} 
                                            resizeMode="stretch"
                                        />
                                    </TouchableNativeFeedback>
                                    </View>
                                )}
                                </View>
                                </>
                            ): (
                                <>
                                <View style={styles.textModalTaskContainer}>
                                    <Text style={styles.textModalTask}>Titulo: {titleTask}</Text>
                                </View>
                                <View style={styles.inputModalTaskContainer}>
                                    <TextInput 
                                        multiline
                                        style={styles.inputTaskDescription}
                                        placeholder="Agrega una descripción"                                
                                        blurOnSubmit={true}
                                        returnKeyType="default"
                                        value={descriptionTask}
                                        onChange={handleInputTask} 
                                        placeholderTextColor="rgb(0,26,0)"
                                    />
                                </View>
                                </>
                            )}
                            <View style={styles.mediaBtnModalTaskContainer}>
                                <TouchableNativeFeedback onPress={seeMediaOnModal}>
                                    <View style={styles.mediaBtnModalTask}>
                                        <Image 
                                            source={cameraIcon}
                                            style={{ width: 30 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                        <View style={styles.footerModalTask}>
                            <Button
                                style={styles.btnFooterModalTask}
                                onPress={createTask}
                            >
                                <Text style={styles.textBtnFooterModalTask}>FINALIZAR</Text>
                            </Button>
                        </View>
                        </>
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        </Modal>
        <Camera 
            active={cameraActive}
            takePicture={takePicture}
            closeCamera={closeCamera}
            startRecording={startRecording}
            stopRecording={stopRecording} 
            labelRecording={labelRecording}
        />   
        </>
    )
}

export default ModalTask
