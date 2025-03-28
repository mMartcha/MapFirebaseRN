import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        height:150,
        width:300,
        flexDirection:'row',
        borderColor:'grey',
        borderWidth:1,
        borderRadius:20,
        overflow:"hidden",
        maxWidth:'100%'
    },
    image:{
        height:150,
        width:150
    },
    informations:{
        padding:8,
        alignItems:"baseline",
        flexShrink:1 
    },

})