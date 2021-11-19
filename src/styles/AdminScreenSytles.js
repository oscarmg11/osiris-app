import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({ 
    flex1: { flex: 1 },
    mapContainer: {
        width,
        height,
        alignItems: 'center'
    },
    map: {
        width: width,
        height: height * 0.78,
    }, 
    mapSaveLocation: {
        width: width * 0.8,
        height: height * 0.2,
    },
    btnMapContainer: {
        width,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    markerMap: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'blue'
    },
    btnEditSectionMap: { 
        width: width * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.05,
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 25
    },
    containerEditInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width,
        justifyContent: 'space-evenly',
        height : height * 0.08
    },
    modalContainer: {
        flex: 1,        
        alignItems: 'center',
        paddingTop: height * 0.05        
    },
    modalNewSectionsBody: {
        width: width * 0.8,
        height: height * 0.8
    },
    modalBody: {
        flex: 1,
        backgroundColor: 'white'
    },
    labelInputModalEditUser: {
        fontFamily: 'Montserrat-Light',
        color: 'rgb(0, 26, 0)'
    },
    labelInputModalEditUserRow: {
        fontFamily: 'Montserrat-Light',
        color: 'white'
    },
    btnCameraModalEditUser: { marginTop: 20 },
    headerModalNewSections: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyModalNewSections: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputNewSection: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: width * 0.5,
        marginBottom: 10
    },
    itemEmployeeCheckbox: {
        flexDirection: 'row',
        width: width * 0.5,
        justifyContent: 'space-between',
        marginVertical: 10
    },
    flatListEmployees: { 
        minHeight: height * 0.1, 
        marginBottom: 20 
    },
    footerModalNewSections: {
        width,
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnModalNewSections: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputPlantsModalNewSections: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgb(230, 230, 230)',
        width: width * 0.6,
        padding: 0,
        height: height * 0.05,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        borderRadius: 25
    },
    inputPlantModalNewSection: {
        width: width * 0.2,  
        padding: 0,
        fontFamily: 'Montserrat-Light',
        textAlign: 'center'
    },
    inputDateModalNewSection: {
        width: width * 0.1,  
        padding: 0,
        fontFamily: 'Montserrat-Light',
        textAlign: 'center'
    },
    infoTitle: {
        fontSize: 20,
        color: 'rgb(0, 26, 0)',
        fontFamily: 'Montserrat-Bold'
    },
    textBtnEditMap: {
        color: 'white',
        fontFamily: 'Montserrat-Light'
    },
    rowTableInfoSection: {
        width: width * 0.9,
        flexDirection: 'row',
        height: height * 0.05,
        backgroundColor: 'rgb(235, 235, 235)'
    },
    rowTableInfoSectionLandscape: {
        width: height * 0.9,
        flexDirection: 'row',
        height: height * 0.05,
        backgroundColor: 'rgb(235, 235, 235)'
    },
    cellTableInfoSection : {
        height: height * 0.05,
        width: width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellTableInfoSectionLandscape : {
        height: height * 0.05,
        width: height * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellTableInfoBuys : {
        height: height * 0.05,
        width: width * 0.18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellTableInfoBuysLandscape : {
        height: height * 0.05,
        width: height * 0.18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTableInfoSection: {
        fontFamily: 'Montserrat-Light',
        color: 'rgb(120, 120, 120)'
    },
    rowTableInfoSectionHeader: {
        width: width * 0.9,
        flexDirection: 'row',
        height: height * 0.05,
        backgroundColor: 'rgb( 230, 230, 230)'
    },
    rowTableInfoSectionHeaderLandscape: {
        width: height * 0.9,
        flexDirection: 'row',
        height: height * 0.05,
        backgroundColor: 'rgb( 230, 230, 230)'
    },
    rowTableInfoSectionTitle: {
        color: 'rgb(0, 26, 0)',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
    listContainerBtnOwners: { width: width * 0.8 },
    btnOwner: {
        width: width * 0.6,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 25,
        marginBottom: 10
    },
    containerUsers: {
        padding: 20,
        flex: 1,
        zIndex: 0
    },
    btnCollapsibleUsers: {
        backgroundColor: 'transparent',
        paddingLeft: 10
    },
    containerBtnCollapsibleUsers: {
        flexDirection: 'row',
        width: width * 0.8,
        justifyContent: 'space-between'
    },
    listUsers: { height: height * 0.85 },
    btnUser: {
        width: width * 0.2,
        height : height * 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: { 
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoUserContainer: {
        width: width * 0.5,
        paddingLeft: 10
    },
    photoContainer: {
        width: width * 0.3,
        alignItems: 'center'
    },
    listSectionCheckbox: {
        height: height * 0.2
    },
    inputEditUser: {
        width: width * 0.6,
        padding: 0,
        height: height * 0.05,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        textAlign: 'center',
        borderRadius: 25
    },
    inputEditUserPlantasNewSection: {
        height: height * 0.05,
        padding: 0,
        width: width * 0.2,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    inputEditUserPlantas: {
        height: height * 0.05,
        padding: 0,
        width: width * 0.12,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',        
    },
    rowInputEditUser: {
        flexDirection: 'row',
        width: width * 0.6,
        height: height * 0.05,
        marginBottom: 15
    },
    rowInputEditUserLabelContainer: {
        width: width * 0.3,
        height: height * 0.05,
        backgroundColor: 'rgb(0, 26, 0)',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: 'center',
        paddingLeft: 15
    },
    rowInputEditUserInputContainer: {
        width: width * 0.3,
        height: height * 0.05,
        backgroundColor: 'rgb(230, 230, 230)',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        paddingLeft: 15
    },
    rowInputEditUserInputContainerPlants: {
        width: width * 0.3,
        height: height * 0.05,
        backgroundColor: 'rgb(230, 230, 230)',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        flexDirection: 'row'
    },
    footerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnAddUser: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        position: 'absolute',
        bottom: height * 0.04,
        right: width * 0.1,
        borderColor: 'rgb(0, 26, 0)',
        borderWidth: 3,
        backgroundColor: 'transparent',
        zIndex: 1
    },
    btnAddSection: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: 'rgb(0, 26, 0)',
        borderWidth: 3,
        backgroundColor: 'transparent',
        zIndex: 1
    },
    btnRemoveSection: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: 'rgb(0, 26, 0)',
        borderWidth: 3,
        backgroundColor: 'transparent',
        zIndex: 1
    },
    pickerNewUser: {
        width: width * 0.5
    },
    bodyCreateUser: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    inputNewUser: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: width * 0.5,
        padding: 0,
        paddingLeft: 10,
        marginBottom: 20
    },
    containerBtnsEdit: {
        height: height * 0.6,
        justifyContent: 'space-evenly'
    },
    listCoordinatesEditSection: { 
        height: height * 0.5,
        width: width  * 0.8
    },
    thumbnail: {
        width: width * 0.3,
        height: width * 0.3,
    },
    thumbnailwoPhoto: {
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: 'rgb(210, 210, 210)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnailMini: {
        width: width * 0.2,
        height: width * 0.2,
    },
    fullImage: { width, height },
    inputNewUserPlants: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: width * 0.2,
        padding: 0,
        paddingLeft: 10,
        marginBottom: 20
    },
    rowInputNewUser: {
        flexDirection: 'row'        
    },
    logo: { width: width * 0.7 },
    btnOwnersContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.15
    },
    containerBtnUsers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnGotoUser: {
        width: width * 0.6,
        height: height * 0.05,
        backgroundColor: 'rgb(0, 26 , 0)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    textBtnGotoUser: {
        color: 'white',
        fontFamily: 'Montserrat-Light',
        fontSize: 15
    },
    cardInfoUser: {
        width: width * 0.9,
        minHeight: height * 0.3,
        backgroundColor: 'rgb(235, 235, 235)',
        marginBottom: 10
    },
    headerInfoUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,        
        width: width * 0.9,
        height: height * 0.07,
        borderBottomColor: 'rgb(0, 26, 0)',
        borderBottomWidth: 5
    },
    nameUser: {
        color: 'rgb(0, 26, 0)',
        fontSize: 17,
        fontFamily: 'Montserrat-SemiBold'
    },
    bodyInfoUser: {
        flexDirection: 'row',
        width: width * 0.9,
        height: height * 0.23,
        padding: 10,
        alignItems: 'center' 
    },
    textInfoUserGray: {
        color: 'rgb(100, 100, 100)',
        fontFamily: 'Montserrat-SemiBold'
    },
    textInfoUser: {
        color: 'rgb(100, 100, 100)',
        fontFamily: 'Montserrat-Light'
    },
    lastCoordinate: {
        color: 'white',
        fontFamily: 'Montserrat-Light'
    },
    btnDelete: {
        width: width * 0.3,
        height: height * 0.3,
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDeleteBuy: {
        width: width * 0.3,
        height: height * 0.05,
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDeletePdf: {
        width: width * 0.3,
        height: height * 0.1,
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSaveEditUser: {
        width: width * 0.4,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 25
    },
    btnEditPasswordUser: {
        width: width * 0.6,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 25
    },
    textBtnSaveEditUser: {
        fontFamily: 'Montserrat-Light',
        color: 'white'
    },
    viewNewUser: { width },
    modalSections: {  
        width: width * 0.8
    },
    containerCheckbox: {
        width : width * 0.9,
        height: height * 0.07,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgb(240, 240, 240)'
    },
    checkbox: {
        width: height * 0.04,
        height : height * 0.04,
        backgroundColor: 'white',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxMarker: {
        width: height * 0.03,
        height : height * 0.03,
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 5
    },
    infoSectionContainer: {
        flex: 1,
        width: width * 0.9,
        backgroundColor: 'rgb(240, 240, 240)',
        marginTop: 10
    },
    scrollViewLandscape: {
        flex: 1,
        width: height * 0.9,
        backgroundColor: 'rgb(240, 240, 240)',
        marginTop: 10
    },
    infoTitleContainer: {
        width: width * 0.9,
        minHeight: height * 0.07,
        justifyContent: 'center',
        paddingLeft: 10,
        borderBottomColor: 'rgb(0, 26, 0)',
        borderBottomWidth: 10
    },
    thumbnailInfoSectionContainer: {
        width: width * 0.4,
        minHeight: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoSectionLabelsContainer: {
        width: width * 0.5,
        minHeight: height * 0.2,
        paddingLeft: 10,
        justifyContent: 'center'
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
    rowCoordinatesEditSection: {
       width: width * 0.8,
       height: height * 0.08,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'rgb(240, 240, 240)',
       marginBottom: 10
    },
    lastRowCoordinatesEditSection: {
        width: width * 0.8,
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 26, 0)', 
        marginBottom: 10
     },
    btnDeleteCoordinates: {
        width: width * 0.3,
       height: height * 0.08,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'rgb(0, 26, 0)'
    },
    chat: {
        height: height * 0.7,
        marginBottom: 10,
    },
    containerPdf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputNamePdf: {
        width: width * 0.6,
        padding: 0,
        height: height * 0.05,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        textAlign: 'center',
        borderRadius: 25,
        fontFamily: 'Montserrat-Light'
    },
    labelInputNamePdf: {
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 10
    },
    containerImgsPDF: {
        width,
        height: height * 0.7,
        alignItems: 'center',
        paddingTop: 10
    },
    containerDefaultImagePDF: {
        marginRight: 10,
        marginTop: 10,
        flexDirection: 'row',                
        width: 100,
        height: 100,
        backgroundColor: 'rgb(210, 210, 210)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    containerImagePDF: {
        marginRight: 20,
        flexDirection: 'row',
        marginTop: 10
    },
    containerImagePDFwoMargin: {         
        flexDirection: 'row',
        marginRight: 10,
        marginTop: 10
    },
    deleteImgBtnPDF: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        position: 'relative',
        left: -height * 0.03,        
        marginRight: -width * 0.1
    },
    pdfDocumentItem: {
        width: width * 0.8,
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(220, 220, 220)',
        marginBottom: 10
    },
    textpdfDocumentItem: {
        fontFamily: 'Montserrat-Light'
    },
    pdfTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginBottom: 20
    },
    listPDFContainer: {
        width,
        height: height * 0.75,
        alignItems: 'center'
    },
    labelEmptyPdf: {
        fontFamily: 'Montserrat-Light',
        color: 'rgb(120, 120, 120)'
    },
    btnEndCropping: {
        backgroundColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        left: width * 0.5 - 20,
        bottom: height * 0.02,
        zIndex: 1
    },
    btnCloseCropingImage: {
        backgroundColor: 'rgb(0, 26, 0)',
        position: 'absolute',
        top: height * 0.02,
        right: width * 0.05,
        zIndex: 1,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdfContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pdf: {
        flex: 1,
        width,
        height: height * 0.7,
    },
    newSectionContainer: {
        flex: 1,
        alignItems: 'center'
    },
    labelNewSection: {
        fontFamily: 'Montserrat-Light',
        marginBottom: 10
    },
    titleNewSection: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginVertical: 10,
    },
    modalPolygonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalPolygonBody: {
        width: width * 0.8,
        borderRadius: 10,
        height: height * 0.3,
        backgroundColor: 'white'
    },
    saveLocationContainer: { 
        width, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingVertical: 20,
        height: height * 0.8,
    },
    bodyModalInfoSectionDeleted: {
        backgroundColor: 'white',
        width: width * 0.8,
        height: height * 0.5,
    },
    titleModalInfoSectionDeleted: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 20,
    },
    textModalInfoSectionDeleted:{
        fontFamily: 'Montserrat-Light',
        textAlign: 'center'
    },
    chartsContainer: {
        flex: 1,
        paddingTop: 10
    },
    chartStyle: {
        width: width * 0.8,
        height: height * 0.3,
    },
    YAxisChart: {
        height: height * 0.3 + 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    pieChartStyle: {
        width: width * 0.5,
        height: width * 0.4
    },
    XAxisChart: {
        width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: width * 0.1 + 10,
        paddingRight: width * 0.07,
        marginTop: -20
    },
    XAxisChartLabels: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10
    },
    chartContainer: {
        width,
        height: height * 0.5,
        alignItems: 'center'
    },
    chartContainerRow: {
        width,
        height: height * 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleCharts: {
        fontFamily: 'Montserrat-Black',
        fontSize: 20,
        marginBottom: 10
    },
    textYAxis: {
        fontFamily: 'Montserrat-Light',
        fontSize: 10
    },
    titleChart: {
        fontFamily: 'Montserrat-SemiBold',
    },
    createBuyFormContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    btnSignCaptureContainer: {
        flexDirection: 'row',
        width,
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textNoneBuy: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15
    },
    imgInfoBuy: {
        width,
        height
    },
    textSectionName: {
        fontFamily: 'Montserrat-Light',
        fontSize: 10
    },
    textDateNewBuy: {
        width: width * 0.1,
        alignItems: 'center'
    },
    signatureLine: {
        position: 'absolute',
        borderRightColor: 'rgb(0, 26, 0)',
        justifyContent: 'center',
        borderRightWidth: 1,
        width: 0,
        height: height * 0.6,
        zIndex: 2,
        bottom: height * 0.2,
        left: width * 0.3,
        alignItems: 'center'
    },
    signatureLabel: {
        position: 'absolute',
        fontFamily: 'Montserrat-Light',
        transform: [{ rotate: '90deg' }],
        left: width * 0.15,
        top: height * 0.5 - 30,
        zIndex: 2,
        fontSize: 15
    },
    checkboxContainer: {
        flexDirection: 'row',
        width: width * 0.8,
        height: height * 0.05,
        backgroundColor: 'rgb(230, 230, 230)',
        alignItems: 'center',
        paddingLeft: width * 0.1
    },
    checkboxEmployeeItem: {
        width: width * 0.06,
        height: width * 0.06,
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxMarker: {
        width: width * 0.04,
        height: width * 0.04,
        backgroundColor: 'rgb(0, 26, 0)',
        borderRadius: 3,
    },
    label: {
        fontFamily: 'Montserrat-Light'
    },
    inputPlantsNewSection: {
        width: width * 0.8,
        alignItems: 'center',
        backgroundColor: 'rgb(230, 230, 230)',
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    }
})

export default styles;