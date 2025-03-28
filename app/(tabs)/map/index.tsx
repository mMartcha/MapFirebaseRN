import React, { useContext } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, LatLng, MapMarker, Marker, Polygon, Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { entrePontos, MapContext, marcador, Ponto } from '@/context/MapContext';
import firestore, { FirebaseFirestoreTypes, GeoPoint, getFirestore } from '@react-native-firebase/firestore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles';




type point ={
  id:string
  nome: string
  coordenadas: LatLng
  caminhos:{
    caminho:{
      distancia: number
      tempo: number
      trajeto:[]
    }
  }
}
export default function Map() {

    const [clickedMarker, setClickedMarker] = useState<marcador[]>([])
        
    const [modalVisible, setModalVisible] = useState(false)
        
    const [selectedMarker, setSelectedMarker] = useState<point>()

    const [secondSelectedMarker, setSecondSelectedMarker] = useState<point>()
        
    const [distanciaFinal, setDistanciaFinal] = useState<number>(0)
        
    const [tempoTrajeto, setTempoTrajeto] = useState(Number)
    
    const [listaDeCoords, setListaDeCoords] = useState<point[]>([])   

    const [showTheWay, setShowTheWay] = useState(false)

      
    const mapRef = useRef<any>()

    const initialRegion = {
        latitude:-28.474652, 
        longitude:-52.815206,
        latitudeDelta:0.01,
        longitudeDelta:0.01
    }

    function onMarkerClick(marker: point){
        setSelectedMarker(marker)
        setModalVisible(true)
        console.log(marker)
        mapRef.current?.animateCamera({
          center: { latitude:marker?.coordenadas.latitude, longitude: marker?.coordenadas.longitude},
          // zoom: 19,
        }
        // , { duration: 2000 }
      );
      
      }

    function onCloseModalZoomOut(){
      setModalVisible(false)
      mapRef.current?.animateCamera({
        center: {latitude: initialRegion.latitude, longitude:initialRegion.longitude},
        zoom: 16,
      }, { duration: 1000 });
    }


     function calcularDistancia(coord1: marcador, coord2: marcador) {
      const R = 6371000;
      const toRad = (graus: number) => (graus * Math.PI) / 180;
    
      const dLat = toRad(coord2.latitude - coord1.latitude);
      const dLon = toRad(coord2.longitude - coord1.longitude);
    
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coord1.latitude)) * Math.cos(toRad(coord2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
      const dist = R * c 
      
      const teste = distanciaFinal + dist
      
      console.log(dist.toFixed(1) + ' METROS')
      console.log(teste.toFixed(1) + ' DISTANCIA TOTAL')
      setTempoTrajeto(distanciaFinal/1.35)
      setDistanciaFinal(distanciaFinal + dist)
      
    }
    
    function formatarTempo(segundos: number){
      if(segundos > 60){
        const minutos = Math.floor(segundos / 60)
        return `${minutos.toFixed(0)} minuto(s)`; 
      } else {
        return `${Math.floor(segundos)} segundo(s)`
      }
    }

    function limpar(){
      setClickedMarker([])
      setTempoTrajeto(0)
      setDistanciaFinal(0)
      // setSelectedMarker()
    }

    function showWay(){
      console.log(selectedMarker)
      setShowTheWay(true)
    }
    
    
    function get(){
    getFirestore()
      .collection('Pontos')
      .get()
      .then(querySnapshot => {
        console.log('Pontos: ', querySnapshot.size);
          const data = querySnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
          }))
          console.log('Dados carregados:', data); // Verifique os dados no console
          setListaDeCoords(data); // Atualiza o estado corretamente
        })
        .catch(error => console.error('Erro ao buscar pontos:', error));             
}


      function set() {
        clickedMarker.forEach(node =>{
          getFirestore()
          .collection('Nodes')
          .doc('1')
          .set({
                  building: true,
                  coordenadas: 
                  new firestore.GeoPoint(
                     clickedMarker[0].latitude,
                     clickedMarker[0].longitude
                    ),
          }, { merge: false })
          .then(() => {
              console.log('Coordenadas atualizadas!');
          })
          .catch(error => {
              console.error('Erro ao atualizar coordenadas:', error);
          });
    
        })
      }
        


      let cordenada1: marcador
      let cordenada2: marcador

      const clickedMarkerLength = clickedMarker.length

      if(clickedMarkerLength === 2){
        cordenada1 = clickedMarker[0]
        cordenada2 = clickedMarker[1]
      }
      else if(clickedMarkerLength > 2){
        cordenada1 = clickedMarker[clickedMarkerLength - 2]
        cordenada2 = clickedMarker[clickedMarkerLength - 1]
      }
      
      useEffect(()=>{
        if(clickedMarkerLength >= 2){
            calcularDistancia(cordenada1, cordenada2)
            }
            },[clickedMarkerLength])

            useEffect(()=>{
                get()
            },[])

    return(
        <View style={styles.container}>

            <View style={styles.header}>

                <Pressable style={{flexDirection:'row', backgroundColor:'#EB690B', borderRadius:8, padding:10, gap:12}} onPress={() => limpar()}>
                       <Text style={{fontSize:18, fontWeight:'bold'}}>Tempo Trajeto:</Text>                                                       {/* JSON.stringify(places) */}
                    <Text style={{fontSize:18, fontWeight:'bold'}} >
                      {formatarTempo(tempoTrajeto)} 
                    </Text>
                </Pressable>

                {/* <Pressable style={{ backgroundColor:'#EB690B', borderRadius:8, padding:10}} onPress={() => set()}>
                  <Text style={{fontWeight:'bold', fontSize:20}}>SET</Text>
                </Pressable> */}

            </View>

                <Modal
                    id={selectedMarker?.id}
                    isOpen={modalVisible}
                    animationType='slide'
                    transparent={true} // Para sobrepor corretamente ao MapView
                  >

                    <View style={styles.modalContainer}>
                      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between' }}>
                        <View style={{}}>
                          <Text style={{fontSize:18}}>
                            <Text style={{fontWeight:'bold'}}>Galpão:</Text> {selectedMarker?.nome}
                          </Text>
                          <Text style={{fontSize:18}}>
                            <Text style={{fontWeight:'bold'}}>Trabalhadores:</Text> 123
                          </Text>
                        </View>

                        <View style={{ }}>
                          <Text style={{fontSize:18}}>
                            <Text style={{fontWeight:'bold'}}>ID Galpão:</Text> {selectedMarker?.id}
                          </Text>
                          <Text style={{fontSize:18}}>
                            <Text style={{fontWeight:'bold'}}>??????:</Text> 123
                          </Text>
                        </View>
                      </View>

                      <View style={styles.modalButtonsView}>
                        <Pressable onPress={() =>showWay()} style={{alignItems:'center', backgroundColor:'#778899', width:80, height:40, borderRadius:8, justifyContent:'center'}}>
                          <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>
                            Sim
                          </Text>
                        </Pressable>
                        <Pressable onPress={() =>onCloseModalZoomOut()} style={{alignItems:'center',backgroundColor:'#778899', width:80, height:40, borderRadius:8, justifyContent:'center'}}>
                          <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>
                            Fechar
                          </Text>
                        </Pressable>
                      </View>
                      
                      
                    </View>
                </Modal>

   
          <MapView style={styles.map}
            initialRegion={initialRegion}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            mapType="satellite"
            onPress={(cord) => {    
              let coordenadas = cord.nativeEvent.coordinate
              setClickedMarker((prev: any) => [ ...prev, coordenadas])
            }}
            >

                {listaDeCoords.map(marker=>
                    <Marker
                        key={marker.id}
                        coordinate={{
                          latitude: marker.coordenadas.latitude,
                          longitude: marker.coordenadas.longitude
                        }}  
                        onPress={() => onMarkerClick(marker)}
                        pinColor="#EB690B"
                        
                        >
                    </Marker>
                  )}
                

                {clickedMarker.map((marker, index)=>
                    <Marker
                        key={index}
                        coordinate={marker}  
                        pinColor="#EB690B"
                        anchor={{x:0.5,y:1}}
                        // onPress={() => }
                        >
                    </Marker>
                  )}

                <Polyline
                  coordinates={clickedMarker}
                  strokeColor="red"
                  strokeWidth={3}
                />
               
              
            </MapView>
        </View>
    )
}
