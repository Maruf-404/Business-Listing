import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from "../../constants/Colors"

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.Primary
    }} >
     <Tabs.Screen name='home' 
     options={{
      tabBarLabel: "Home",
       tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
     }}
     />
     <Tabs.Screen name='explore' 
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />
        }}
     />
     <Tabs.Screen name='profile'
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="people-circle-sharp" size={24} color={color} />
        }}
     />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})