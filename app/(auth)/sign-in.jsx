import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';

import { ScrollView } from 'react-native'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomBottom from '../../components/customButton'
import { Link } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { Alert } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import { handleLogin } from './authHelpers';
const SignIn = () => {

  const {setUser,setIsLoggedIn } = useGlobalContext()
  const [form,setForm] = useState({
    email : '',
    password : ''
  })
  const [isLoading,setIsLoading] = useState(false)
  const submit = async () => {
    if( !form.email || !form.password){
      Alert.alert('Error','Please Fill in all the fields')
    }
    setIsLoading(true)
    try {
      const currentUser = await handleLogin(form.email, form.password);
      if (currentUser) {
        setUser(currentUser); // Set the user in global state
        setIsLoggedIn(true); // Update the logged-in state
        router.replace("/home"); // Navigate to the home page
      }
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  

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