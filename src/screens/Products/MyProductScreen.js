import { MaterialIcons } from '@expo/vector-icons';
import { Box, Center, FlatList, Heading, Icon, Image, Pressable, Text } from 'native-base'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { getMyPost } from '../../data/api';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EmptyData from '../../components/EmptyData';

export default function MyProductScreen({navigation}) {
  const [data,setData] = useState([]);

  const user  = useSelector(state=>state.user)
  const {isLoading,data:posts} = useQuery({queryKey:['posts'], queryFn:()=>getMyPost(user.token)})


  const renderMyPost =  ({item})=>{
    return <Pressable w={'50%'} m={1} bg='white' rounded='md'
    onPress={()=>navigation.navigate("EditProductScreen",
    {id:item._id})}>

    <Center p={2} alignItems='center'  h={250} flex={1} >
      <Box position={"relative"} py={1} my={1}
          bg="white" borderBottomColor={'orange.300'} >
          <Box bg='gray.50' p={2} rounded='md' w='98%'>
          <Image resizeMode='cover' 
          source={{uri:item?.image[0]}} w={140} alt={''} 
          bg='gray.300' m={1} h={150} />
          <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
          position={"absolute"} right={5} 
          top={6}/>
      </Box>
    <Box p={1} mt={-1}>
        <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
    <Text fontSize={16} mt={2} fontWeight='bold' 
      letterSpacing='sm'>Tzs {item.price} </Text>
    </Box>
    </Box>
    </Center>
    </Pressable>
  }



  return (
    <Box flex={1} bg='white'>
      <StatusBar backgroundColor='black' />

    {isLoading?
      <ActivityIndicator size="large" />:
      <FlatList
      _contentContainerStyle={{paddingBottom:20}}
      numColumns={2}
      data={posts?.data}
      renderItem={renderMyPost}
      keyExtractor={item=>item._id}
      ListEmptyComponent={<EmptyData />}
      />
    }
    </Box>
  )
}
