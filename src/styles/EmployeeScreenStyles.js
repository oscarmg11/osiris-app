import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    QRCamera:{
        flex: 1,
        width,
        height
    },
    btnInfoPlant: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: 'rgb(16, 28, 16)',
        borderWidth: 3,
        backgroundColor: 'transparent',
        marginHorizontal: 7        
    },
    btnNextReadingQRIcon: {
        width: 25,
        height: 25
    },  
    textBtnQRActive: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    body: {
        width,
        height,
        alignItems: 'center'
    },
    btnContainer: {
        height: height * 0.1,
        width,
        justifyContent: 'center',        
        flexDirection: 'row'
    },
    infoContainer: { 
        height: height * 0.75,
        width
    },
    infoContainerFull: { 
        height: height * 0.89,
        width
    },
    inputEditInfoDateContainer: {
        width: width * 0.6,
        height: height * 0.05,
        borderRadius: 50,
        backgroundColor: 'rgb(220,220,220)',
        flexDirection: 'row',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputEditInfoDate: {
        width: width * 0.1,
        height: height * 0.05,
        borderRadius: 50,
        backgroundColor: 'rgb(220,220,220)',
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
        padding: 0
    },
    inputEditInfo: {
        width: width * 0.3,
        height: height * 0.05,
        borderRadius: 50,
        fontFamily: 'Montserrat-Light',
        textAlign: 'center',
    },
    inputEditInfoIconContainer: { 
        flex: 1,
        alignItems: 'flex-end', 
        justifyContent: 'center' 
    },
    inputEditInfoContainerRow: {
        flex: 1,
        flexDirection: 'row'
    },
    inputEditInfoPlantContainer: { 
        flex: 2,
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    inputEditInfoContainer: {
        width: width * 0.6,
        height: height * 0.05,
        borderRadius: 50,
        backgroundColor: 'rgb(220,220,220)',
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEditInfoContainer: {
        paddingHorizontal: 20,
        justifyContent: 'flex-end'        
    },
    btnEditInfo: {               
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.3,
        borderRadius: 25,
        marginVertical: 10,
        flexDirection: 'row'      
    },
    textBtnEditInfo: {
        color: 'white',
        fontFamily: 'Montserrat-Light'
    },  
    todosContainer: {        
        width: width * 0.9,
        backgroundColor: 'rgb(230, 230, 230)',
        marginBottom: 20
    },
    textTodo: {
        margin: 10,
        color: 'rgb(68, 70, 69)'
    },
    todoTitle: {        
        fontSize: 20,
        marginVertical: 10,
        marginLeft: 10,
        fontFamily: 'Montserrat-Bold',
        color: 'rgb(5, 22, 4)'
    },
    todoIconContainer: {
        width: 30,
        height: 30,
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 20
    },
    todoTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineTodoItem: {
        height: 5,
        width: width * 0.9,
        backgroundColor: 'rgb(5, 22, 4)'
    },
    flex1: {flex: 1},
    todoContainerBtn: {
        alignItems: 'flex-end'
    },
    todoBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        marginTop: 10,
        backgroundColor: 'rgb(5, 22, 4)'
    },
    checkIcon: {
        width: 20,
        height: 20
    },
    modalBody: {
        width: width * 0.8,
        height: height * 0.8,
        backgroundColor: 'white'
    },
    modal: {
        flex: 1,
        paddingTop: height * 0.05,        
        alignItems: 'center'
    },
    btnModalContainer: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    labelEditPlant: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
        marginBottom: 5,
        color: 'rgb(0, 26, 0)'
    },
    modalBodyContainer: {
        flex: 15,        
        padding: 20,
        alignItems: 'center'
    },
    iconBtnModalReport: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnModalReport: {       
        backgroundColor: 'rgb(0, 26, 0)'
    },
    imageReport: {
        height: height * 0.2,
        width: width * 0.2        
    },
    cameraStyle: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center', 
        padding: 50       
    },
    btnTakePicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'       
    },
    containerImageReport: {
        marginRight: 20,
        flexDirection: 'row'
    },
    containerDefaultImageReport: {
        marginRight: 10,
        flexDirection: 'row',                
        width: 100,
        height: 100,
        backgroundColor: 'rgb(210, 210, 210)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerImageReportwoMargin: {         
        flexDirection: 'row',
        marginRight: 10,
    },
    deleteImgBtnReport: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        position: 'relative',
        left: -height * 0.03,        
        marginRight: -width * 0.1
    },
    imagesReportContainer: {                
        justifyContent: 'center',       
        flex: 2
    },
    inputReport: {       
        paddingHorizontal: 15,
        borderTopColor: 'gray',
        borderTopWidth: 1,
        fontFamily: 'Montserrat-Light',
        color: 'rgb(100, 100, 100)',
        flex: 1,
        textAlignVertical: 'top',
        paddingTop: 10
    },
    inputReportContainer: {       
        flex: 4,
        width: width * 0.7
    },
    helpBtnContainer: {
        width: width,
        height: height * 0.1,
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'flex-end'
    },
    btnHelp: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(1, 25, 1)'       
    },
    btnsCloseReportCameraContainer: {
        width,
        height: height * 0.08
    },
    btnsDivisionCloseReportCameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    btnDivisionCloseReportCameraContainer: {
        flex: 1,        
        alignItems: 'center'
    },
    titleChatContainer: {
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',        
        backgroundColor: 'rgb(0, 26, 0)',
        //flex: 1      
    },
    titleChat: {
        color: 'white',
        fontFamily: 'Montserrat-Bold', 
        fontSize: 25        
    },
    bodyChat: {
        height: height * 0.75,
        marginVertical: 5
        //flex: 6,
    },
    inputChat: {       
        backgroundColor: 'white',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        paddingHorizontal: 20,
        width: width * 0.6,
        height: height * 0.05,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        paddingBottom: height * 0.01,
        borderTopWidth: 0,
        textAlignVertical: 'bottom'
    },
    chatContainer: {
        width,
        height
    }, 
    inputContainer: {        
        flexDirection: 'row',
        height: height * 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)',
        position: 'absolute',
        bottom: height * 0.03,
        left: 0,
        width,
        paddingHorizontal: 5
    },
    inputChatContainer: {
        flexDirection: 'row',
        flex: 1
    },
    btnRecordAudio: {
        width: width * 0.15,
        height: height * 0.05,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(170, 170, 170)'
    },
    btnSend: {
        width: width * 0.2,
        height: height * 0.05,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'rgb(170, 170, 170)'
    },
    textBtnSend: {
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    },
    messageContainerLeft: {
        width,                
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',        
    },
    messageContainerRight: {
        width,                
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        marginBottom: 10,
        flexDirection: 'row',        
    },
    messageBorder: {
        paddingHorizontal: 20,
        backgroundColor: 'rgb(230,230,230)',
        marginHorizontal: 20,
        borderRadius: 15,
        flex: 1,
        minHeight: 50,
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    messageDateText: {
        color: 'gray',
        fontSize: 10
    },
    infoPlantContainerContent: {      
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    infoPlantContainer: { height: height * 0.7},
    titleInfoPlant: {
        color: 'rgb(16, 28, 16)',
        fontSize: 30,
        fontFamily: 'Montserrat-Light'
    },
    numberInfoPlant: {
        color: 'rgb(16, 28, 16)',
        fontSize: 50,
        fontFamily: 'Montserrat-Black'
    },
    rowInfoPlant: {
        flexDirection: 'row',
        width: width * 0.7,
        height: height * 0.05,
        marginBottom: 15
    },
    labelInfoPlantContainer: {
        width: width * 0.4,
        height: height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgb(229, 228, 226)',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        paddingLeft: 10
    },
    labelInfoPlant: {
        fontFamily: 'Montserrat-Light',
        color: 'rgb(16, 28, 16)',
    },
    valueInfoPlantContainer: {
        width: width * 0.3,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },
    valueInfoPlant: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 15
    },
    valueInfoPlantforID: {
        width: width * 0.7,
        height: height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgb(229, 228, 226)',
        borderRadius: 30,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    logo: {
        width: width * 0.7
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStartReading: {
        backgroundColor: 'rgb(0, 26, 0)',
        width: width * 0.5,
        borderRadius: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textBtnStartReading: {
        color: 'white',
        fontFamily: 'Montserrat-Light'        
    },
    btnDoneReadingContainer: {
        height: height * 0.1,
        alignItems: 'center'        
    },
    btnInfoPLantContainer: {
        marginTop: -height * 0.05,
        height: height * 0.2
    },
    btnEndReading: {        
        backgroundColor: 'rgb(0, 26, 0)',
        width: width * 0.5,
        borderRadius: 40,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    userIconChatContainer: {
        backgroundColor: 'rgb(0, 26, 0)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    reportModalTitleContainer: {      
        width: width * 0.7,
        borderBottomColor: 'rgb(0, 26, 0)',
        borderBottomWidth: 8,
        paddingLeft: 10,
        paddingVertical: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    reportModalTitle: {
        color: 'rgb(0, 26, 0)',
        fontFamily: 'Montserrat-Bold',
        marginRight: 10
    },
    fullScreen: {
        width,
        height
    },
    btnCloseVideoTodo: {
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: height * 0.05,
        right: width * 0.1,
        zIndex: 1
    },
    icon: {
        width: 20,
        height: height * 0.04,
        marginRight: 10        
    }, 
    labelEditPlantContainer: {
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'center',
        height: height * 0.04,
        marginBottom: 5
    },
    flatListTodos: {
        height: height * 0.78,
        marginBottom: 30
    },
    recordingText: {
        color: 'white',
        fontFamily: 'Montserrat-Light'
    },
    audioChatContainer: {
        flexDirection: 'row',
        flex: 1
    },
    iconPlayAudioMessageContainer: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
        flexDirection: 'row'
    }
})