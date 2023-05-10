import { Box, Center, Divider, HStack, Icon, Text } from 'native-base'
import React, { useEffect } from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Alert, BackHandler, Pressable } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {useQuery} from 'react-query';
import {getMyPost} from '../data/api'
import { _logout } from '../features/userSlice.js';

export default function SettingsScreen({navigation}) {
    const user = useSelector(state=>state.user);

    const dispatch = useDispatch();


	const {data:myPost} = useQuery('post',()=>getMyPost(user.token),{enabled:user?.token !== null});



	const handleLogout = ()=>{
        dispatch(_logout())
		return navigation.navigate("Login");
	}

    const handleDetailLookup = ()=>{
        if(user){
            if(user.isLoggedIn){
                navigation.navigate("EditUserScreen")
            }else{
                navigation.navigate("Login")
            }
        }
    }


    useEffect(() => {
        // const backAction = () => {
        //   Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        //     {
        //       text: 'Cancel',
        //       onPress: () => null,
        //       style: 'cancel',
        //     },
        //     {text: 'YES', onPress: () => BackHandler.exitApp()},
        //   ]);
        //   return true;
        // };
    
        // const backHandler = BackHandler.addEventListener(
        //   'hardwareBackPress',
        //   backAction,
        // );
    
        // return () => backHandler.remove();
      }, []);


    const addProduct = ()=>{

        if(!user.isLoggedIn){
            navigation.navigate("MyProduct")
        }

        if(user){
            if(user.user?.busines_mobile){
                navigation.navigate("AddProduct")
            }else{
                navigation.navigate("EditUserScreen")
            }
        }

    }


    const handleMyPost = ()=>{

        if(!user.isLoggedIn){
               navigation.navigate("MyProduct")
        }

        if(user){
            if(user?.user?.busines_mobile){
               navigation.navigate("MyProduct")
            }else{

                navigation.navigate("EditUserScreen")
            }
        }else{
           navigation.navigate("Login")
        }
    }

  return (<Box py={8} px={4} flex={1} bg='white'>
            <Text fontSize={24}>Profile</Text>
            <Center mt={8}>
                <Box rounded={'full'} p={2} borderColor="gold" borderWidth={2}>
                <Icon as={<MaterialCommunityIcons name="account" />} 
                color={'gray'} size={8} />
            </Box>

	  <Box>


	  </Box>
            <Text color="gray.500" fontSize={14}>{user?.user?.mobile}</Text>
            <Text color="gray.600" fontSize={18}>{user?.user?.busines_name}</Text>
            </Center>
            <Divider _light={{bg:'gray.200'}} mt={8}/>
            <Pressable onPress={handleMyPost}>
            <HStack w='full' py={3}  px={1} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                <HStack alignItems={'center'}>
                <Box mr={2} borderColor='yellow.50' alignItems="center" justifyContent='center' textAlign='center' borderWidth={2} p={2} rounded="full" > 
                    <Icon as ={<Octicons name="list-unordered" />} size={6}/>
                </Box>
                    <Text color={"red"}>My Posts</Text>
                </HStack>
                </Box>
                <Icon as ={<FontAwesomeIcon name="angle-right" />} color='gray.300' size={6}/>
            </HStack>
            </Pressable>
            <Divider  _light={{
        bg: "muted.200"
      }} borderColor={"yellow.200"} />
            
            <Pressable onPress={addProduct}>
            <HStack w='full' py={3} px={2} 
            justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                    
                <HStack alignItems={'center'}>
                <Box mr={2} borderColor='yellow.50' alignItems="center" 
                justifyContent='center' textAlign='center'
                 borderWidth={2} p={2} rounded="full" > 
                    <Icon as ={<Entypo name="add-to-list" />} size={6}/>
                
                </Box>
                    <Text color={"red"} >Add Products</Text>
                </HStack>
                </Box>
                <Icon color='gray.300' as={<FontAwesomeIcon name="angle-right" />} size={6}/>
            </HStack>
            </Pressable>

            <Divider _light={{bg:'gray.200'}}/>

            <HStack w='full' py={3} px={1} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                <HStack alignItems={'center'}>
                    <Box mr={2} borderColor='yellow.50' alignItems="center" 
                    justifyContent='center' textAlign='center' borderWidth={2} p={2} 
                    rounded="full" > 
                        <Icon  as ={<AntDesign name="message1" />} size={6}/>
                    </Box>
                    <Text color={"red"}>Inbox</Text>
                </HStack>
                </Box>
                <Icon color='gray.300' as ={<FontAwesomeIcon name="angle-right" />} size={6}/>
            </HStack>
            <Divider _light={{bg:'gray.200'}}/>

            <Pressable onPress={handleDetailLookup}>
            <HStack w='full' py={2} px={1} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                <HStack alignItems={'center'}>
                <Box mr={2} borderColor='yellow.50' alignItems="center" 
                justifyContent='center' textAlign='center' 
                borderWidth={2} p={2} rounded="full" > 
                    <Icon as ={<Ionicons name="person-outline" />} 
                    size={6}/>
                </Box>
                    <Text color={"red"}>Busines Details</Text>
                </HStack>
                </Box>
                <Icon color='gray.300' as ={<FontAwesomeIcon name="angle-right" />} size={6}/>
            </HStack>
            </Pressable>
            <Divider _light={{bg:'gray.200'}}/>


            <Pressable onPress={()=>navigation.navigate("RegisterService")}>
            <HStack w='full' py={2} px={1} justifyContent='space-between' 
            alignItems={'center'} >
                <Box>
                <HStack alignItems={'center'}>
                <Box mr={2} borderColor='yellow.50' alignItems="center" 
                justifyContent='center' textAlign='center' 
                borderWidth={2} p={2} rounded="full" > 
                    <Icon as ={<Ionicons name="person-outline" />} 
                    size={6}/>
                </Box>
                    <Text color={"red"}>Service Profile</Text>
                </HStack>
                </Box>
                <Icon color='gray.300' as ={<FontAwesomeIcon name="angle-right" />} size={6}/>
            </HStack>
            </Pressable>
            <Divider _light={{bg:'gray.200'}}/>
            

            {user?.isLoggedIn?
            <>
                <Pressable onPress={handleLogout}>
                    <HStack w='full' py={2} px={1} justifyContent='space-between' 
                    alignItems={'center'} >
                        <Box>
                        <HStack alignItems={'center'}>
                        <Box mr={2} borderColor='yellow.50' alignItems="center" 
                        justifyContent='center' textAlign='center' 
                        borderWidth={2} p={2} rounded="full" > 
                            <Icon as ={<FontAwesomeIcon name="sign-out" />} size={6}/>
                        </Box>
                            <Text color={"red"} >Sign out</Text>
                        </HStack>
                        </Box>
                        <Icon color='gray.300' as={<FontAwesomeIcon name="angle-right" />} size={6}/>
                    </HStack>

                </Pressable>
            <Divider _light={{bg:'gray.200'}}/>
            </>
            :''
            }
        </Box>
  )
}
