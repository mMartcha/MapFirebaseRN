import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        flex:1
        
      },
      header:{
        flexDirection:'row',
        position:"absolute",
        alignItems:'center',
        alignSelf:"center",
        zIndex:1
      },
      map: {
        width:'100%',
        height:'100%',
        zIndex:0,
  


      },
      
      modalContainer:{  
          backgroundColor: 'white',
          height: 200, 
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderRadius: 8,
          paddingTop: 16,
          paddingHorizontal: 20,
          gap: 12,
          zIndex: 2,
          padding: 12,

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