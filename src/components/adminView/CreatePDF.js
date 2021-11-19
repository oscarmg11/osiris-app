import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { View, Dimensions, FlatList, Modal, TouchableHighlight, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'native-base';
import RNImageToPdf from 'react-native-image-to-pdf';
import ImagePicker from 'react-native-image-crop-picker';

import styles from '../../styles/AdminScreenSytles'
import Camera from '../Camera';
import { messageCreateDocError } from '../../../app.json'

const { width, height } = Dimensions.get('window')

const cameraIcon = require('../../assets/camara-icon.png');

const  CreatePDF = forwardRef((props, ref) => {

    const emptyImg = {
        uri: Math.random().toString(),
        empty: true,
        selected: false
    }

    const [images, setImages] = useState([emptyImg])
    const [cameraActive, setActiveCamera] = useState(false)
    const [fullImage, setFullImage] = useState(false)
    const [imagetoFullImage, setImagetoFullImage] = useState('')

    const activeCamera = () => { setActiveCamera(true) }
    
    const closeCamera = () => { setActiveCamera(false) }

    const openFullImage = () => { setFullImage(true) }

    const closeFullImage = () => { setFullImage(false) } 

    const takePicture = async (camera) => {        
        const data = await camera.takePictureAsync();
        closeCamera()
        cropImage(data)     
    };

    const displayFullImage = (image, cropImage) => {
        setImagetoFullImage(image)
        openFullImage()        
    }

    const selectImage = (uri) => {
        let newImages = [...images]
        let index = newImages.findIndex( image => image.uri === uri )
        newImages[index].selected = !newImages[index].selected
        setImages(newImages) 
    }
  
    const deleteImageReport = (uri) => {
        let newImages = [...images]
        let index = newImages.findIndex( image => image.uri === uri )
        newImages.splice(index, 1)
        setImages(newImages)
    }

    useImperativeHandle( ref, () => ({
        createPDF: async () => {
            if(images.length === 1){ return alert('Tienes que tomar alguna foto primero.') }
            let imagesToPdf = []
            for(let i = 0; i < images.length; i++){
                if(!images[i].empty){ imagesToPdf.push(images[i].uri.split('file://')[1]) }
            }
            try {
                const options = { 
                    imagePaths: imagesToPdf,
                    name: `${props.namePDF}.pdf`,
                    path: 'Documents',
                    quality: .7,
                    maxSize: {
                        width: 900,
                        height: Math.round(height / width * 900),
                    }
                };
                const pdf = await RNImageToPdf.createPDFbyImages(options);
                return pdf.filePath
            } catch(e) {
                alert(`${messageCreateDocError}`)
            }
        }
    }))

    const cropImage = data => {
        Image.getSize(data.uri, (w,h) => {
            ImagePicker.openCropper({
                path: data.uri,
                width: w,
                height: h,
                cropperActiveWidgetColor: '#2BB852',
                cropperToolbarColor : '#001A00',
                cropperToolbarTitle: 'Recortar Foto'
            }).then(image => {
                let newImages = [...images];
                newImages.push({uri: image.path, selected: false, empty: false})    
                setImages(newImages)
            }).catch(() => {})
        })
    }

    return (
        <>
        <Modal   
            visible={fullImage} 
            animationType="none"
            transparent={true}
        >
            <TouchableHighlight
                underlayColor="rgba(0,0,0,0)"
                onPress={closeFullImage}
                style={styles.flex1}
            >
                <Image 
                    source={{uri: imagetoFullImage, isStatic: true}}
                    style={styles.flex1}
                />
            </TouchableHighlight>                
        </Modal>
        <Camera 
            active={cameraActive}
            takePicture={takePicture}
            closeCamera={closeCamera}
            startRecording={() => {}}
            stopRecording={() => {}} 
            labelRecording={false}
        /> 
        <View style={styles.containerImgsPDF}>
            < FlatList 
                data={images}
                extraData={images}
                renderItem={({item}) => {                                            
                    if(item.empty){
                        return (
                            <TouchableHighlight 
                                underlayColor="rgb(210,210,210)"
                                style={styles.containerDefaultImagePDF}
                                onPress={activeCamera}>
                                <Image 
                                    source={cameraIcon}
                                    resizeMode="contain"
                                    style={{width: 40}}
                                />
                            </TouchableHighlight>
                        )
                    }else{
                        return(
                            <View style={
                                item.selected ? styles.containerImagePDF : styles.containerImagePDFwoMargin                                            
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
                                        style={styles.deleteImgBtnPDF}
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
                numColumns={3}
            />
        </View>
        </>
    )
})

export default CreatePDF
