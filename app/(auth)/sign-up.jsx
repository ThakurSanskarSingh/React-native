import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomBottom from '../../components/customButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'
const SignUp = () => {
  const [form,setForm] = useState({
    username: '',
    email : '',
    password : ''
  })
  const [isLoading,setIsloading] = useState(false)
  const submit = () => {
createUser()
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
        <Text className  = 'text-2xl text-white text-semibold mt-10 font-psemibold'>Register to Aora</Text>
        <FormField  
        title = "Username"
        value = {form.email}
        handleChangeText = {(e) => setForm({...form, username : e})}
        otherStyles = 'mt-10'
        />
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
        title='Sign-up'
        handlePress={submit}
        isLoading={isLoading}

        />
        <View className = 'justify-center pt-5 flex-row gap-2'>
          <Text className = 'text-lg text-gray-100 font-pregular'>
           Already have account ?
          </Text>
          <Link href='/sign-in' className='font-psemibold text-lg text-secondary'>sign-in</Link>

        </View>


      </View>
    </ScrollView>

   </SafeAreaView>
  )
}

export default SignUp