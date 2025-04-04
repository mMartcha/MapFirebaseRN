import { Button, FlatList, Image, ImageSourcePropType, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import CarroselView from "@/components/Carrosel";
import { useContext, useEffect, useState } from "react";
import { getFirestore } from "@react-native-firebase/firestore";
import { theme } from "@/constants/Colors";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from "expo-router";
import { MapContext } from "@/context/MapContext";
import { getCarroselImages1,getCarroselImages2 } from "@/services/getCarroselImage";
import { fetchCarrosel1, fetchCarrosel2 } from "@/services/fetchCarrosel";



export default function Home() {


    const {carroselUmImages,setCarroselUmImages, carroselDoisImages, setCarroselDoisImages, carroselUm,setCarroselUm,setCarroselDois, carroselDois} = useContext(MapContext)

    const [permission, requestPermission] = useCameraPermissions()

    const isPermissionGranted = Boolean(permission?.granted)


    function qrCodeReader(){
        router.navigate("/(tabs)/camera")
    }
    

    useEffect(() => {
        getCarroselImages1(setCarroselUmImages);
        getCarroselImages2(setCarroselDoisImages);
    }, []);
    


    return( 
        <View style={styles.container}>

        <View style={{flexDirection:'row'}}>
            
            <View style={styles.header1}>
                <Text style={{fontSize:36, color:'white', fontFamily:theme.fonts.bold, flexShrink:1}} >Bem Vindo!</Text>
            </View>
            <View style={styles.header2}>
                <Image source={require('@/assets/images/positivo.png')}/>
            </View>
        </View>
     

            <View style={styles.experience}>
                <Text style={{fontSize:20, fontFamily:theme.fonts.semiBold}}>Vamos começar a experiencia?</Text>
                <Pressable style={styles.insideExperience} onPress={()=> console.log(carroselUmImages)}>
                    <Text style={{fontSize:16, color:'grey', fontFamily:theme.fonts.medium, opacity: !isPermissionGranted ? 0.5 : 1}}>Iniciar</Text>
                    <Image source={require('@/assets/images/ArrowRight.png')}/>
                </Pressable>
            </View>

            <ScrollView>

                <Text style={{fontSize:20, marginLeft:12, marginVertical:20, fontFamily:theme.fonts.medium}}>Notícias</Text>
            <View style={styles.carrosel}>
                
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                    horizontal
                    data={carroselUm}
                    renderItem={(item)=> (
                        <CarroselView
                            title={carroselUm[item.index].title}
                            data={carroselUm[item.index].data}
                            tempo={carroselUm[item.index].tempo}
                            news
                            toggleMin
                            image={carroselUmImages[item.index]}
                            />
                    )}
                />
            </View>

            <Text style={{fontSize:20, marginLeft:12, marginVertical:20, fontFamily:theme.fonts.medium}}>Novidades Stara Mania!</Text>

            <View style={styles.carrosel}>
                
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                    horizontal
                    data={carroselDois}
                    renderItem={(item)=> (
                        <CarroselView
                        title={carroselDois[item.index].nome}
                        tempo={carroselDois[item.index].valor}
                            data={carroselDois[item.index].data}
                            moneySign 
                            products
                            image={carroselDoisImages[item.index]}

                            />
                        )}
                        />
            </View>

                <Text style={{fontSize:20, marginLeft:12, marginVertical:20, fontFamily:theme.fonts.medium}}>
                    TEM NOVIDADE NA ÁREA!
                </Text>

                <View style={styles.homeLowerView}>
                    <Image
                        source={require('@/assets/images/tratorinho.png')}
                        

                    />
                </View>

         
            </ScrollView>
        </View>
    )
}