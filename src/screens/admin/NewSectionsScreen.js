import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Button, Toast } from 'native-base';

import Checkbox from '../../components/Checkbox'
import EmployeeItemCheckbox from '../../components/adminView/EmployeeItemCheckbox';
import Loading from '../../components/Loading'
import Alert from '../../components/Alert'
import styles from '../../styles/AdminScreenSytles';
import { url, messageServerError, messageTokenError } from '../../../app.json';


function NewSectionsScreen({ route, navigation }){

    const [token, setToken] = useState("");
    const [employees, setEmployees] = useState([])
    const [employeesChecked, setEmployeesChecked] = useState([])
    const [owners, setOwners] = useState([])
    const [section, setSection] = useState({})
    const [coordinates, setCoordinates] = useState([])
    const [usersWithSection, setUsersWithSection] = useState('')
    const [ownerChecked, setOwnerChecked] = useState('')
    const [nameSection, setNameSection] = useState('')
    const [updating, setUpdating] = useState(false)
    const [alertUserwithSection, setAlertUserwithSection] = useState(false)
    const [plantFrom, setPlantFrom] = useState("");
    const [plantTo, setPlantTo] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());

    const handleInput = (e) => {
        let { text } = e.nativeEvent
        setNameSection(text)
    }

    const handleInputDay = (e) => {
        let { text } = e.nativeEvent
        if(text.length < 3 && Number(text.replace(/[^0-9]/g, '')) <= 31){
            setDay(text.replace(/[^0-9]/g, ''))
        }
    }

    const handleInputMonth = (e) => {
        let { text } = e.nativeEvent
        if(text.length < 3 && Number(text.replace(/[^0-9]/g, '')) <= 12){
            setMonth(text.replace(/[^0-9]/g, ''))
        }
    }

    const handleInputYear = (e) => {
        let { text } = e.nativeEvent
        if(text.length < 5){
            setYear(text.replace(/[^0-9]/g, ''))
        }
    }

    const checkEmployeeHasSection = () => {
        let ctrlEmployeeForSection = true
        let userWithSection = []
        for(let i = 0; i < employeesChecked.length; i++){
            let employee = employees.find( employee => employee._id == employeesChecked[i].idEmployee )
            if(employee && employee.section != section._id){ 
                ctrlEmployeeForSection = false 
                userWithSection.push(employee.name)
            }
        }
        return {ctrl : ctrlEmployeeForSection, user: userWithSection} 
    }

    const handleBtn = () => {
        if(parseInt(plantFrom) < parseInt(plantTo) && ownerChecked !== "" && nameSection !== "" && employees.length !== 0 &&
            day !== "" && month !== ""){
                const { ctrl, user } = checkEmployeeHasSection()
                if(ctrl){ saveChanges() }
                else{
                    setAlertUserwithSection(true)
                    setUsersWithSection(user.join(', '))
                }            
        }else{
            alert('Tienes algún error, revisa los datos que estás ingresando.')
        }
    }

    const fetchChanges = async (id) => { 
        let fetchUrl = `${url}/section`
        if(id){ fetchUrl = `${url}/section/update/${id}` }
        let res = await axios({
            method: 'POST',
            url: fetchUrl,
            data: {
                coordinates,
                sectionName: nameSection,
                employees: employeesChecked,
                plants: `${plantFrom}-${plantTo}`,
                owner: ownerChecked,
                checkDateFrom: `${day}/${month}/${year}` 
            },
            headers: { 'authorization': token },
            timeout: 5000
        })            
        return res.data
    }

    const saveChanges = () => {
        setUpdating(true)
        fetchChanges(section._id).then( ({updated}) => { 
            if(updated){
                setUpdating(false)
                Toast.show({
                    text: 'Se han guardado los cambios',
                    duration: 3000,
                    type: 'success'
                })
                navigation.navigate('Owners')
            }
        }).catch( (e) => {
            setUpdating(false)
            if(e.response.status=== 400){ return alert(e.response.data) }
            alert(`${messageServerError}`)
        })
    }

    const setOwnerCheckbox = (value) => { setOwnerChecked(value) }

    const setEmployeesCheckbox = (id) => {
        let newEmployeesChecked = [...employeesChecked]
        let index = newEmployeesChecked.findIndex(employee => employee.idEmployee === id)
        if(index >= 0){ newEmployeesChecked.splice(index, 1) }
        else{ newEmployeesChecked.push({ idEmployee: id }) }
        setEmployeesChecked(newEmployeesChecked)
    }    
    const setPlants = (id, plants) => {
        let newEmployeesChecked = [...employeesChecked]
        let index = newEmployeesChecked.findIndex(employee => employee.idEmployee === id)
        newEmployeesChecked[index].plants = plants
        setEmployeesChecked(newEmployeesChecked)
    }

    const handleInputPlantFrom = (e) => {
        let { text } = e.nativeEvent
        setPlantFrom(text.replace(/[^0-9]/g, ''))
    }

    const handleInputPlantTo = (e) => {
        let { text } = e.nativeEvent
        setPlantTo(text.replace(/[^0-9]/g, ''))
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

    const checkIfEmployeeIsChecked = (id) => {
        try{
            let index = employeesChecked.findIndex( employee => employee.idEmployee === id )
            if(index >= 0){ return true }
            else{ return false }
        }catch(e){
            return false
        }
    }

    const fillDataSection = (section) => {
        setNameSection(section.sectionName)
        setPlantFrom(section.plants.split('-')[0])
        setPlantTo(section.plants.split('-')[1])
        setOwnerChecked(section.owner)
        setDay(section.checkDateFrom.split('/')[0])
        setMonth(section.checkDateFrom.split('/')[1])
        setYear(section.checkDateFrom.split('/')[2])
        let newEmployees = [...employeesChecked]
        newEmployees = section.employees
        setEmployeesChecked(newEmployees)
    }

    useEffect(() => {
        let { section, coordinates } = route.params
        if(section){
            setSection(section)
            fillDataSection(section)
        }
        setCoordinates(coordinates)
        const fetchUsers = async (token) => { 
            let res = await axios({
                method: 'get',
                url: `${url}/user/?rol=employee&rol2=owner`,
                headers: { 'authorization': token },
                timeout: 5000
            })              
            return res.data
        }
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchUsers(token).then( ({employees, owners}) => {
                setEmployees(employees)
                setOwners(owners)
            }).catch( () => alert(`${messageServerError}`))
        }
        getTokenFromAsyncStorage()
    },[])

    const closeAlert = () => setAlertUserwithSection(false)

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.flex1}>
            <Loading active={updating}/>
            <Alert 
                okayFunction={saveChanges}
                cancelFunction={closeAlert}
                title="REASIGNAR EMPLEADOS"
                body={`Los usuarios ${usersWithSection} ya tienen una sección asignada. ¿Está seguro que los desea reasignar de sección?`}
                activeAlert={alertUserwithSection}
            />
            <View style={styles.bodyModalNewSections}>
                <Text style={styles.titleNewSection}>SECCIÓN</Text>
                <Text style={styles.labelNewSection}>NOMBRE</Text>
                <TextInput 
                    value={nameSection}
                    onChange={handleInput}
                    style={styles.inputEditUser}
                />
                <Text style={styles.labelNewSection}>INGRESA PLANTAS</Text>
                <View style={styles.inputPlantsModalNewSections}>
                    <TextInput 
                        value={plantFrom}
                        placeholder="Desde"
                        onChange={handleInputPlantFrom}
                        style={styles.inputPlantModalNewSection}
                        keyboardType="numeric"
                    />
                    <Text> - </Text>
                    <TextInput 
                        value={plantTo}
                        placeholder="Hasta"
                        onChange={handleInputPlantTo}
                        style={styles.inputPlantModalNewSection} 
                        keyboardType="numeric"
                    />
                </View>
                <Text style={styles.labelNewSection}>INGRESA FECHA DE INICIO</Text>
                <View style={styles.inputPlantsModalNewSections}>
                    <TextInput 
                        value={day}
                        placeholder="DD"
                        onChange={handleInputDay}
                        style={styles.inputDateModalNewSection}
                        keyboardType="numeric"
                    />
                    <Text> / </Text>
                    <TextInput 
                        value={month}
                        placeholder="MM"
                        onChange={handleInputMonth}
                        style={styles.inputDateModalNewSection} 
                        keyboardType="numeric"
                    />
                    <Text> / </Text>
                     <TextInput 
                        value={year}
                        placeholder="AA"
                        onChange={handleInputYear}
                        style={styles.inputDateModalNewSection}  
                        keyboardType="numeric"
                    />
                </View>
                <Text style={styles.labelNewSection}>SELECCIONA EL EMPLEADO ENCARGADO</Text>
                <View style={styles.flatListEmployees}>
                    {employees.map(employee => (
                        <EmployeeItemCheckbox 
                            user={employee}
                            checked={checkIfEmployeeIsChecked(employee._id)}
                            setCheckbox={setEmployeesCheckbox}
                            key={employee._id}
                            setPlants={setPlants}
                        />
                    ))}
                </View>
                <Text style={styles.labelNewSection}>SELECCIONA EL PROPIETARIO ENCARGADO</Text> 
                <View style={styles.flatListEmployees}>
                    {owners.map(item => (
                        <Checkbox 
                            user={item} 
                            checked={item._id === ownerChecked ? true : false} 
                            setCheckbox={setOwnerCheckbox}
                            key={item._id}
                        />
                    ))}                    
                </View>                            
            </View>
            <View style={styles.footerModalNewSections}>
                <Button
                    style={styles.btnOwner}
                    onPress={handleBtn}
                >
                    <Text style={styles.textBtnEditMap}>GUARDAR</Text>
                </Button>
            </View>
        </ScrollView>
    )
}

export default NewSectionsScreen
