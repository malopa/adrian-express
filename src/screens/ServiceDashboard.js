import { FontAwesome } from '@expo/vector-icons'
import { Box, Center, FlatList, HStack, Icon, Input, Pressable, VStack } from 'native-base'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useQuery } from 'react-query'
import { getServiceProvider } from '../data/api'

export default function ServiceDashboard({navigation,route}) {

  const param = route.params;
  const {isLoading,data} = useQuery({queryKey:['services'], queryFn:()=>getServiceProvider(param.slug)})


  const renderServiceProdider = ({item})=>{
    return <Pressable onPress={()=>navigation.navigate("ServiceProfile",{user:item})} rounded={'md'}  borderWidth={1} borderColor='gray.200' p={2} bg='#FFF' mb={2}>
        <HStack >
          <Icon m={2} as={<FontAwesome name="user-circle" />} size={8} />
          <VStack p={2} w='60%'  borderColor="gray.200">
            <Box color="gray.400"> {item?.name?item.name:""}</Box>
            <Box color="gray.400">{item.service}</Box>
            <Box color="gray.400">{"Location,  "+ item.location}</Box>
            <Box color='gray.400' fontWeight='bold'>
              {item.working}
          </Box>
          </VStack>

        <HStack alignItems={'center'} >
          <Box>
              Preview
            </Box>
            <Icon as={<FontAwesome name="angle-right" />} size={8} />
          
          </HStack>
          
        </HStack>
    </Pressable>
  }


  if(isLoading){
    return <Center flex={1}>
      <ActivityIndicator size={20} />
    </Center>
  }


  return (
    <Box flex={1}>
        <Box p={2}>
          <FlatList
          showsVerticalScrollIndicator={true}
          data={data?.data}
          renderItem={renderServiceProdider}
          keyExtractor={item=>item._id}
          />
        </Box>
       
    </Box>
  )
}
