import { Image, ImageSourcePropType, Pressable, PressableProps, Text, View } from "react-native";
import { styles } from "./styles";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { theme } from "@/constants/Colors";


type Props = PressableProps &  {
    text: string
    whatIs: string
    firstIcon: ImageSourcePropType
    secondIcon: ImageSourcePropType
}

export default function SettingsPress({text, whatIs, firstIcon, secondIcon, onPress}:Props) {

    return(
        <Pressable style={styles.container} onPress={onPress} >
            <Image source={firstIcon}/>
            <Text style={{flex:1, paddingLeft:8, fontSize:20, fontFamily: theme.fonts.medium}}>
                {text}
            </Text>
            <Image source={secondIcon}/>
           

        </Pressable>
    )
}