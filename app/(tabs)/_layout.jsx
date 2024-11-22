import { View, Text,Image } from 'react-native'
import {Tabs,Redirect} from 'expo-router'
import {icons} from '../../constants'
import React from 'react'

const TabsLayout = () => {
  const TabIcon = ({icon,color,name,focused}) => {
    return <View className = 'justify-center items-center pt-5'> 
        <Image
         source={icon} 
        resizeMode='contain'
        tintColor={color}
        className = 'w-6 h-6'
        />
        <Text className = {`${focused ? 'font-psemibold' : 'font-pregular'} mt-2 text-[10px]`} numberOfLines={1}
         style = {{color:color,
          width: 'auto',
        minWidth: 60,
        textAlign: 'center'}}>{name}</Text>
    </View>
}
  return (
   <>
     <Tabs 
     screenOptions={{
      tabBarShowLabel : false,
      tabBarActiveTintColor : '#FFA001',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle:{
        backgroundColor : "#161622",
        borderTopWidth:1,
        borderBlockColor: "#232533",
        height:84,
      }
     }}
     >
        <Tabs.Screen
         name='home'
         options={{
            title : "Home",
            headerShown : false,
            tabBarIcon : ({focused,color}) => (
              
                <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
                />
            )
         }}
         />
        <Tabs.Screen
         name='bookmark'
         options={{
            title : "Bookmark",
            headerShown : false,
            tabBarIcon : ({focused,color}) => (
                <TabIcon 
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
                />
            )
         }}
         />
        <Tabs.Screen
         name='create'
         options={{
            title : "Create",
            headerShown : false,
            tabBarIcon : ({focused,color}) => (
                <TabIcon 
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
                />
            )
         }}
         />
        <Tabs.Screen
         name='profile'
         options={{
            title : "Profile",
            headerShown : false,
            tabBarIcon : ({focused,color}) => (
                <TabIcon 
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
                />
            )
         }}
         />
    </Tabs>
   </>
  )
}

export default TabsLayout