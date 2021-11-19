import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableNativeFeedback, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Text as TextSVG } from 'react-native-svg';
import axios from 'axios';
import moment from 'moment';

import BtnAdd from '../../components/BtnAdd';
import Loading from '../../components/Loading';
import styles from '../../styles/AdminScreenSytles';
import { url, messageTokenError, messageServerError } from '../../../app.json';

function BuysScreen({ navigation, route }){

    const { width, height } = Dimensions.get('window')

    const stylesBar = [{ fill: 'rgb(70, 223, 229)' },{ fill: 'rgb(47, 126, 156)' },
                        { fill: 'rgb(255, 177, 19)' }, { fill: 'rgb(252, 252, 7)' }]     

    const [token, setToken] = useState('')
    const [maxSolds, setMaxSolds] = useState(0)
    const [maxKgSolds, setMaxKgSolds] = useState(0)
    const [periodLastWeek, setPeriodLastWeek] = useState([])
    const [currentPeriod, setCurrentPeriod] = useState([])
    const [totalSolds, setTotalSolds] = useState([])
    const [kgSolds, setKgSolds] = useState([])
    const [buys, setBuys] = useState([])
    const [loading, setLoading] = useState(true)

    const gotoCreateBuy = () => navigation.navigate('CreateBuy')

    useEffect(() => {
        let startLastWeek = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD')
        let endLastWeek = moment().startOf('week').add(1, 'days').format('YYYY-MM-DD')
        let startWeek = moment().startOf('week').format('YYYY-MM-DD')
        let endWeek = moment().add(1, 'weeks').startOf('week').add(1, 'days').format('YYYY-MM-DD')
        if(new Date().getDay() === 0){
            startWeek = startLastWeek
            endWeek = endLastWeek
            startLastWeek = moment().subtract(2, 'weeks').startOf('week').format('YYYY-MM-DD')
            endLastWeek = moment().subtract(1, 'weeks').startOf('week').add(1, 'days').format('YYYY-MM-DD')
        }
        setPeriodLastWeek([startLastWeek, endLastWeek])
        setCurrentPeriod([startWeek, endWeek])
        const fetchBuys = async (token) => {
            const res = await axios({
                method: "GET",
                url: `${url}/buy`,
                headers: { 'authorization': token},
                timeout: 5000
            })
            return res.data
        }
        const getTokenFromAsyncStorage = async () => {
            let token = await getToken()
            setToken(token)
            fetchBuys(token).then(({buys}) => {
                setBuys(buys)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
                alert(`${messageServerError}`)
            })
        }
        getTokenFromAsyncStorage()
    }, [])

    useEffect(() => {
        if(route.params){
            if(route.params.type === "ADD"){
                let newBuys = [...buys]
                newBuys.push(route.params.buy)
                setBuys(newBuys)
            }else if(route.params.type === "REMOVE"){
                let newBuys = [...buys]
                let idx = newBuys.findIndex(buy => buy._id === route.params.buy._id)
                newBuys.splice(idx, 1)
                setBuys(newBuys)
            }
        }
    }, [route.params])

    useEffect(() => {
        let sellersTotal = []
        let sellersKg = []
        for(let i = 0; i < buys.length; i++){
            let dateBuy = buys[i].date
            let dateFormatted = `${dateBuy.split('/')[2]}-${dateBuy.split('/')[1]}-${dateBuy.split('/')[0]}`
            if(moment(dateFormatted).isBetween(periodLastWeek[0], periodLastWeek[1])){
                let idx = sellersTotal.findIndex( seller => seller.name === buys[i].name && seller.type === 0 )
                let idxColor = sellersTotal.findIndex( seller => seller.name === buys[i].name)
                if(idx >= 0){
                    sellersTotal[idx].value++
                    sellersKg[idx].value += buys[i].weight
                }else{
                    sellersTotal.push({
                        value: 1,
                        svg: idxColor >= 0 ? sellersTotal[idxColor].svg  : stylesBar[sellersTotal.length % 4],
                        type: 0,
                        name: buys[i].name
                    })
                    sellersKg.push({
                        value: buys[i].weight,
                        svg: idxColor >= 0 ? sellersKg[idxColor].svg  : stylesBar[sellersTotal.length % 4],
                        type: 0,
                        name: buys[i].name
                    })
                }                
            }else if(moment(dateFormatted).isBetween(currentPeriod[0], currentPeriod[1])){
                let idx = sellersTotal.findIndex( seller => seller.name === buys[i].name && seller.type === 1 )
                let idxColor = sellersTotal.findIndex( seller => seller.name === buys[i].name)
                if(idx >= 0){
                    sellersTotal[idx].value++
                    sellersKg[idx].value += buys[i].weight
                }else{
                    sellersTotal.push({
                        value: 1,
                        svg: idxColor >= 0 ? sellersTotal[idxColor].svg  : stylesBar[sellersTotal.length % 4],
                        type: 1,
                        name: buys[i].name
                    })
                    sellersKg.push({
                        value: buys[i].weight,
                        svg: idxColor >= 0 ? sellersKg[idxColor].svg  : stylesBar[sellersTotal.length % 4],
                        type: 1,
                        name: buys[i].name
                    })
                } 
            }
        }

        if(buys.length !== 0){
            let maxTotal = 0;
            let maxKg = 0
            let namesHelper = [sellersTotal[0].name]
            let finalSellersTotal = []
            let finalSellersKg = []

            if(sellersTotal.length >= 2){
                for(let i = 0; i < sellersTotal.length; i++){
                    if(maxTotal < sellersTotal[i].value){ maxTotal = sellersTotal[i].value }
                    if(maxKg < sellersKg[i].value){ maxKg = sellersKg[i].value }
                    if(namesHelper.findIndex( name => name === sellersTotal[i].name) < 0){ namesHelper.push(sellersTotal[i].name) }
                }
                for(let i = 0; i < namesHelper.length; i++){
                    finalSellersTotal = [...finalSellersTotal, ...sellersTotal.filter(seller => seller.name === namesHelper[i])]
                    finalSellersKg = [...finalSellersKg, ...sellersKg.filter(seller => seller.name === namesHelper[i])]
                }
            }else{
                maxTotal = sellersTotal[0].value
                maxKg = sellersKg[0].value
                finalSellersTotal = sellersTotal
                finalSellersKg = sellersKg
            }
    
            setMaxSolds(maxTotal)
            setMaxKgSolds(maxKg)
    
            setTotalSolds(finalSellersTotal)
            setKgSolds(finalSellersKg)
        }
        
    },[buys])

    const gotoTable = () => navigation.navigate('TableBuys', { buys })

    const LabelsSolds = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <TextSVG
                x={x(index) + 20}
                y={y(maxSolds/2) + 5}
                key={Math.random().toString()}
                fontSize={ 14 }
                fill={'black'}
                fontFamily={'Montserrat-Light'}
                rotation="90"
                originX={x(index) + bandwidth/2}
                originY={y(maxSolds/2)}
            >
                {value.type === 1 ? 'Semana Actual' : 'Última Semana'}
            </TextSVG>
        ))
    )

    const LabelsKg = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <TextSVG
                x={x(index) + 20}
                //y={y(maxKgSolds/2) + 5}
                y={y(maxKgSolds/2) + 5}
                key={Math.random().toString()}
                fontSize={ 14 }
                fill={'black'}
                fontFamily={'Montserrat-Light'}
                rotation="90"
                originX={x(index) + bandwidth/2}
                originY={y(maxKgSolds/2)}
            >
                {value.type === 1 ? 'Semana Actual' : 'Última Semana'}
            </TextSVG>
        ))
    )

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

    return (
        <View style={styles.createBuyFormContainer}>
            <BtnAdd onPress={gotoCreateBuy}/>
            <Loading active={loading} />
            <Text style={styles.titleCharts}>ESTADÍSTICAS</Text>
            {!loading && (
                <>
                    {buys.length === 0 ? (
                        <View style={{...styles.flex1, justifyContent: 'center'}}>
                            <Text style={styles.textNoneBuy}>Todavía no se ha realizado ninguna compra</Text>
                        </View>
                    ): (
                        <ScrollView style={styles.flex1}>
                            <TouchableNativeFeedback onPress={gotoTable}>
                                <View style={styles.chartContainer}>
                                    <Text style={styles.titleChart}>VENTAS TOTALES</Text>
                                    <View style={styles.chartContainerRow}>
                                        <View style={styles.YAxisChart}>
                                            <Text style={styles.textYAxis}>{maxSolds}</Text>
                                            <Text style={styles.textYAxis}>0</Text>
                                        </View>
                                        <BarChart 
                                            style={styles.chartStyle} 
                                            data={totalSolds} 
                                            yAccessor={({ item }) => item.value}
                                            yMax={maxSolds}
                                            yMin={0}
                                        >
                                            <Grid />
                                            <LabelsSolds />
                                        </BarChart>
                                    </View>
                                    <View style={styles.XAxisChart}>
                                        {totalSolds.map((item) => (
                                            <View style={styles.XAxisChartLabels} key={Math.random().toString()}>
                                                <Text style={styles.textYAxis}>{item.name}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={gotoTable}>
                                <View style={styles.chartContainer}>
                                    <Text style={styles.titleChart}>KILOGRAMOS TOTALES</Text>
                                    <View style={styles.chartContainerRow}>
                                        <View style={styles.YAxisChart}>
                                            <Text style={styles.textYAxis}>{maxKgSolds}</Text>
                                            <Text style={styles.textYAxis}>0</Text>
                                        </View>
                                        <BarChart 
                                            style={styles.chartStyle} 
                                            data={kgSolds} 
                                            yAccessor={({ item }) => item.value}
                                            yMax={maxKgSolds}
                                            yMin={0}
                                        >
                                            <Grid />
                                            <LabelsKg />
                                        </BarChart>
                                    </View>
                                    <View style={styles.XAxisChart}>
                                        {totalSolds.map((item) => (
                                            <View style={styles.XAxisChartLabels} key={Math.random().toString()}>
                                                <Text style={styles.textYAxis}>{item.name}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </ScrollView>
                    )}
                </>
            )}
        </View>
    )
}

export default BuysScreen
