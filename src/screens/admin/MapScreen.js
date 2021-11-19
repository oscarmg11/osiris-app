import React, { useState, useEffect} from 'react'
import { View, BackHandler, Text, Modal, Image, TouchableNativeFeedback, TouchableHighlight } from 'react-native'
import { Button, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Loading from '../../components/Loading'
import styles from '../../styles/AdminScreenSytles';
import SaveLocationSection from '../../components/adminView/SaveLocationSection'; 
import Map from '../../components/adminView/Map';
import { url, messageServerError, messageTokenError} from '../../../app.json'

import Alert from '../../components/Alert';

const addIcon = require('../../assets/add-icon.png');

const MapScreen = ({ route, navigation }) => {    

    const [numberSection, setNumberSection] = useState(1)
    const [numberEdited, setNumberEdited] = useState(1) 
    const [polygonToEdit, setPolygonToEdit] = useState(-1)    
    const [coordinatesMarker, setCoordinatesMarker] = useState([])
    const [sectionsId, setSectionsId] = useState([])
    const [sectionsFetched, setSectionsFetched] = useState([])
    const [employeesSectionDeleted, setEmployeesSectionDeleted] = useState([])
    const [owner, setOwner] = useState({})
    const [sectionDeleted, setSectionDeleted] = useState({})
    const [editSection, setEditSection] = useState(false)
    const [manualEdit, setManualEdit] = useState(false)
    const [locationEdit, setLocationEdit] = useState(false)
    const [loadingInfo, setLoadingInfo] = useState(false)
    const [modalPolygon, setModalPolygon] = useState(false)
    const [deletingSection, setDeletingSection] = useState(false)
    const [updatingSection, setUpdatingSection] = useState(false)
    const [activeAlert, setActiveAlert] = useState(false)
    const [infoSectionDeleted, setInfoSectionDeleted] = useState(false)
    const [token, setToken] = useState("");

    const changeNumberEdited = (newNumberEdited) => { setNumberEdited(newNumberEdited) }

    const setMarkers = (markers) => { setCoordinatesMarker(markers) }

    const addSection = () => { 
        let newNumberSection = numberSection + 1
        setNumberEdited(newNumberSection)      
        setNumberSection(newNumberSection)               
        pushNewMarkers(newNumberSection)
    }

    const removeSection = () => {
        if(sectionsFetched[numberEdited - 1]){
            setDeletingSection(true)
            fetchDeleteSection(sectionsFetched[numberEdited - 1]._id)
            .then(({ section, employees }) => {
                removeMarkers()
                setInfoSectionDeleted(true)
                setSectionDeleted(section)
                setEmployeesSectionDeleted(employees)
                setDeletingSection(false)
                setActiveAlert(false)
                let newSections = sectionsFetched.filter( oldSection => oldSection._id !== section._id)
                setSectionsFetched(newSections)
                setSections(newSections)
                
            })
            .catch((e) => {
                alert(`${messageServerError}`)
                setDeletingSection(false)
            })
        }else{
            let newCoordinates = [...coordinatesMarker]
            newCoordinates.splice(numberEdited - 1, 1)
            setCoordinatesMarker(newCoordinates)
            setActiveAlert(false)
            setNumberEdited(numberSection - 1)
            setNumberSection(numberSection - 1) 
        }
    }

    const fetchDeleteSection = async (id) => {
        let res = await axios({
            method: 'DELETE',
            url: `${url}/section/${id}`,
            timeout: 5000,
            headers: { 'authorization': token }
        })
        return res.data
    }

    const updateCoordinatesSection = (newCoordinates) => {
        setUpdatingSection(true)
        fetchCoordinateChanges(sectionsFetched[ numberEdited - 1 ]._id, newCoordinates)
            .then(() => {
                setUpdatingSection(false)
                Toast.show({
                    text: 'Se han guardado los cambios',
                    duration: 3000,
                    type: 'success'
                })
                navigation.navigate('Owners')
            }).catch((e) => {
                setUpdatingSection(false)
                alert(`${messageServerError}`)
            })
    }

    const fetchCoordinateChanges = async (id, newCoordinates) => {  
        let coordinatesSection = []
        if(newCoordinates){ coordinatesSection = newCoordinates }
        else{ coordinatesSection = coordinatesMarker[ numberEdited - 1 ] }
        let res = await axios({
            method: 'POST',
            url: `${url}/section/update/${id}`,
            data: {
                coordinates: coordinatesSection,
                sectionName: sectionsFetched[numberEdited - 1].sectionName,
                employees: sectionsFetched[numberEdited - 1].employees,
                plants: sectionsFetched[numberEdited - 1].plants,
                owner: sectionsFetched[numberEdited - 1].owner,
                checkDateFrom: sectionsFetched[numberEdited - 1].checkDateFrom 
            },
            headers: { 'authorization': token },
            timeout: 5000
        })            
        return res.data
    }

    const editMarkers = () => { 
        if(editSection){
            if(!sectionsFetched[ numberEdited - 1 ]){
                if(coordinatesMarker[numberEdited - 1].length < 3){
                    return alert('No pudes avanzar sin establecer al menos 3 coordenadas')
                }else{
                    if(locationEdit){
                        let newCoordinates = [...coordinatesMarker[ numberEdited - 1 ]]
                        newCoordinates.splice( newCoordinates.length - 1, 1 )
                        navigation.navigate('SaveSections', { coordinates: newCoordinates })
                    }else{ navigation.navigate('SaveSections', { coordinates: coordinatesMarker[numberEdited - 1] }) }
                }   
            }else{ 
                if(locationEdit){
                    let newCoordinates = [...coordinatesMarker[ numberEdited - 1 ]]
                    newCoordinates.splice( newCoordinates.length - 1, 1 )
                    updateCoordinatesSection(newCoordinates)
                }else{ updateCoordinatesSection()  }
            }
        }else{
            setEditSection(true)
            setManualEdit(true)
        }
    }

    const removeMarkers = () => {
        setNumberSection( numberSection - 1 )
        let newMarkers = [...coordinatesMarker]
        newMarkers.splice(numberEdited - 1,1)
        setCoordinatesMarker(newMarkers)
        let newSections = [...sectionsFetched]
        newSections.splice(numberEdited - 1,1)
        setSectionsFetched(newSections)
    }

    const pushNewMarkers = () => {       
        let newMarkers = [...coordinatesMarker]
        newMarkers.push([{
            latitude: 25.5076667,
            longitude: -103.5135641,
            _id: Math.random().toString()
        },{
            latitude: 25.5045884,
            longitude: -103.5135641,
            _id: Math.random().toString()
        },{
            latitude: 25.5045884,
            longitude: -103.5098520,
            _id: Math.random().toString()
        },{
            latitude: 25.5076667,
            longitude: -103.5098520,
            _id: Math.random().toString()
        }])                      
        setCoordinatesMarker(newMarkers)
    }

    const setSections = (sections) => {
        let newCoordinates = []
        let newSectionsId = [...sectionsId]
        for(let i = 0; i < sections.length; i++){
            newCoordinates.push(sections[i].coordinates)
            newSectionsId.push(sections[i]._id)
        }
        setNumberSection(sections.length)
        setCoordinatesMarker(newCoordinates)
        setSectionsId(newSectionsId)
        setNumberEdited(1)
    }

    const fetchSections = async (token) => {
        let res = await axios({
            method: 'get',
            url: `${url}/section/`,
            headers: { 'authorization': token }
        })
        return res.data
    }

    useEffect(() => {
        setOwner(route.params.owner)
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchSections(token).then(({sections}) => {
                setSectionsFetched(sections)
                setSections(sections)
            }).catch( () => alert(`${messageServerError}`))              
        }
        getTokenFromAsyncStorage()       
    },[])

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

    const gotoLeftEdit = () => {
        if(numberEdited !== 1){
            let newNumberEdited = numberEdited - 1
            setNumberEdited(newNumberEdited)
        }
    }

    const gotoRightEdit = () => {
        if(numberEdited < numberSection){
            if(locationEdit && coordinatesMarker[numberEdited - 1].length < 3){
                return alert('No pudes avanzar sin establecer al menos 3 coordenadas')
            }
            let newNumberEdited = numberEdited + 1
            setNumberEdited(newNumberEdited)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if(editSection){ 
                    if(locationEdit){ 
                        setLocationEdit(false) 
                        setManualEdit(true)
                        return true
                    }
                    setEditSection(false)
                    setManualEdit(false)
                    if(sectionsFetched.length !== coordinatesMarker.length){
                        let newCoordinatesMarker = [...coordinatesMarker]
                        newCoordinatesMarker.splice(sectionsFetched.length , coordinatesMarker.length-sectionsFetched.length)
                        setCoordinatesMarker(newCoordinatesMarker)
                        setNumberSection( sectionsFetched.length )
                        setNumberEdited( 1 )
                    }
                }
                else{ return false }             
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);                        
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },[editSection, sectionsFetched, coordinatesMarker, locationEdit, manualEdit])
    )

    const openLoader = () => { setLoadingInfo(true) }

    const closeLoader = () => { setLoadingInfo(false) }

    const activeModalPolygon = (polygonToEdit) => {
        setModalPolygon(true)
        setPolygonToEdit(polygonToEdit)
    }

    const closeModalPolygon = () => setModalPolygon(false)

    const gotoEditInfo = () => {
        closeModalPolygon()
        navigation.navigate('SaveSections', { section: sectionsFetched[polygonToEdit], coordinates: coordinatesMarker[numberEdited - 1] })
    }

    const gotoEditLocation = () => {
        closeModalPolygon()
        setManualEdit(false)
        setLocationEdit(true)
    }

    const closeAlert = () => setActiveAlert(false)

    const openAlert = () => setActiveAlert(true)

    const closeModalInfoSectionDeleted = () => setInfoSectionDeleted(false)


    return (
        <View style={styles.mapContainer}>
            <Alert 
                title="ELIMINAR SECCIÓN"
                body="¿Está seguro que desea eliminar está sección?"
                cancelFunction={closeAlert}
                okayFunction={removeSection}
                activeAlert={activeAlert}
            />
            <Loading active={loadingInfo || deletingSection || updatingSection} />
            <Modal
                visible={infoSectionDeleted}
                animationType="none"
                transparent
            >
                <TouchableHighlight
                    underlayColor="rgba(0,0,0,0)"
                    style={styles.modalPolygonContainer}
                    onPress={closeModalInfoSectionDeleted}
                >
                    <View style={styles.bodyModalInfoSectionDeleted}>
                        <Text style={styles.titleModalInfoSectionDeleted}>INFORMACIÓN DE LA SECCIÓN ELIMINADA</Text>
                        <Text style={styles.textModalInfoSectionDeleted}>La siguiente información corresponde a la sección que se acaba de borrar. Se le recomienda reasignar de inmediato las plantas y los empleados a otras secciones. </Text>
                        <Text style={styles.textModalInfoSectionDeleted}> {'\n'}Plantas: {sectionDeleted.plants}</Text>
                        <Text style={styles.textModalInfoSectionDeleted}>Empleados:</Text>
                        {employeesSectionDeleted.map( employee => (
                            <Text style={styles.textModalInfoSectionDeleted} key={Math.random().toString()}>{employee}</Text>
                        ))}
                    </View>
                </TouchableHighlight>

            </Modal>
            <Modal
                transparent
                visible={modalPolygon}
                animationType="none"
            >
                <TouchableHighlight
                    onPress={closeModalPolygon}
                    underlayColor="rgba(0,0,0,0)"
                    style={styles.modalPolygonContainer}
                >
                    <View style={styles.modalPolygonBody}>
                        <TouchableNativeFeedback onPress={gotoEditInfo}>
                            <View style={styles.modalPolygonContainer}>
                                <Text style={styles.textpdfDocumentItem}>EDITAR INFORMACIÓN</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={gotoEditLocation}>
                            <View style={styles.modalPolygonContainer}>
                                <Text style={styles.textpdfDocumentItem}>EDITAR UBICACIÓN</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </TouchableHighlight>
            </Modal>
            {((editSection && manualEdit) || !editSection) && (
                <Map 
                    numberSection={numberSection}
                    numberEdited={numberEdited}
                    coordinatesMarker={coordinatesMarker}
                    setCoordinatesMarker={setMarkers}
                    sectionsId={sectionsId}
                    editSection={editSection}
                    owner={owner}
                    sections={sectionsFetched}
                    openLoader={openLoader}
                    closeLoader={closeLoader}
                    editing={ manualEdit || locationEdit }
                    setNumberEdited={changeNumberEdited}
                    activeModalPolygon={activeModalPolygon}
                    navigation={navigation}
                />
            )}
            {editSection && locationEdit && (
                < SaveLocationSection
                    numberSection={numberSection}
                    numberEdited={numberEdited}
                    nextSection={gotoRightEdit}
                    lastSection={gotoLeftEdit}
                    coordinates={coordinatesMarker}
                    setCoordinatesMarker={setMarkers}
                    polygonToEdit={polygonToEdit}
                />
            )}
            {(manualEdit || !editSection || (editSection && (!manualEdit || !locationEdit)) || (
                locationEdit && numberEdited === numberSection
            )) && (
                <View style={styles.btnMapContainer}>
                    {editSection && manualEdit  &&(
                        
                        <Button 
                            onPress={openAlert}
                            style={styles.btnRemoveSection}
                        >
                            <Icon 
                                name="trash"
                                size={30}
                                color="rgb(0, 26, 0)"
                            />
                        </Button> 
                    )}
                    <Button
                        onPress={editMarkers}  
                        style={styles.btnEditSectionMap}
                    >
                        <Text style={styles.textBtnEditMap}>
                            { editSection ? (manualEdit || locationEdit ? 'GUARDAR' : 'CANCELAR') : 'EDITAR' }
                        </Text>
                    </Button>
                    
                    {editSection && manualEdit  &&(
                        <Button 
                            onPress={addSection}
                            style={styles.btnAddSection}
                        >
                            <Image 
                                source={addIcon}
                                resizeMode="contain"
                                style={{ width: 30 }}
                            />
                        </Button>              
                    )}
                </View>
            )}         
        </View>
    )
}

export default MapScreen
