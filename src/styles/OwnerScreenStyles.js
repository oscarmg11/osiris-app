import { StyleSheet, Dimensions } from 'react-native';

const { width ,height } = Dimensions.get('window')

const styles = StyleSheet.create({
    map: {
        width,
        height: height * 0.9
    },
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    rowTableInfoSection: {
        flexDirection: 'row',
        width: width * 0.9,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    bodyInfoSectionContainer: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center'
    },
    infoTitle: {
        fontSize: 20,
        color: 'rgb(0, 26, 0)',
        fontFamily: 'Montserrat-Bold'
    },
    infoSectionContainer: {
        flex: 1,
        width: width * 0.9,
        backgroundColor: 'rgb(240, 240, 240)',
        marginTop: 10
    },
    infoTitleContainer: {
        width: width * 0.9,
        height: height * 0.07,
        justifyContent: 'center',
        paddingLeft: 10,
        borderBottomColor: 'rgb(0, 26, 0)',
        borderBottomWidth: 10
    },
    infoSectionLabelsContainer: {
        width: width * 0.5,
        minHeight: height * 0.2,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    thumbnail: {
        width: width * 0.3,
        height: width * 0.3,
    },
    thumbnailInfoSectionContainer: {
        width: width * 0.4,
        minHeight: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowInfoSectionLabelContainer: {
        width: width * 0.9,
        minHeight: height * 0.2,
        flexDirection: 'row'
    },
    labelInfoSection: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgb(112, 112, 112)' 
    },
    employeesInfoSection: {
        fontFamily: 'Montserrat-Light',
        color: 'rgb(112, 112, 112)'
    },
    rowTableInfoSectionHeader: {
        width: width * 0.9,
        flexDirection: 'row',
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb( 230, 230, 230)'
    },
    cellTableInfoSection : {
        height: height * 0.05,
        width: width * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowTableInfoSectionTitle: {
        color: 'rgb(0, 26, 0)',
        fontFamily: 'Montserrat-SemiBold'
    },
    textTableInfoSection: {
        fontFamily: 'Montserrat-Light',
        color: 'rgb(120, 120, 120)'
    },
    textSectionName: {
        fontFamily: 'Montserrat-Light',
        fontSize: 10
    }
})

export default styles;