import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/hooks/useColorScheme';
import { MapContextProvider } from '@/context/MapContext';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });



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
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color='black' />,
          }}
          />

        <Tabs.Screen
          name='(tabs)/map/index'
          options={{
            title:"Map",
            tabBarIcon: ({ color }) => <FontAwesome name="map-marker" size={24} color="black" />,
          }}
        />

         <Tabs.Screen
          name='(tabs)/settings/index'
          options={{
            title:"Settings",
            tabBarIcon: ({ color }) => <FontAwesome name="gear" size={24} color="black" />,
          }}
        />


      </Tabs>
    </MapContextProvider>
  );
}
