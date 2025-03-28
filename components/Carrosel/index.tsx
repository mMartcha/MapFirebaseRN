import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type Props = {
    title: string,
    underTitle: string,
    tempo: number,
    data: string
    news?: boolean
    moneySign?: boolean

}

export default function CarroselView({title, underTitle, tempo, data, news, moneySign}: Props) {


    const maquina = require('@/assets/images/image3.png')
    const copo = require('@/assets/images/image6.png')

    return(
        <View style={styles.container}>
            <View style={styles.image}>
                
                <Image source={(news === true ? maquina : copo)}
                    resizeMode="stretch"
                    style={{ height:150, borderTopLeftRadius:20, borderBottomLeftRadius:20}}
                />
            </View>

            <View style={styles.informations}>
                <Image
                    source={require('@/assets/images/tipo.png')}
                    style={{height:20, width:110}}
                />
                <Text>{title}</Text>
                <Text >{underTitle}</Text>
                
                <View style={{flexDirection:'row', gap:6}}>
                    {moneySign === true ? <MaterialIcons name="attach-money" size={18} color="#EB690B" /> :
                     <AntDesign name="clockcircleo" size={18} color="#EB690B" />}
                    <Text>{tempo} min</Text>
                </View>

                <View style={{flexDirection:'row', gap:6}}>
                    <AntDesign name="calendar" size={18} color="#EB690B" />
                    <Text>
                        {data} 
                    </Text>
                </View>
            </View>

        </View>   
    )
}