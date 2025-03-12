import React, { useContext, useRef } from 'react'
import { View } from "react-native";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";



export default function App() {

    const mapRef = useRef<any>()

    const initialRegion = {
        latitude:-28.474652, 
        longitude:-52.815206,
        latitudeDelta:0.01,
        longitudeDelta:0.01
    }

    return(
        <View style={styles.container}>

          <MapView style={styles.map}
            initialRegion={initialRegion}
            ref={mapRef}
            mapType="satellite"
            >
                
            </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        padding:1
      },
      map: {
        width: '100%',
        height: '100%',
        borderRadius: 15,      },
})