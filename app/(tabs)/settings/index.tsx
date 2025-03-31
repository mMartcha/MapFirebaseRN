import SettingsPress from "@/components/SettingsPressable";
import { Text, View } from "react-native";
import { styles } from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { theme } from "@/constants/Colors";
import { useState } from "react";

export default function Settings() {

    const [buttonOn, setButtonOn] = useState(false)

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <FontAwesome name='angle-left' size={24} color="grey" style={{flex:1}}  />  
                <Text style={{fontSize:24, position:"absolute", fontFamily: theme.fonts.medium }}>
                    Configurações
                </Text>
            </View>

            <View style={styles.pressablesView}>
                <SettingsPress
                    text="Fonte/ Idioma"
                    whatIs="1"
                    firstIcon={require('@/assets/images/language.png')}
                    secondIcon={require('@/assets/images/right.png')}
                />
                <SettingsPress
                    text="Políticas de privacidade"
                    whatIs="2"
                    firstIcon={require('@/assets/images/clipboardText.png')}
                    secondIcon={require('@/assets/images/share.png')}
                />
                <SettingsPress
                    text="Modo Dark"
                    whatIs="3"
                    firstIcon={require('@/assets/images/moon.png')}
                    secondIcon={buttonOn ? require('@/assets/images/toggleOn.png') : require("@/assets/images/toggleOff.png")}
                    onPress={()=> setButtonOn(prevState => !prevState)}
                    
                />
            </View>

        </View>
    )
}