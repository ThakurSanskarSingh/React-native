import { View, Text, Image, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Tabs,Redirect} from 'expo-router'
import icons from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInputs'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
const Home = () => {
   const [refresh ,setRefresh] = useState(false)
   const [data,setData] = useState() 
   const[isLoading,setIsLoading] = useState(false)

   useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await getAllPosts()
      } catch (error) {
        Alert.alert('Error',error.message)
      }
      finally {
        setIsLoading(false)
      }
    }

   },[])

   const onRefresh = async () => {
    setRefresh(true)
    setRefresh(false)
   }
  return (
   <>
   <SafeAreaView className = 'bg-primary h-full ' >
   <FlatList 
   data={[]}
   keyExtractor={(item) => item.id}
   renderItem={({item}) => (
    <Text className = 'text-3xl text-white'>{item.id}</Text>
   )}
   ListHeaderComponent={() => (
    <View className = 'my-6 px-4 space-y-6'>
      <View className = 'justify-between items-start flex-row mb-6 '>
        <View>
          <Text className = 'font-pmedium text-em text-gray-100'>Welcome Back</Text>

        <Text className = 'text-2xl font-psemibold text-white'>Sanskar Singh</Text>
        </View>
        <View className = 'mt-1.5  '>
          <Image
          source={images.logoSmall}
          className = 'w-9 h-10'
          resizeMode='contain'
          />
        </View>
      </View>
      <SearchInput placeholder='Search for a video topic' />
      <View className  ='w-full flex-1pt-5 pb-8'>
        <Text className = 'text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>
        <Trending posts={ []} />
      </View>

    </View>
   )}
   ListEmptyComponent={() => (
    <EmptyState 
    title = 'No videos found'
    subTitle = 'Be the first to upload a video'
    />
   )}
   refreshControl={<RefreshControl refreshing = {refresh} onRefresh={onRefresh}/>}
   />
   </SafeAreaView>
   </>
  )
}

export default Home