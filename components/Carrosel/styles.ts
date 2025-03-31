import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        height:160,
        width:320,
        flexDirection:'row',
        borderColor:'grey',
        borderWidth:1,
        borderRadius:20,
        overflow:"hidden",
        maxWidth:'100%',
        
    },
    image:{
        height:160,
        width:160
    },
    informations:{
        padding:8,
        alignItems:"baseline",
        flexShrink:1,
        justifyContent:"space-around"
    },

})