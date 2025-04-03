import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SetStateAction, useEffect, useState } from "react";
import { theme } from "@/constants/Colors";
import { FirebaseFirestoreTypes, getFirestore } from "@react-native-firebase/firestore";


type Props = {
    title: string,
    tempo: number,
    data: string
    news?: boolean
    products?: boolean
    moneySign?: boolean
    toggleMin?: boolean
}

type carroselUm ={
    title: string
    data: string
    imagem: string
    tempo: number
}

export default function CarroselView({title, tempo, data, news, moneySign,toggleMin, products}: Props) {

    const maquina = require('@/assets/images/trator.png')
    const copo = require('@/assets/images/copo.png')

    const [carroselUmMidia, setCarroselUmMidia] = useState<carroselUm[]>([])
    const [carroselUmImages, setCarroselUmImages] = useState()

    
    const tipsAndContents = require('@/assets/images/tipo.png')
    const newProducts = require('@/assets/images/newProducts.png')

    let images: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[] = []

    function getCarrosel1() {
        getFirestore()
        .collection('testeCarrosel')
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(element =>{
                images.push(element)
                console.log(images)
                })
              })
              .catch(error => console.error('Erro ao buscar pontos:', error));
        }

        
        
        useEffect(()=>{
            // getCarrosel1()
        },[])


    return(
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={(news === true ? maquina : copo)}
                    resizeMode="stretch"
                    style={{ height:161}}
                />
            </View>

            <View style={styles.informations}>
                <Image
                    source={(products === true ? newProducts : tipsAndContents )}
                    style={{height:20, width:110}}
                />
                <Text style={{fontFamily: theme.fonts.medium, fontSize:12}}>{title}</Text>

                <View style={{gap:6}}>

                    <View style={{flexDirection:'row', gap:6, alignItems:'center', justifyContent:"flex-start"}}>

                        {moneySign === true ?
                         <Image source={require('@/assets/images/CurrencyCircleDollar.png')} style={{height:16, width:16, tintColor:'#EB690B'}}/> :
                        <Image source={require('@/assets/images/Clock.png')} style={{padding:8}}/>}
                        {toggleMin === true ?
                        <Text style={{fontFamily: theme.fonts.medium, fontSize:10}}>{tempo} MIN</Text> :
                        <Text style={{fontFamily: theme.fonts.medium, fontSize:10}}>R$ {tempo.toFixed(2)} </Text>}
                        
                    </View>

                    <View style={{flexDirection:'row', gap:6, alignItems:'center', justifyContent:"flex-start" }}>
                        
                        
                        <Pressable onPress={() => getCarrosel1()}>
                            <AntDesign name="calendar" size={18} color="#EB690B" />
                        </Pressable>
                        
                        
                        <Text style={{fontFamily: theme.fonts.medium, fontSize:10, }}>
                            {data} 
                        </Text>
                        
                        <Pressable onPress={()=> console.log(carroselUmImages)}>
                            <Image source={require('@/assets/images/share.png')}  style={{left:35, height:30, width:30}}/>
                        </Pressable>
                    
                    </View>
                </View>

            </View>

        </View>   
    )
}