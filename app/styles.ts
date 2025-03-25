import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        
      },
      header:{
        flexDirection:'row',
        position:"absolute",
        zIndex:1,
        alignItems:'center'
      },
      map: {
        width:'100%',
        height:'100%',
        zIndex:0        

      },
      modalContainer:{
        backgroundColor:'white',
        width:'100%',
        height:200,
        justifyContent:'flex-start',
        alignItems:'baseline',
        borderRadius:8,
        paddingTop:16,
        paddingHorizontal:20,
        gap:12,
        zIndex:1,
        
        
      },
      modalText:{
        width:'100%',
        // backgroundColor:'red',

      },
      modalButtonsView:{
        flexDirection:'row',
        width:'100%',
        // backgroundColor:'green',
        justifyContent:"space-around"
      }
})