import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'

const Trending = ({posts}) => {
  return (
    <FlatList 
    keyExtractor={(item) => item.$id}
    data={posts}
    renderItem={({item}) => (
        <Text className = 'text-3xl text-white'>{item.id}</Text>
    )}
    horizontal
    />
  )
}

export default Trending