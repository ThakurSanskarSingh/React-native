import { View, Text, Image } from 'react-native'
import React from 'react'
import {images} from '../constants'
import CustomBottom from './customButton'
import { router } from 'expo-router'
const EmptyState = ({title,subTitle}) => {
  return (
    <View className = 'justify-center items-center px-4'>

      <Image source={images.empty} className = 'w-[270px] h-[215px] ' resizeMode='contain' />
      <Text className = 'font-pmedium text-em text-gray-100'>{subTitle}</Text>

        <Text className = 'text-xl font-psemibold text-center mt-2 text-white'>{title}</Text>
        <CustomBottom 
        title='Create Video'
        handlePress={() => router.push('/create')}
        containerStyles={'w-full my-5'}
        />
    </View>
  )
}

export default EmptyState