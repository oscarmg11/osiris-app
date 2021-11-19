import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, TouchableHighlight, Modal } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import ModalEditUser from '../../components/adminView/ModalEditUser'
import Loading from '../../components/Loading'
import UserCard from '../../components/adminView/UserCard'
import BtnAdd from '../../components/BtnAdd'
import styles from '../../styles/AdminScreenSytles';
import { url, messageServerError, messageTokenError } from '../../../app.json'

function Employees({ route, navigation }){

    const [token, setToken] = useState('')
    const [photo, setPhoto] = useState('')
    const [users, setUsers] = useState([])
    const [sections, setSections] = useState([])
    const [owners, setOwners] = useState([])
    const [editUser, setEditUser] = useState(false)
    const [modalPhoto, setModalPhoto] = useState(false)
    const [searching, setSearching] = useState(true)
    const [userToEdit, setUserToEdit] = useState({})

    const openModalEdit = (item) => { setEditUser(true); setUserToEdit(item) }

    const openPhoto = photo => {
        console.log(photo)
        setPhoto(photo)
        setModalPhoto(true)
    }

    const updateUsers = (newUser) => {
        let newUsers = [...users]
        let indexUser = newUsers.findIndex(user => user._id === newUser._id  )
        newUsers.splice(indexUser, 1, newUser)
        setUsers(newUsers)
    }

    useEffect(() => {
        if(route.params){
            let {newUser} = route.params
            let newUsers = [...users]
            newUsers.push(newUser)
            setUsers(newUsers)
        }
    },[route.params])

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            if(value !== null) {
                return value
            }
        } catch(e) {
            alert(`${messageServerError}`) 
        }
    }

    useEffect(() => {
        const fetchUsers = async (token) => {
            let res = await axios({
                method: 'get',
                url: `${url}/user/?rol=employee&rol2=owner`,
                headers: { 'authorization': token },
                timeout: 5000
            })                
            return res.data
        }
        const fetchSections = async (token) => {
            let res = await axios({
                method: 'get',
                url: `${url}/section`,
                headers: { 'authorization': token },
                timeout: 5000
            })                
            return res.data
        }
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchUsers(token).then( ({employees, owners}) => {
                setUsers(employees)
                setOwners(owners)
                setSearching(false)
                fetchSections(token).then(({sections}) => {
                    setSections(sections)
                }).catch( () =>  alert(`${messageServerError}`))
            } )
            .catch( () =>  alert(`${messageServerError}`))          
        }
        getTokenFromAsyncStorage()
    },[])

    const deleteUser = (userId) => {
        let newEmployees = [...users]
        let index = newEmployees.findIndex( employee => employee._id === userId )
        newEmployees.splice(index, 1)
        setUsers(newEmployees)
    }

    const gotoAddUser = () => navigation.navigate('CreateUser', { rol: 'employee' })

    const closeModalPhoto = () => setModalPhoto(false)

    return (
        <View style={styles.containerUsers}>
            <Loading active={searching}/>
            <Modal
                visible={modalPhoto}
                animationType="fade"
                onRequestClose={closeModalPhoto}
            >
                <TouchableHighlight
                    style={styles.flex1}
                    underlayColor="rgba(0,0,0,0)" 
                    onPress={closeModalPhoto}
                >
                    <Image 
                        source={{ uri: photo }}
                        style={styles.fullImage}
                    />
                </TouchableHighlight> 
            </Modal>
            <BtnAdd onPress={gotoAddUser}/> 
            <ModalEditUser 
                activeModal={editUser}
                user={userToEdit}
                closeModal={() => { setEditUser(false) }}
                updateUsers={updateUsers}
            />
            <View style={styles.listUsers}>
                <FlatList 
                    data={users}
                    extraData={[users, sections, owners]}
                    contentContainerStyle={{ alignItems: 'center' }}
                    removeClippedSubviews={true}
                    renderItem={ ({item}) => (
                        <UserCard 
                            item={item} 
                            editUser={openModalEdit} 
                            openPhoto={openPhoto}
                            token={token}
                            deleteUser={deleteUser}
                            sections={sections}
                            owners={owners}
                            userType='employee'
                        />
                    )}
                    keyExtractor={ item => item._id }
                /> 
            </View>
        </View>
    )
}

export default Employees
