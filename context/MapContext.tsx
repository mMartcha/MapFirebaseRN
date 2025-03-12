import { createContext, ReactNode, useState } from "react";
import React from "react";
import { LatLng } from "react-native-maps";

    export type Ponto = {
        nome: string;
        descricao: string;
        id: string;
        coordenadas: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
        };
    };
  
    export type marcador = 
        {
            latitude: number
            longitude: number
        }

        export type info = {
            idsTo: number,
            path: LatLng[],
            time: number,
            dist: number,
        }

    export type entrePontos = {
            id: number,
            paths: info[]
    }





type MapContextProps = {
    clickedMarker: marcador[],
    setClickedMarker: React.Dispatch<React.SetStateAction<marcador[]>>,
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    selectedMarker: Ponto | undefined,
    setSelectedMarker: React.Dispatch<React.SetStateAction<Ponto | undefined>>,
    distanciaFinal: number,
    setDistanciaFinal: React.Dispatch<React.SetStateAction<number>>,
    tempoTrajeto: number,
    setTempoTrajeto: React.Dispatch<React.SetStateAction<number>>,
    listaDeCoords: entrePontos[],
    setListaDeCoords: React.Dispatch<React.SetStateAction<entrePontos[]>>
}



type MapContextProviderProps={
    children: ReactNode
}
export const MapContext = createContext({} as MapContextProps)

export function MapContextProvider({children}:MapContextProviderProps ){

        const [clickedMarker, setClickedMarker] = useState<marcador[]>([])
    
        const [modalVisible, setModalVisible] = useState(false)
    
        const [selectedMarker, setSelectedMarker] = useState<Ponto>()
    
        const [distanciaFinal, setDistanciaFinal] = useState<number>(0)
    
        const [tempoTrajeto, setTempoTrajeto] = useState(Number)

        const [listaDeCoords, setListaDeCoords] = useState<entrePontos[]>([])
   
    return(
        <MapContext.Provider value={{
            clickedMarker,setClickedMarker,
            modalVisible,setModalVisible,
            selectedMarker,setSelectedMarker,
            distanciaFinal,setDistanciaFinal,
            tempoTrajeto, setTempoTrajeto,
            listaDeCoords,setListaDeCoords
        }}>
            {children}
        </MapContext.Provider>
    )

}