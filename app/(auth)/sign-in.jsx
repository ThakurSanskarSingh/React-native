import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomBottom from '../../components/customButton'
import { Link } from 'expo-router'
const SignIn = () => {
  const [form,setForm] = useState({
    email : '',
    password : ''
  })
  const [isLoading,setIsloading] = useState(false)
  const submit = () => {

  }
  return (
   <SafeAreaView className = 'bg-primary h-full'>
    <ScrollView>
      <View className = 'h-full w-full justify-center px-4 my-6 '>
        <Image
        source={images.logo}
        resizeMode='contain'
        className = 'w-[115px] h-[35px]'
        />
        <Text className  = 'text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
        <FormField  
        title = "Email"
        value = {form.email}
        handleChangeText = {(e) => setForm({...form, email : e})}
        otherStyles = 'mt-7'
        // keboardType = 'email-address'
        />
        <FormField  
        title = "Password"
        value = {form.password}
        handleChangeText = {(e) => setForm({...form, password : e})}
        otherStyles = 'mt-7'
       
        />
        <CustomBottom
        title='sign-in'
        handlePress={submit}
        isLoading={isLoading}

        />
        <View className = 'justify-center pt-5 flex-row gap-2'>
          <Text className = 'text-lg text-gray-100 font-pregular'>
            Don't have account?
          </Text>
          <Link href='/sign-up' className='font-psemibold text-lg text-secondary'>sign-up</Link>

        </View>


      </View>
    </ScrollView>

   </SafeAreaView>
  )
}

export default SignIn