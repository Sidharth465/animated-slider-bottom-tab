import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AnimatedTab from '@/components/AnimatedTab';
import { SharedStateProvider } from '@/context/SharedContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SharedStateProvider>
    <Tabs
    
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        animation:"fade",
        tabBarStyle: Platform.select({
          ios: {

            position: 'absolute',
          },
          
          default: {

          },
        }),
      }}
      
      tabBar={(props)=><AnimatedTab {...props}/>}/>
     
   
  </SharedStateProvider>
  );
}
