import { FontAwesome } from '@expo/vector-icons'
import { Box, Button, HStack, Icon, Text, VStack } from 'native-base'
import React from 'react'
import { Linking } from 'react-native'

export default function ServiceProfile({route,navigation}) {

    const param = route.params


    const handleCall = (phoneNumber)=>{
        // alert(phoneNumber)
        Linking.openURL(`tel:${phoneNumber}`)
    }


  return (
    <Box flex={1}>

        <Box p={2}  mt={2} px={4} bg='white'>
        {/* {JSON.stringify(param.user)} */}
            <HStack justifyContent='flex-start' borderBottomWidth={1} borderColor='gray.300'>
                <Icon as={<FontAwesome  name='user-circle' />} size={8} m={2} />
                <VStack mx={2}>
                    <Box>{param.user?.user?.name}</Box>
                    <Box>{param.user?.user?.mobile}</Box>
                </VStack>
            </HStack>

            <VStack mb={2}>
                <Box>Service</Box>
                <Box>{param.user.service}</Box>
            </VStack>

            <VStack mb={2}>
                <Box>Business Location</Box>
                <Box _text={{color:'gray.800'}}>{param.user.location}</Box>
            </VStack>

            <VStack>
                <Box>Working Hours</Box>
                <Box>{param.user.working}</Box>
            </VStack>


            <VStack mt={3}>
                <Box>Description</Box>
                <Box>{param.user.biography}</Box>
            </VStack>

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
                    onPress={()=>handleCall("+"+ param.user?.user?.mobile)} 
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


        <VStack p={2} bg='white' mt={3}>
            <Box _text={{color:'black'}}>Testmonial</Box>
        </VStack>

    </Box>
  )
}
