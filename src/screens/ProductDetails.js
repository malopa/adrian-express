import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Box,Pressable, Button, Center, FlatList, HStack, Icon, Image, Text, StatusBar } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator,Linking } from 'react-native'
import { Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import EmptyData from '../components/EmptyData'
import { getProductDetails } from '../data/api'



export default function ProductDetails({route,navigation}) {

    const user = useSelector(state=>state.user);
    let params = route.params 


    const queryClient = useQueryClient();

    const [itemImg,setItem] = useState({uri:route.params.img})

    const {isLoading,data:details} = useQuery(['products-detals',params?.id], ()=>getProductDetails(params.id))

    useEffect(()=>{
        if(params?.id){

        setItem({uri:route.params.img})

        }
    },[params?.id])


    const handleCall = (phoneNumber)=>{
        Linking.openURL(`tel:0${phoneNumber}`)
    }
  
    const renderImage = ({item})=>{
        return <Pressable borderWidth={1} py={2} px={2} borderColor='gray.200'
         rounded='md' mx={2} onPress={()=>setItem({uri:item})}>
           <Image bg='gray.100' 
                source={{uri:item}} 
                alt='item' w={20}  h={20} resizeMode='cover' ml={2} /> 
        </Pressable>
    }


    const renderRelatedContent = ({item})=>{
        return <Pressable rounded='xl'   m={2} 
            onPress={()=>navigation.navigate("ProductDetails",{id:item._id,title:item.name,img:item.image[0]})}>
            <Center  alignItems='center' 
            bg='white' rounded={'md'}>
                <Box position={"relative"} py={1} my={1}
                bg="white" borderBottomColor={'orange.300'} 
                rounded={'md'}>
                    <Box bg='white' p={2} 
                    rounded='md' 
                    w='100%'>
                    <Image resizeMode='cover' 
                    source={{uri:item.image[0]}} 
                    w={128} alt={''} 
                    bg='gray.300' 
                    m={1} h={150} />
                    
                    <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                    position={"absolute"} right={10} 
                    top={10}/>
                </Box>
                    <Box>
                        <Center>
                        <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
                        <Text fontSize={16} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
                        </Center>
                    </Box>
                    
                </Box>
            </Center>
            </Pressable>
    }


    const handleLoginStatus = ()=>{
        if(user){

            if(user.isLoggedIn){
                
                navigation.navigate("QuickSignup")
            }else{
                navigation.navigate("Login")
            }
        }else{

            navigation.navigate("Login")

        }
    }   

    if(isLoading){
        return <Center flex={1}>
            <Text>loading...</Text>
            <ActivityIndicator size={40}/>
        </Center>
    }

  return (<ScrollView
        showsVerticalScrollIndicator={false}
        backgroundColor='white'
        flex={1}
    >

    <StatusBar backgroundColor={'black'}/>


            <Box flex={1} justifyContent='center' alignItems='center'>

                <Image 
                bg='gray.100' 
                source={itemImg} 
                resizeMode="contain"
                alt='item' w={'100%'} 
                h={350}
                rounded='md'
                />


            </Box>
            <Box p={4}>
            </Box>

            <Box bg='white' py={2} borderColor='gray.100'>
               
                <FlatList bg='white'
                    horizontal={true}
                    data={details?.data?.image}
                    renderItem={renderImage}
                    keyExtractor={item=>item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
            <Box bg='#FFF' p={4}>
                <Text fontWeight='bold' fontSize={16}>{route.params.title}</Text>
                <Text color='gray.800' letterSpacing={0} fontSize={16}>{} </Text>

                <Box p={2} mt={4}>
                    <Text letterSpacing={.2} fontSize={18} fontWeight='bold'>TZS {details?.data?.price}</Text>
                </Box>

                <Box>{(details?.data?.description)}</Box>
                {/* <Box>{(JSON.stringify(details?.data))}</Box> */}

                <Text font='bold' color='gray.600' p={2}>Product status : {details?.data?.condition}</Text>

                <Pressable onPress={()=>navigation.navigate("ShoperScreen",{title:details?.data?.user?.name,user:details?.data?.user})}>
                    <Text font='bold' color='blue.400' underline={true} p={2} 
                    py={2} fontSize={16} uppercase={true} >{`More from provider`.toUpperCase()} <Icon name={<FontAwesome name='angle-right' />} size={6} /> </Text>
                </Pressable>
                
                <HStack justifyContent='space-between' p={4}>
                    <Button onPress={()=>navigation.navigate("Chat")} 
                        bg='#FFF' p={0} 
                        rounded='full' 
                        w={150} color='black' 
                        borderColor={`black`} 
                        borderWidth={1} px={2}
                    >   
                    
                        <HStack>
                            
                            <Icon as={<FontAwesome name="wechat" />} size={6} /> 
                            <Text px={2} color='black'>Chat</Text>
                        </HStack>
                        </Button>
                    <Button bg='amber.300' 
                    onPress={()=>handleCall(+details.data?.user.busines_mobile)} 
                    color='black' 
                    w={150} 
                    rounded='full' px={4}>
                        <HStack>
                        <Icon as={<FontAwesome name="phone" />} size={6} /> 
                        <Text color='black'>Call Now</Text>
                        </HStack>
                        </Button>
                </HStack>

            </Box>

            <Box mt={4}>
                <Text fontWeight='bold' px={2} my={4} fontSize={18}>Related Content</Text></Box>


            <FlatList p={2} bg='amber.100'
                data={details?.related} 
                horizontal={true}
                renderItem={renderRelatedContent}
                keyExtractor={item=>item.id}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<EmptyData />}
            /> 
          </ScrollView>
  )
}
