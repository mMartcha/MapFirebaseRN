import SettingsPress from "@/components/SettingsPressable";
import { Text, View } from "react-native";
import { styles } from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Settings() {
    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <FontAwesome name='angle-left' size={24} color="grey" style={{flex:1}}  />  
                <Text style={{fontSize:24, position:"absolute", }}>
                    Configurações
                </Text>
            </View>

            <View style={styles.pressablesView}>
                <SettingsPress
                    text="Fonte/ Idioma"
                    whatIs="1"
                />
                <SettingsPress
                    text="Políticas de privacidade"
                    whatIs="2"
                />
                <SettingsPress
                    text="Modo Dark"
                    whatIs="3"
                />
            </View>

        </View>
    )
}