import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { theme } from "@/constants/Colors";


type Props = {
    title: string,
    tempo: number,
    data: string
    news?: boolean
    moneySign?: boolean
    toggleMin?: boolean
}

export default function CarroselView({title, tempo, data, news, moneySign,toggleMin}: Props) {

    const maquina = require('@/assets/images/image3.png')
    const copo = require('@/assets/images/image6.png')

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
                    source={require('@/assets/images/tipo.png')}
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

                    <View style={{flexDirection:'row', gap:6, alignItems:'center', }}>
                        <AntDesign name="calendar" size={18} color="#EB690B" />
                        <Text style={{fontFamily: theme.fonts.medium, fontSize:10, }}>
                            {data} 
                        </Text>
                        
                        <Image source={require('@/assets/images/share.png')}  style={{}}/>
                    </View>
                </View>

            </View>

        </View>   
    )
}