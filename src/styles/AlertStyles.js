import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    alertContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert: {
        backgroundColor: 'white',
        width: width * 0.8,
        height: height * 0.3,
        borderRadius: 10
    },
    flex1: { flex: 1 },
    alertTitleContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    alertTitle: {
        fontFamily: 'Montserrat-Bold',
        color: 'rgb(0,26,0)',
        fontSize: 20,
        textAlign: 'center'
    },
    alertBodyContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Light'
    },
    alertFooterContainer: {
        flexDirection: 'row',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end'        
    },
    btnAlert: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        width: width * 0.3,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtnCancel: {
        fontFamily: 'Montserrat-Light',
        color: 'rgb(120,120,120)',
    },
    textBtnOk: {
        fontFamily: 'Montserrat-Bold',
        color: 'rgb(0, 26, 0)'
    }
})

export default styles;