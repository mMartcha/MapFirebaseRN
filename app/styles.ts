import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        
      },
      map: {
        width:'100%',
        height:'100%',

      },
      modalContainer:{
        backgroundColor:'white',
        width:'100%', height:200,
        justifyContent:'flex-start',
        alignItems:'baseline',
        borderRadius:8,
        paddingTop:16,
        paddingHorizontal:20,
        gap:12,
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