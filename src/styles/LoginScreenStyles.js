import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    imgLogoContainer: { 
        flex: 4,
        justifyContent: 'flex-end'      
    },
    btnContainer:{ flex: 5 },
    body: {
        flex: 1,              
        backgroundColor: 'rgb(0,26,0)',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    imgWhiteLogo: {
        width: width * 0.9,
        height: height * 0.17  
    },
    btnLogin: {
        width: width * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(60,174,89)', 
        borderRadius: 40,
        width: width * 0.5,
        marginBottom: 20   
    },
    btnTextLogin: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold'
    },
    input: { 
        width: width * 0.4,
        height: height * 0.06,
        position: 'relative',
        left: -width * 0.25,
        color: 'white',
        fontFamily: 'Montserrat-Light'
    },
    inputContainer: {
        borderColor: 'rgb(60,174,89)',
        borderWidth: 3,
        borderRadius: 40,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.6,
        paddingLeft: 15
    },
    form: {      
        justifyContent: 'center',
        flex: 4
    },  
    errorLabel: {
        color: 'red',
        marginTop: 10,
        position: 'absolute',
        bottom: height * 0.1        
    },
    placeholder:{
        color: 'white', 
        fontFamily: 'Montserrat-Light'     
    },
    placeholderContainer: {
        width: width * 0.38,        
        position: 'relative',
        right: -width * 0.16
    },
    inputIcon: {
        width: 25,
        height: 25,
        marginRight: -25
    }
})