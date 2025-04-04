import { createContext, ReactNode, useState } from "react";
import React from "react";
import { ImageSourcePropType } from "react-native";
import { LatLng } from "react-native-maps";

    export type Ponto = {
        nome: string;
        descricao: string;
        id: string;
        coordenadas: {
        latitude: number;
        longitude: number;
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

    type carroselUm ={
        title: string
        data: string
        tempo: number
        imagem?: ImageSourcePropType
    }
    
    type carroselDois = {
        data: string
        nome: string
        valor: number
        imagem?: ImageSourcePropType
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
    carroselUmImages: string[],
    setCarroselUmImages: React.Dispatch<React.SetStateAction<string[]>>,
    carroselDoisImages: string[],
    setCarroselDoisImages: React.Dispatch<React.SetStateAction<string[]>>
    carroselUm: carroselUm[],
    setCarroselUm: React.Dispatch<React.SetStateAction<carroselUm[]>>
    carroselDois: carroselDois[],
    setCarroselDois: React.Dispatch<React.SetStateAction<carroselDois[]>>
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
        
        const [carroselUmImages, setCarroselUmImages] = useState<string[]>([])

        const [carroselDoisImages, setCarroselDoisImages] = useState<string[]>([])

        const [carroselUm, setCarroselUm] = useState<carroselUm[]>([])

        const [carroselDois, setCarroselDois] = useState<carroselDois[]>([])
   
    return(
        <MapContext.Provider value={{
            clickedMarker,setClickedMarker,
            modalVisible,setModalVisible,
            selectedMarker,setSelectedMarker,
            distanciaFinal,setDistanciaFinal,
            tempoTrajeto, setTempoTrajeto,
            listaDeCoords,setListaDeCoords,
            carroselUmImages,setCarroselUmImages,
            carroselDoisImages,setCarroselDoisImages,
            carroselUm, setCarroselUm,
            carroselDois, setCarroselDois
        }}>
            {children}
        </MapContext.Provider>
    )

}