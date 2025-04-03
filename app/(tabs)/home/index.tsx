import { Button, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import CarroselView from "@/components/Carrosel";
import { useEffect, useState } from "react";
import { getFirestore } from "@react-native-firebase/firestore";
import { theme } from "@/constants/Colors";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from "expo-router";

type carroselUm ={
    title: string
    data: string
    tempo: number
}

type carroselDois = {
    data: string
    nome: string
    valor: number
}

export default function Home() {


    const [permission, requestPermission] = useCameraPermissions()

    const isPermissionGranted = Boolean(permission?.granted)


    const [carroselUm, setCarroselUm] = useState<carroselUm[]>([])
    const [carroselDois, setCarroselDois] = useState<carroselDois[]>([])

    function qrCodeReader(){
        router.navigate("/(tabs)/camera")
    }


    function getCarrosel1() {
        getFirestore()
          .collection('testeCarrosel')
          .get()
          .then(querySnapshot => {           
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              title: doc.data().title || '',  // Garante que o campo exista
              data: doc.data().data || '',
              tempo: doc.data().tempo || '',
            })) as carroselUm[]; // Força o tipo correto
            
            // console.log('Dados carregados:', data);
            setCarroselUm(data); // Atualiza o estado corretamente
          })
          .catch(error => console.error('Erro ao buscar pontos:', error));
    }
    

    function getCarrosel2() {
        getFirestore()
          .collection('testeCarroselDois')
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              nome: doc.data().nome || '',
              data: doc.data().data || '',
              valor: doc.data().valor || '',
            })) as carroselDois[]; // Força o tipo correto
            
            // console.log('Dados carregados:', data);
            setCarroselDois(data); // Atualiza o estado corretamente
          })
          .catch(error => console.error('Erro ao buscar pontos:', error));
    }
    

    useEffect(()=>{
        getCarrosel1()
        getCarrosel2()
    },[])

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
                <Pressable style={styles.insideExperience} disabled={!isPermissionGranted} onPress={qrCodeReader}>
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