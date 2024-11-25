import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomBottom from '../../components/customButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form,setForm] = useState({
    username: '',
    email : '',
    password : ''
  })
  const [isLoading,setIsloading] = useState(false)
  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error','Please Fill in all the fields')
    }
    setIsloading(true)
    try {
      
      console.log(' Form Data:', form);
      const result = await createUser(
        form.email,
        form.password,
        form.username
      );
      setUser(result)
      setIsLoggedIn(true)
      console.log('Create User Result:', result);

      router.replace('/home')
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsloading(false)
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
        <Text className  = 'text-2xl text-white text-semibold mt-10 font-psemibold'>Register to Aora</Text>
        <FormField  
        title = "Username"
        value = {form.username}
        handleChangeText={(text) => setForm({ ...form, username: text })}

        otherStyles = 'mt-10'
        />
        <FormField  
        title = "Email"
        value = {form.email}
        handleChangeText={(text) => setForm({ ...form, email: text })}

        otherStyles = 'mt-7'
        // keboardType = 'email-address'
        />
        <FormField  
        title = "Password"
        value = {form.password}
        handleChangeText={(text) => setForm({ ...form, password: text })}

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