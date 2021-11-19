import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({  
    flex1: { flex: 1 },
    searcherContainer: { 
        height: height * 0.88,
        width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searcherContainerLandscape: { 
        height: width * 0.88,
        width: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searcherContainerEmployee: { 
        minHeight: height * 0.1,
        width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searcherContainerEmployeeLandscape: { 
        minHeight: width * 0.1,
        width : height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searcherContainerHeight: { 
        height: height * 0.1,
        width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searcherPlants: {
        width,
        height: height * 0.7, 
    }, 
    searcherPlantsLandscape: {
        width: height,
        height: width * 0.5,
    }, 
    searcherContainerHeightLandscape: {
        height: width * 0.1,
        width: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultsContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputSearchContainer: {
        width: width * 0.7,
        height: height * 0.05,
        flexDirection: 'row',
        marginBottom: 15
    },
    checkBoxContainerSearch: {
        width : 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 20
    },
    pickerSearchContainer: {
        width: width * 0.7,
        height: height * 0.05,
        backgroundColor: 'rgb(220, 220, 220)',
        borderRadius: 20,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        marginBottom: 15
    },
    labelSearch: {
        fontFamily: 'Montserrat-Light', 
        color: 'rgb(0, 26, 0)'
    },
    checkBoxSearch: {
        width : 15,
        height: 15,
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 5,        
    },
    labelSearchContainer: {
        width: width * 0.4,
        height: height * 0.05,
        backgroundColor: 'rgb(220, 220, 220)',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'        
    },
    
    labelSearchContainerFull: {
        width: width * 0.7,
        height: height * 0.05,
        backgroundColor: 'rgb(220, 220, 220)',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center' 
    },
    titleModalTask: {
        fontFamily: 'Montserrat-Light',        
        color: 'rgb(0, 26, 0)'
    },
    inputSearch: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        padding: 0,        
        width: width * 0.25,
        height: height * 0.05,
        paddingLeft: 10
    },
    btnItemResultEmployee: {
        flex: 1,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnResultItemReport: {
        paddingLeft: 10,
        borderLeftColor: 'rgb(0, 26, 0)',
        borderLeftWidth: 2
    },
    footerItemResult: {
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    footerItemResultReports: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.03
    }, 
    textBtnItemEmployee: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgb(0, 26, 0)'
    }, 
    cardItemPlant: { 
        width: width * 0.4, 
        margin : 10
    },
    cardItemEmployee: { 
        width: width * 0.9, 
        marginBottom : 10,
        minHeight: height * 0.3,
        backgroundColor: 'white'
    },
    cardItemEmployeeLandscape:{
        width: height * 0.45, 
        marginBottom : 10,
        marginHorizontal: 5,
        minHeight: width * 0.3,
        backgroundColor: 'white'
    },
    cardItemReport: {
        width: width * 0.9, 
        marginBottom : 10,
        minHeight: height * 0.45,
        backgroundColor: 'white'
    },
    textItemEmployee: {
        fontFamily: 'Montserrat-Light'
    },
    titleItemPlant: {
        fontFamily: 'Montserrat-Bold',
        color: 'rgb(0, 26, 0)',
        fontSize: 20
    },
    textItemPlant: {
        fontFamily: 'Montserrat-Light'
    },
    textResults: {
        fontFamily: 'Montserrat-Light',
        marginBottom: 20
    },
    btnSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)',
        width: width * 0.5,
        height: height * 0.05,
        borderRadius: 20,
        marginTop: 20
    },
    textBtnSearch: {
        color: 'white',
        fontFamily: 'Montserrat-Light'
    },
    textInputSearchContainer: {
        width: width * 0.3,
        height: height * 0.05,
        backgroundColor: 'rgb(0, 26, 0)',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,        
        alignItems: 'center',        
    },
    titleSearchLight: {
        color: 'rgb(0, 26, 0)',
        fontFamily: 'Montserrat',
        fontSize: 30
    },
    titleSearchBold: {
        color: 'rgb(0, 26, 0)',
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        marginBottom: 10
    },
    resultsList: { 
        height: height* 0.6,
        width        
    },
     resultsListLandscape: { 
        height: width* 0.6,
        width : height      
    },
    resultsListLandscape: { 
        height: width* 0.6,
        width : height    
    },
    titleItemPlantContainer: {
        borderBottomColor: 'rgb(0, 26, 0)',
        borderBottomWidth: 10,
        flex: 1,
        paddingBottom: 10
    },
    sectionItemPlant: {
        color: 'rgb(120, 120, 120)',
        fontFamily: 'Montserrat-Bold',
        fontSize: 15
    },
    btnResultsContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center',
        marginBottom: 20
    },
    btnItemResult: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)',
        width: width * 0.5,
        height: height * 0.05,
        borderRadius: 20,
        marginTop: 20
    },
    chatTitle: {
        fontFamily: 'Montserrat-Bold',
        color: 'rgb(0, 26, 0)',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20
    },
    chatsContainer: {
        flex: 1,
        paddingVertical: 20
    },
    ResultsNotFoundLabel: {
        color: 'gray',
        fontSize: 15
    },
    modalTask:{
        backgroundColor: 'white',
        width: width * 0.8,
        height: height * 0.8
    },
    containerModalTask : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    headerModalTask: {
        paddingTop: 10,       
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyModalTask: {
        flex: 9,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    footerModalTask:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pickerTitleTask: { 
        width: width * 0.4, 
        height: height * 0.07
    },
    pickerTitleTaskContainer: {
        backgroundColor: 'rgb(220, 220, 220)',
        borderRadius: 20,
        height: height * 0.05,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 10
    },
    inputModalTaskContainer: {
        backgroundColor: 'rgb(240, 240, 240)',
        paddingHorizontal: 20,
        paddingBottom: 10,
        height: height * 0.25,
        marginBottom: 10
    },
    titleTask: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: 'rgb(0, 26, 0)'
    },
    textModalTask: {
        fontFamily: 'Montserrat-Light',        
    },
    textModalTaskContainer: {
        backgroundColor: 'rgb(240, 240, 240)',
        paddingLeft: 20,
        paddingVertical: 10,
        borderBottomColor: 'rgb(0, 26, 0)',
        borderBottomWidth: 5
    },
    inputTaskDescription: {
        flex: 1,        
        textAlignVertical: 'top'
    },
    textBtnFooterModalTask: {
        fontFamily: 'Montserrat-Light',
        color: 'white'
    },
    btnFooterModalTask:{
        width: width * 0.5,
        height: height * 0.05,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: 'rgb(0, 26, 0)'
    },
    btnModalTask: {
        width: width * 0.5,
        height: height * 0.05,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: 'rgb(0, 26, 0)',
        marginBottom: 10
    },
    formSpecificSearcher: {        
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputSpecificSearchPlant: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 15,
        width: width * 0.7,
        paddingLeft: 10
    },
    inputSpecificSearchPlantwSelect: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 15,
        width: width * 0.4,
        paddingLeft: 10
    },
    btnSearchSpecific: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.5
    },
    rowFormSpecificSearch: {
        flexDirection: 'row',
        width: width * 0.7
    },
    pickerSearch: {
        width: width * 0.3,
        fontFamily: 'Monteserrat'
    },
    btnDeleteTodo:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        marginRight: 10
    },
    headerAccordion: {
        width: width * 0.6
    },
    accordionContainer: {
        flexDirection: 'row', 
        alignItems: 'center'        
    },
    reportsBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    footerItemReport: {
        flex: 1, 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        height: height * 0.07
    },
    resultsReports: {
        paddingTop: 30
    },
    btnReport: {
        paddingHorizontal: 20,
        marginHorizontal: 10
    },
    modalReportImages: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalReportImagesBody: {
        height: height * 0.4,
        width: width * 0.8
    },
    imagesReportContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    fullImage: {
        width,
        height
    },
    imagesReportFlatListContent: {        
        justifyContent: 'center',
        flexGrow: 1
    },
    btnReportContainer: {
        flexDirection: 'row'
    },
    containerBtnGotoChat: {
        width: width * 0.9,
        height: height * 0.1,
        marginVertical: 10,
        backgroundColor: 'rgb(230,230,230)',
        borderLeftColor: 'rgb(0, 26, 0)',
        borderLeftWidth: 5
    },
    flatListContentContainerChats: {
        flexGrow: 1,
        alignItems: 'center'
    },
    textTitleChat: { fontFamily: 'Montserrat-Light' },
    iconUser: {
        backgroundColor: 'rgb(0, 26, 0)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.1
    },
    containerBtnGotoChatRow: {
        flexDirection: 'row',
        alignItems: 'center',        
        flex: 1,
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
    inputContainer: {        
        flexDirection: 'row',
        height: height * 0.05
    },
    chatContainer: {
        width,
        height
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
    userIconChatContainer: {
        backgroundColor: 'rgb(0, 26, 0)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
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
    inputContainerChat: {        
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
    textBtnSend: {
        color: 'white',
        fontFamily: 'Montserrat-Bold'
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
    FlatListChat: { height: height * 0.65 },
    btnCollapsibleTodos: {
        width: width * 0.7,
        height: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }, 
    btnCollapsibleTodo: {        
        width: width * 0.6,
        height: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    todoItemContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.8,
        height: height * 0.07,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: 'rgb(245, 245, 245)'
    },
    titleTodo: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgb(120, 120, 120)'
    },
    btnDeleteTodo: {
        backgroundColor: 'rgb(0, 26, 0)',
        width: width * 0.3,
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    containerDefaultImageNewTask: {
        marginRight: 10,
        flexDirection: 'row',                
        width: 100,
        height: 100,
        backgroundColor: 'rgb(210, 210, 210)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerImageNewTask: {
        marginRight: 20,
        flexDirection: 'row'
    },
    containerImageNewTaskwoMargin: {         
        flexDirection: 'row',
        marginRight: 10,
    },
    deleteImgBtnNewTask: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        position: 'relative',
        left: -height * 0.03,        
        marginRight: -width * 0.1 
    },
    imagesNewTaskContainer: {                 
        justifyContent: 'center',       
        flex: 2
    },
    mediaBtnModalTask: {
        width: width * 0.2,
        height: width * 0.2,
        backgroundColor: 'rgb(210, 210, 210)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mediaBtnModalTaskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    videoThumbnail: {
        width: width * 0.2,
        height: width * 0.2,
    },
    btnDelete: {
        width: width * 0.3,
        height: height * 0.4,
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardBodyItemReport: {
        flex: 1,
        marginTop: -height * 0.03
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
})

export default styles;