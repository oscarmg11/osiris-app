import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableNativeFeedback, BackHandler } from 'react-native'
import { BarChart, Grid, PieChart, XAxis   } from 'react-native-svg-charts'
import { Text as TextSVG } from 'react-native-svg'
import { useFocusEffect } from '@react-navigation/native'

import styles from '../../styles/AdminScreenSytles';
import Loading from '../../components/Loading'
import InfoSection from '../../components/adminView/InfoSection'

function InfoSectionScreen({ route }){

    const styleBarCurrentHeight = { fill: 'rgb(70, 223, 229)' }
    const styleBarLastHeight = { fill: 'rgb(47, 126, 156)' }

    const styleBarCurrentWidth = { fill: 'rgb(252, 252, 7)' }
    const styleBarLastWidth = { fill: 'rgb(255, 177, 19)' }

    const styleBarCurrentNumberFruits = { fill: 'rgb(252, 76, 140)' }
    const styleBarLastNumberFruits = { fill: 'rgb(234, 47, 115)' }

    const [plants, setPlants] = useState([])
    const [employees, setEmployees] = useState([])
    const [heights, setHeights] = useState([])
    const [widths, setWidths] = useState([])
    const [numberFruits, setNumberFruits] = useState([])
    const [plagues, setPlagues] = useState([])
    const [lastPlagues, setLastPlagues] = useState([])
    const [section, setSection] = useState({})
    const [dataFilled, setDataFilled] = useState(false)
    const [seeTable, setSeeTable] = useState(false)
    const [infoType, setInfoType] = useState('')
    const [maxHeight, setMaxHeight] = useState(0)
    const [maxWidth, setMaxWidth] = useState(0)
    const [maxNumberFruits, setMaxNumberFruits] = useState(0)


    useEffect(() => {
        if(route.params){
            const { plants, employees, section } = route.params
            setPlants(plants)
            setEmployees(employees)
            setSection(section)
            let totalHeight = 0
            let totalWidth = 0
            let totalNumberFruits = 0
            let wPlague = 0
            let woPlague = 0
            for(let i = 0; i < plants.length; i++){
                totalHeight += plants[i].height
                totalWidth += plants[i].width
                totalNumberFruits += plants[i].numberFruits
                if(plants[i].statusReported){ wPlague+= 1 }
                else{ woPlague += 1 }
            }
            totalHeight = totalHeight / plants.length
            totalWidth = totalWidth / plants.length
            totalNumberFruits = totalNumberFruits / plants.length
            if(section.lastPeriod){
                if(section.lastPeriod.height > totalHeight){ setMaxHeight(section.lastPeriod.height) }
                else{ setMaxHeight(totalHeight) }

                if(section.lastPeriod.width > totalWidth){ setMaxWidth(section.lastPeriod.width) }
                else{ setMaxWidth(totalWidth) }

                if(section.lastPeriod.numberFruits > totalNumberFruits){ setMaxNumberFruits(section.lastPeriod.numberFruits) }
                else{ setMaxNumberFruits(totalNumberFruits) }
            }else{
                setMaxHeight(totalHeight)
                setMaxWidth(totalWidth)
                setMaxNumberFruits(totalNumberFruits)
            }
            setHeights([{
                value: section.lastPeriod ? section.lastPeriod.height : 0,
                svg: styleBarLastHeight,
            }, {
                value: totalHeight,
                svg: styleBarCurrentHeight,
            }])
            setWidths([{
                value: section.lastPeriod ? section.lastPeriod.width : 0,
                svg: styleBarLastWidth,
            }, {
                value: totalWidth,
                svg: styleBarCurrentWidth,
            }])
            setNumberFruits([{
                value: section.lastPeriod ? section.lastPeriod.numberFruits : 0,
                svg: styleBarLastNumberFruits,
            },{
                value: totalNumberFruits,
                svg: styleBarCurrentNumberFruits,
            }])
            setLastPlagues([{
                value: section.lastPeriod ? section.lastPeriod.withPlague : 0,
                svg: { fill: 'rgb(0, 26, 0)' },
                label: 'CR',
                key: 1
            }, {
                value: section.lastPeriod ? section.lastPeriod.withoutPlague : 0,
                svg: { fill: 'rgb(43, 184, 82)' },
                label: 'SR',
                key: 2
            }])
            setPlagues([{
                value: wPlague,
                svg: { fill: 'rgb(0, 26, 0)' },
                label: 'CR',
                key: 1
            }, {
                value: woPlague,
                svg: { fill: 'rgb(43, 184, 82)' },
                label: 'SR',
                key: 2
            }])
        }
    }, [])

    useEffect(() => {
        if(heights.length !== 0 && widths.length !== 0 && numberFruits.length !== 0 && plagues.length !== 0){
            setDataFilled(true)
        }
    }, [heights, widths, numberFruits, plagues])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if(seeTable){ setSeeTable(false) }
                else{ return false }             
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);                        
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },[seeTable])
    )

    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <TextSVG
                x={x(index) + bandwidth/2 - 20}
                y={y(0) - 14}
                key={Math.random().toString()}
                fontSize={ 14 }
                fill={ 'white' }
                fontFamily={'Montserrat-Light'}
            >
                {value.value.toFixed(2)}
            </TextSVG>
        ))
    )

    const PieLabels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <TextSVG
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={10}
                    fontFamily={'Montserrat-Light'}
                >
                    {`${data.value} ${data.label}`}
                </TextSVG>
            )
        })
    }

    const seeInfoTable = (infoType) => {
        setSeeTable(true)
        setInfoType(infoType) 
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {!seeTable ? (
                <ScrollView style={styles.chartsContainer} contentContainerStyle={{ alignItems: 'center' }}>                    
                    <Loading active={!dataFilled}/>
                    {dataFilled && ( 
                        <>
                        <Text style={styles.titleCharts}>ESTADÍSTICAS</Text>
                        <TouchableNativeFeedback onPress={() => seeInfoTable('height')}>
                            <View style={styles.chartContainer}>
                                <Text style={styles.titleChart}>ALTURA</Text>
                                <View style={styles.chartContainerRow}>
                                    <View style={styles.YAxisChart}>
                                        <Text style={styles.textYAxis}>{maxHeight.toFixed(2)}</Text> 
                                        <Text style={styles.textYAxis}>0</Text>
                                    </View>
                                    <BarChart 
                                        style={styles.chartStyle} 
                                        data={heights} 
                                        yAccessor={({ item }) => item.value}
                                        yMax={maxHeight}
                                        yMin={0}
                                    >
                                        <Grid />
                                        <Labels />
                                    </BarChart>
                                </View>
                                <View style={styles.XAxisChart}>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ÚLTIMO PERIODO</Text>
                                    </View>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ACTUAL</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => seeInfoTable('width')}>
                            <View style={styles.chartContainer}>
                                <Text style={styles.titleChart}>ANCHO</Text>
                                <View style={styles.chartContainerRow}>
                                    <View style={styles.YAxisChart}>
                                        <Text style={styles.textYAxis}>{maxWidth.toFixed(2)}</Text>
                                        <Text style={styles.textYAxis}>0</Text>
                                    </View>
                                    <BarChart 
                                        style={styles.chartStyle} 
                                        data={widths} 
                                        yAccessor={({ item }) => item.value}
                                        yMax={maxWidth}
                                        yMin={0}
                                    >
                                        <Grid />
                                        <Labels />
                                    </BarChart>
                                </View>
                                <View style={styles.XAxisChart}>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ÚLTIMO PERIODO</Text>
                                    </View>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ACTUAL</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => seeInfoTable('numberFruits')}>
                            <View style={styles.chartContainer}>
                                <Text style={styles.titleChart}>NÚMERO DE FRUTOS</Text>
                                <View style={styles.chartContainerRow}>
                                    <View style={styles.YAxisChart}>
                                        <Text style={styles.textYAxis}>{maxNumberFruits.toFixed(2)}</Text>
                                        <Text style={styles.textYAxis}>0</Text>
                                    </View>
                                    <BarChart 
                                        style={styles.chartStyle} 
                                        data={numberFruits} 
                                        yAccessor={({ item }) => item.value}
                                        yMax={maxNumberFruits}
                                        yMin={0}
                                    >
                                        <Grid />
                                        <Labels />
                                    </BarChart>
                                </View>
                                <View style={styles.XAxisChart}>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ÚLTIMO PERIODO</Text>
                                    </View>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ACTUAL</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => seeInfoTable('plague')}>
                            <View style={styles.chartContainer}>
                                <Text style={styles.titleChart}>REPORTES</Text>
                                <View style={styles.chartContainerRow}>
                                    <PieChart 
                                        style={styles.pieChartStyle} 
                                        data={lastPlagues}
                                        innerRadius={0}
                                    >
                                        <PieLabels />
                                    </PieChart>
                                    <PieChart 
                                        style={styles.pieChartStyle} 
                                        data={plagues}
                                        innerRadius={0}
                                    >
                                        <PieLabels />
                                    </PieChart>
                                </View>
                                <View style={styles.XAxisChart}>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ÚLTIMO PERIODO</Text>
                                    </View>
                                    <View style={styles.XAxisChartLabels}>
                                        <Text style={styles.textYAxis}>ACTUAL</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        </>
                    )}
                </ScrollView>
            ) : (
                <InfoSection 
                    infoType={infoType}
                    employees={employees}
                    section={section}
                    plants={plants}
                />
            )}
        </View>
    )
}

export default InfoSectionScreen 
