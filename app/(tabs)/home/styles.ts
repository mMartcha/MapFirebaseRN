import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    header1:{
        backgroundColor:'#EB690B',
        height:110,
        width:'70%',
        alignItems:'center',
        justifyContent:'center'
    },
    header2:{
        backgroundColor:'#EB690B',
        flex:1,
        borderBottomRightRadius:90,
        alignItems:'baseline',
        justifyContent:'center'
    },
    experience:{
        marginTop:40,
        marginHorizontal:12,
        borderWidth:0.8,
        borderColor:'black',
        height:115,
        borderRadius:20,
        padding:16,
        justifyContent:"space-between"
    },
    insideExperience:{
        borderColor:'grey',
        borderWidth:1,
        borderRadius:20,
        padding:4,
        paddingHorizontal:8,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"flex-end",
        flexDirection:'row',
        gap:8,

        

    },
    carrosel:{
        marginHorizontal:12
    },

    homeLowerView:{
        marginHorizontal:12,
        height:300,
        borderWidth:1,
        borderColor:'black',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
      },
    

})