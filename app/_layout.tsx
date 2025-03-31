import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/hooks/useColorScheme';
import { MapContextProvider } from '@/context/MapContext';
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,

} from '@expo-google-fonts/montserrat';
import { Image } from 'react-native';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,  });



  return (
    <MapContextProvider>
      <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor: '#EB690B'}}>

      <Tabs.Screen    
          name='index'
          options={{
            href:null,
            title:"index",
          }}
          />

        <Tabs.Screen    
          name='(tabs)/home/index'
          options={{
            title:"Home",
            tabBarIcon: ({ color }) => <Image source={require('@/assets/images/House.png')}/>
            ,
          }}
          />

        <Tabs.Screen
          name='(tabs)/map/index'
          options={{
            title:"Map",
            tabBarIcon: ({ color }) => <Image source={require('@/assets/images/MapPinLine.png')}/>
            ,
          }}
        />

         <Tabs.Screen
          name='(tabs)/settings/index'
          options={{
            title:"Settings",
            tabBarIcon: ({ color }) => <Image source={require('@/assets/images/Gear.png')}/>
            ,
          }}
        />


      </Tabs>
    </MapContextProvider>
  );
}
