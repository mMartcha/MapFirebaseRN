import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import CarroselView from "@/components/Carrosel";
import { useEffect, useState } from "react";
import { getFirestore } from "@react-native-firebase/firestore";

type carroselUm ={
    title: string
    underTitle: string
    data: string
    tempo: number
}

type carroselDois = {
    data: string
    nome: string
    valor: number
}

export default function Home() {

    const [carroselUm, setCarroselUm] = useState<carroselUm[]>([])
    const [carroselDois, setCarroselDois] = useState<carroselDois[]>([])


    function getCarrosel1(){
        getFirestore()
          .collection('testeCarrosel')
          .get()
          .then(querySnapshot => {
            console.log('Pontos: ', querySnapshot.size);
              const data = querySnapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
              }))
              console.log('Dados carregados:', data); // Verifique os dados no console
              setCarroselUm(data); // Atualiza o estado corretamente
            })
            .catch(error => console.error('Erro ao buscar pontos:', error));             
    }

    function getCarrosel2(){
        getFirestore()
          .collection('testeCarroselDois')
          .get()
          .then(querySnapshot => {
            console.log('Pontos: ', querySnapshot.size);
              const data = querySnapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
              }))
              console.log('Dados carregados:', data); // Verifique os dados no console
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
                <Text style={{fontSize:36, color:'white'}}>Bem Vindo</Text>
            </View>
            <View style={styles.header2} >
                <Image source={require('@/assets/images/positivo.png')}  />
            </View>
        </View>

            <View style={styles.experience}>
                <Text style={{fontSize:20}}>Vamos começar a experiencia?</Text>
                <View style={styles.insideExperience}>
                    <Text style={{fontSize:16, color:'grey'}}>Iniciar</Text>
                    <AntDesign name="arrowright" size={24} color="grey" />
                </View>
            </View>

                <Text style={{fontSize:20, marginLeft:12, marginVertical:20}}>Notícias</Text>
            <View style={styles.carrosel}>
                
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                    horizontal
                    data={carroselUm}
                    renderItem={(item)=> (
                        <CarroselView
                            title={carroselUm[item.index].title}
                            underTitle={carroselUm[item.index].underTitle}
                            data={carroselUm[item.index].data}
                            tempo={carroselUm[item.index].tempo}
                            news
                        />
                    )}
                />
            </View>

            <Text style={{fontSize:20, marginLeft:12, marginVertical:20}}>Novidades Stara Mania!</Text>

            <View style={styles.carrosel}>
                
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                    horizontal
                    data={carroselDois}
                    renderItem={(item)=> (
                        <CarroselView
                            // title={carroselDois[item.index].}
                            underTitle={carroselDois[item.index].nome}
                            tempo={carroselDois[item.index].valor}
                            data={carroselDois[item.index].data}
                            moneySign 
                        />
                    )}
                />
            </View>

            {/* <View style={styles.carrosel2}>
            <Text>Novidades Stara Mania!</Text>

            </View> */}
        </View>
    )
}