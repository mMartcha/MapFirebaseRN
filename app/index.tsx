import React, { useContext } from 'react'
import { Image, Pressable, Text, View } from "react-native";
import MapView, { Callout, LatLng, MapMarker, Marker, Polygon, Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { entrePontos, MapContext, marcador, Ponto } from '@/context/MapContext';
import firestore from '@react-native-firebase/firestore';


export default function App() {

    const [clickedMarker, setClickedMarker] = useState<marcador[]>([])
        
    const [modalVisible, setModalVisible] = useState(false)
        
    const [selectedMarker, setSelectedMarker] = useState<Ponto>()
        
    const [distanciaFinal, setDistanciaFinal] = useState<number>(0)
        
    const [tempoTrajeto, setTempoTrajeto] = useState(Number)
    
    const [listaDeCoords, setListaDeCoords] = useState<entrePontos[]>([])   

      
    const mapRef = useRef<any>()

    const initialRegion = {
        latitude:-28.474652, 
        longitude:-52.815206,
        latitudeDelta:0.01,
        longitudeDelta:0.01
    }

    function onMarkerClick(marker: Ponto){
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
    }

    async function get(){
        firestore()
          .collection('Lugares Importantes')
          .get()
          .then(querySnapshot => {
            console.log('Total users: ', querySnapshot.size);
        
            querySnapshot.forEach(documentSnapshot => {
              console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            });
          });
    }
    
    function set() {
    lugaresImportantes.forEach(lugar => {
        firestore()
            .collection('Pontos')
            .doc("3")
            .set({
              nome:lugar.nome,
              coordenadas: new firestore.GeoPoint(
                lugar.coordenadas.latitude,
                lugar.coordenadas.longitude
              ),
                caminhos: {
                    caminhoNove: {
                        trajeto: clickedMarker,
                        distancia: distanciaFinal.toFixed(0) + ' metros',
                        tempo: formatarTempo(tempoTrajeto)
                    }
                }
             }, { merge: true }) // <-- Evita sobrescrever os dados existentes
            .then(() => {
                console.log('Ponto adicionado/atualizado!');
            })
            .catch(error => {
                console.error('Erro ao adicionar ponto:', error);
            });
    });
}
 

    const lugaresImportantes = [
      {
        nome: "Entrada",
        descricao: "Entrada.",
        id:'0',
        coordenadas: {
          latitude: -28.4739720,      
          longitude: -52.813063,
          latitudeDelta:0.01,
          longitudeDelta:0.01
      },
    },
      {
        nome: "PontoUm",
        descricao: "PontoNoveDesc.",
        id:'1',
        coordenadas: {
          latitude: -28.472847,       
          longitude: -52.814130,
          latitudeDelta:0.01,
          longitudeDelta:0.01
        },
      },
        {
          nome: "PontoDois",
          descricao: "PontoUmDesc",
          id:'2',
          coordenadas: {
            latitude: -28.472021,
            longitude: -52.814701,
            latitudeDelta:0.01,
            longitudeDelta:0.01,
                        
          },
        },
        {
          nome: "PontoTres",
          descricao: "PontoOitoDesc.",
          id:'3',
          coordenadas: {
            latitude: -28.473036,       
            longitude: -52.814999,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoQuatroN",
          descricao: "PontoDoisDesc",
          id:'4',
          coordenadas: {
            latitude: -28.473709,
            longitude: -52.814991,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoCincoN",
          descricao: "PontoSeteDesc.",
          id:'5',
          coordenadas: {
            latitude: -28.472689,        
            longitude: -52.816372,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoSeis",
          descricao: "PontoSeisDesc.",
          id:'6',
          coordenadas: {
            latitude: -28.473784,       
            longitude: -52.816914,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoSeteN",
          descricao: "PontoCincoDesc",
          id:'7',
          coordenadas: {
            latitude: -28.474204,        
            longitude: -52.818511,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoOito",
          descricao: "PontoQuatroDesc",
          id:'8',
          coordenadas: {
            latitude: -28.474851,          
            longitude: -52.817930,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "PontoNoveN",
          descricao: "PontoTresDesc",
          id:'9',
          coordenadas: {
            latitude: -28.479369,           
            longitude: -52.815446,
            latitudeDelta:0.01,
            longitudeDelta:0.01
          },
        },
        {
          nome: "Associação",
          descricao: "Palestras.",
          id:'10',
          coordenadas: {
            latitude: -28.476016,
            longitude: -52.817033,
            latitudeDelta:0.01,
            longitudeDelta:0.01

          },
        },
      ];

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

    return(
        <View style={styles.container}>

            <View style={{paddingBottom:20, alignItems:'center', flexDirection:'row', justifyContent:'space-evenly'}}>

                {/* <Pressable style={{ backgroundColor:'#EB690B', borderRadius:8, padding:10}} onPress={ () => console.log(clickedMarker)}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Press</Text>
                </Pressable> */}

                <Pressable style={{flexDirection:'row', backgroundColor:'#EB690B', borderRadius:8, padding:10, gap:12}} onPress={() => limpar()}>
                      <Text style={{fontSize:18, fontWeight:'bold'}}>Tempo Trajeto:</Text>
                    <Text style={{fontSize:18, fontWeight:'bold'}} >
                      {formatarTempo(tempoTrajeto)} 
                    </Text>
                </Pressable>

                <Pressable style={{ backgroundColor:'#EB690B', borderRadius:8, padding:10}} onPress={() => set()}>
                  <Text style={{fontWeight:'bold', fontSize:20}}>SET</Text>
                </Pressable>

            </View>

                <Modal
                    id={selectedMarker?.id}
                    isOpen={modalVisible}
                    style={{zIndex:1, top:100}}
                  >
                  <View style={{backgroundColor:'white', width:200, height:120,
                              justifyContent:'center', alignItems:'center',
                              borderRadius:8, alignSelf:'center', top:250
                              }}>
                      <Text style={{fontSize:20}}>
                        {selectedMarker?.nome}
                      </Text>

                      <Pressable onPress={() =>onCloseModalZoomOut()}>
                        <Text style={{fontSize:20, fontWeight:'bold', color:'red'}}>
                          FECHA
                        </Text>
                      </Pressable>

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
            {lugaresImportantes.map((marker, index)=>
                    <Marker
                        key={index}
                        coordinate={marker.coordenadas}  
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
                        // icon={require("@/assets/images/dot.png")}
                        anchor={{x:0.5,y:1}}
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