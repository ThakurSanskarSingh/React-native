import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'
const SearchInput = ({title,value,placeholder,handleChangeText,otherStyles,...props }) => 

{
    const [showPassword,setShowPassword] = useState(false)
  return (
    
      <View className = 'w-full h-16 px-4 bg-black-100 border-2 border-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <TextInput className =  'flex-1 mt-0.5  text-white font-pregular  text-base'
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={(text) => handleChangeText && handleChangeText(text)}
        secureTextEntry = {title === 'Password' && !showPassword}
        />
        
       <TouchableOpacity>
        <Image  source={icons.search}
        className = 'w-5 h-5 '
        resizeMode='contain'
        
        />
        

       </TouchableOpacity>


     
    </View>
  )
}

export default SearchInput