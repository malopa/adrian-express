import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Box, Center, FlatList, Icon, Image, Text } from 'native-base'
import React from 'react'
import { render } from 'react-dom'
import { ActivityIndicator, Pressable } from 'react-native'
import { useQuery } from 'react-query';
import { getMyPost, getShoperDetails } from '../data/api';



export default function ShoperScreen({route,navigation}) {


    const param = route.params;

    const {isLoading,data:posts} = useQuery({queryKey:['posts'], queryFn:()=>getShoperDetails(param?.user._id)})

    const renderItem  = ({item})=>{
        return (
            <Pressable w={'50%'} m={1} bg='white' 
            rounded='md'
                onPress={()=>navigation.navigate("ProductDetails",
                {title:item.name,id:item._id,img:item?.image[0]})}>
                <Center borderWidth={1} borderColor='gray.100' 
                m={1} 
                rounde='md'
                p={2} justifyContent='space-between'  h={250} flex={1} >
                <Box position={"relative"} py={1} my={1}
                bg="white" borderBottomColor={'orange.300'} >
                    <Box bg='gray.50' p={2} rounded='md' w='98%'>
                    <Image resizeMode='cover' source={{uri:item?.image[0]}} w={140} alt={''} 
                    bg='gray.300' m={1} h={150} />
                    <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                    position={"absolute"} right={10} 
                    top={10}/>
                </Box>
                <Box p={1} mt={-1}>
                    <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
                <Text fontSize={16} mt={2} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
                </Box>
                </Box>
                </Center>
                </Pressable>
        )
            };

            const ShopperHeader = ()=>{
                return (
                <Center p={4}>
                    <Box>
                        <Center>

                        <Icon size={16} as={<Ionicons name="person-circle-outline" />} />
                        
                            {/* <Text letterSpacing={0} color='gray.700'>{param?.user._id}</Text> */}
                            <Text letterSpacing={0} color='gray.700'>{param?.user?.busines_name}</Text>
                            <Text letterSpacing={0} color='gray.700'>{param?.user?.busines_mobile}</Text>
                        </Center>
                    </Box>
                </Center>
                );
                
            }

            if(isLoading){
                return <Center flex={1} p={4}>
                    <Text>loading...</Text>
                <ActivityIndicator size={20}/>

                </Center>
            }
  return (
    <Center bg='fff' flex={1}>

       <FlatList  w={"full"} bg='white'
        ListHeaderComponent={ShopperHeader}
            renderItem={renderItem}
            data={posts?.data}
            keyExtractor={item => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
            paddingBottom:20

            ,alignItems:'center'
      }}
      /> 

    </Center>
  )
}
