import { Text, View } from "react-native";
import { styles } from "./styles";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from "@expo/vector-icons/FontAwesome";


type Props ={
    text: string
    whatIs: string
}

export default function SettingsPress({text, whatIs}:Props) {

    let firstIcon

    if(whatIs === '1'){
        firstIcon = 'language-outline'
    }else if(whatIs === '2'){
        firstIcon = 'clipboard-outline'
    }else if(whatIs === '3'){
        firstIcon = 'moon-outline'
    }

    let secondIcon

    if(whatIs === '1'){
        secondIcon = 'angle-right'
    }else if(whatIs === '2'){
        secondIcon = 'share'
    }else if(whatIs === '3'){
        secondIcon = 'toggle-off'
    }


    return(
        <View style={styles.container}>
            <Ionicons name={firstIcon} size={24} color="#EB690B" />
            <Text style={{flex:1, paddingLeft:8, fontSize:20}}>
                {text}
            </Text>
            <FontAwesome name={secondIcon} size={24} color="#EB690B" />  
        </View>
    )
}