import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Box,Image,FlatList, Pressable,Center, Icon, Text } from 'native-base'
import React, { useContext, useState } from 'react'
// import { Pressable } from 'react-native';
// import {  } from 'react-native';
// import { SliderBox } from 'react-native-image-slider-box'

// import { SliderBox } from "react-native-image-slider-box";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from 'react-query';
import EmptyData from '../components/EmptyData';
import SearchData from '../components/search';
import { SearchContext } from '../context/SearchContext';
import { getProducts } from '../data/api';




export default function CartScreen({navigation}) {

  const [limit,setLimit] = useState(50)
  const {data:posts} = useQuery({queryKey:['products'], queryFn:()=>getProducts(limit,0)})
  
  const {searchPhrase,setClicked} = useContext(SearchContext);

  const renderItem = ({item})=>{

    if (searchPhrase === "") {
      return(
        <Pressable   
        borderWidth={1}
        borderColor={'gray.200'}
        bg='white'
        rounded={'xl'} m={2}
        onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
        <Center p={2} alignItems='center' flex={1} >
        <Box position={"relative"} 
        bg="white" borderBottomColor={'orange.300'} >
          <Box bg='gray.10' rounded='md' w='100%'>
            <Image resizeMode='cover' rounded={'md'} 
            source={{uri:item?.image[0]}} w={150} alt={''} 
              h={150} />
            <Icon  as={<MaterialIcons 
            name="favorite-border"/>} size={6} 
            position={"absolute"} right={10} 
            top={10}/>
        </Box>
        <Box>
          <Center>
            <Text color='blueGray.600' overflowX={'hidden'} letterSpacing='sm'>{item.name}</Text>
            <Text fontSize={16} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
         </Center>
        </Box>
      </Box>
      </Center>
      </Pressable>
      )
    }
    else if(item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Pressable w={'49%'} 
      borderWidth={1} borderColor='gray.100' m={20}
       bg='white' rounded={'md'}
      onPress={()=>navigation.navigate("ProductDetails",
      {title:item.name,id:item._id,img:item?.image[0]})}>
        <Center p={2} alignItems='center'  h={250} flex={1} >
        <Box position={"relative"} py={1} my={1}
        bg="white" borderBottomColor={'orange.300'} >
          <Box bg='gray.10' p={2} rounded='md' w='98%'>
            <Image resizeMode='cover' 
            source={{uri:item?.image[0]}} w={150} alt={''} 
            bg='gray.300' m={1} h={150} />
            <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
            position={"absolute"} right={10} 
            top={10}/>
        </Box>
        <Box>
          <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
         <Text fontSize={16} mt={2} fontWeight='bold' letterSpacing='sm'>Tzs {item.price}</Text>
        </Box>
      </Box>
      </Center>
      </Pressable>
    }
    
  }



  return (
    <Center flex={1}
    onStartShouldSetResponder={() => {
      setClicked(false);
    }}
    >
      <ExpoStatusBar />


      <FlatList bg='red.200' w={"full"}
        renderItem={renderItem}
        p={2}
        data={posts?.data}
        keyExtractor={item=> item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom:100,
          width:'100%',
          justifyContent:'space-between',
          alignItems:'center'
        }}
        ListEmptyComponent={<SearchData />}
        />

    </Center>

  )
}
