  import { MaterialIcons } from '@expo/vector-icons'
  import { Box, Center, FlatList, Icon, Image, Pressable, Text } from 'native-base'
  import React from 'react'
  import { useQuery } from 'react-query';
  import { getProductByCategory } from '../data/api';
  import { data } from '../data/data'



  export default function ElectronicsScreen({route,navigation}) {
    let param = route.params;

    const {isLoading,data:products} = useQuery({queryKey:['products-'+param.slug], queryFn:()=>getProductByCategory(param?.slug)})


      const renderItem = ({item})=>{
          return <Pressable w={'48%'} m={1} bg='white' 
          borderWidth={1}
          borderColor="gray.200"
          rounded='md'
          onPress={()=>navigation.navigate("ProductDetails",
          {id:item._id,title:item.name,img:item.img})}>
          <Center p={2} alignItems='center'  h={250} flex={1} >
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
        }


    return (
      <Center>



  <FlatList w={"full"}
        renderItem={renderItem}
        data={products?.data}
        keyExtractor={item => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          backgroundColor:"white",
          paddingBottom:20
        }}
        /> 

      </Center>
    )
  }
