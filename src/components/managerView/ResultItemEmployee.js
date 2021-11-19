import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CardItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

import Alert from '../Alert';
import TodoItem from './TodoItem';
import ModalTask from './ModalTask';
import styles from '../../styles/ManagerScreenStyles';

function ResultItemEmployee({ employee, updateEmployees, orientation }){
    
    const [collapsibleTodo, setCollapsibleTodo] = useState(true);
    const [activeModalTask, setActiveModalTask] = useState(false); 
    const [activeAlert, setActiveAlert] = useState(false);    

    const closeModalTask = () => { setActiveModalTask(false) } 

    const opneModalTask = () => { setActiveModalTask(true) }   

    const seeTodos = () => {
        setCollapsibleTodo(!collapsibleTodo)
        if(employee.todos.length === 0 ){ setActiveAlert(true) }
    }   
    
    const closeAlert = () => { setActiveAlert(false) }
    
    return(
        <>
        <Alert 
            title="SIN TAREAS"
            body="Este usuario actualmente no tiene ninguna tarea asignada."
            activeAlert={activeAlert}
            cancelFunction={closeAlert}
            okayFunction={closeAlert}
        />
        <ModalTask 
            activeModal={activeModalTask}
            closeModal={closeModalTask}
            plantsAlreadyOrdenated={employee.plants}
            userName={employee.userName}
            updateEmployees={updateEmployees}
        />
        <View style={ orientation === "portrait" ? styles.cardItemEmployee : styles.cardItemEmployeeLandscape}> 
            <CardItem header>
                <View style={styles.titleItemPlantContainer}>
                    <Text style={styles.textItemEmployee}>Empleado: {employee.name}</Text> 
                </View>                 
            </CardItem>
            <CardItem>
                <View>
                    <Text style={styles.textItemEmployee}>Usuario: {employee.userName}</Text>
                    <Text style={styles.textItemEmployee}>Sección: {employee.section}</Text>
                    { employee.meanReads && <Text style={styles.textItemEmployee}>Promedio de Lectura: {employee.meanReads} min</Text> }
                    <Collapsible collapsed={collapsibleTodo} >
                        {employee.todos.map( todo => <TodoItem todo={todo} updateEmployees={updateEmployees} employee={employee} key={todo._id}/> )}
                    </Collapsible>                    
                </View>                                
            </CardItem>
            <CardItem footer>
                <View style={styles.footerItemResult}>
                    <TouchableHighlight
                        onPress={seeTodos}
                        underlayColor="rgba(0,0,0,0)"
                        style={{...styles.btnItemResultEmployee, borderRightColor: 'rgb(0, 26, 0)', borderRightWidth: 1}}
                    >
                        <Text style={styles.textBtnItemEmployee}>VER TAREAS</Text>
                    </TouchableHighlight>                   
                    <TouchableHighlight 
                        style={{...styles.btnItemResultEmployee, borderLeftColor: 'rgb(0, 26, 0)', borderLeftWidth: 1}}
                        onPress={opneModalTask}
                        underlayColor="rgba(0,0,0,0)"
                    >
                        <Text style={styles.textBtnItemEmployee}>ASIGNAR TAREAS</Text>
                    </TouchableHighlight>
                </View>
            </CardItem>
        </View>
        </>
    )
}

export default ResultItemEmployee;