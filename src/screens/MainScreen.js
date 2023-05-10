import 'react-native-gesture-handler';
import { Box,Image,FlatList, Center, Icon, Text, ScrollView, Pressable, HStack, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import { getCategories, getMyPost, getProductBySlug, getProducts, getPromotedPost } from '../data/api';
import { useQuery } from 'react-query';
import { ActivityIndicator, Alert, BackHandler, TouchableOpacity, View } from 'react-native';
import EmptyData from '../components/EmptyData';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { StyleSheet } from 'react-native';



const Category = [
  {id:1,title:"Sponsored"},
  // {id:2,title:"Electrinics"},
  // {id:3,title:"Laptop & Computer"},
  // {id:4,title:"Houses & Rental"},
  // {id:5,title:"Fashion & Clothes"},
  // {id:6,title:"Mobile"},
]
export default function MainScreen({navigation}) {

  
  
  const user = useSelector(state=>state.user);
  const [refreshing,setRefreshing] = useState(false)
  const [loading,setLoading] = useState(false)
  const [loading1,setLoading1] = useState(false)
  
  const [limit,setLimit] = useState(30)
  const [skip,setSkip] = useState(0)

  const {isLoading:isCatLoading,data:categories} = useQuery({queryKey:['categories'], queryFn:()=>getCategories()})
  const {isLoading:isElLoading,data:electronics} = useQuery({queryKey:['electronics'], queryFn:()=>getProductBySlug("ElectronicsScreen")})
  const {isLoading:isLoLoading,data:laptops} = useQuery({queryKey:['laptops'], queryFn:()=>getProductBySlug("LapcomputerScreen")})
  const {isLoading:isJeLoading,data:jewels} = useQuery({queryKey:['jewels'], queryFn:()=>getProductBySlug("ClothJewelScreen")})
  const {isLoading:isMoLoading,data:mobiles} = useQuery({queryKey:['mobiles'], queryFn:()=>getProductBySlug("MobilePhoneAccessories")})
  const {isLoading:isHoLoading,data:houses} = useQuery({queryKey:['house'], queryFn:()=>getProductBySlug("HouseEstateScreen")})
  const {isLoading,data:promoted} = useQuery({queryKey:['images'], queryFn:()=>getPromotedPost("Gold"),refetchInterval: 50000,})
  const {isLoading:isPostLoading,data:posts} = useQuery({queryKey:['products'], queryFn:()=>getProducts(limit,skip),
    refetchInterval: 50000,
  })

  

  const retrieveMore = ()=>{
    setLoading(true)
    setSkip(s=>+s + limit)

    setRefreshing(!refreshing)

    getProducts(limit,skip)
    .then(res=>{
      if(res.data.length == 0){
        setSkip(0)
      }

      setPost(res)
      setLoading(false)

    })
  }

  const renderCategoriesItem = ({item})=>{
    return <Center>
      <Pressable  maxHeight={70}
    onPress={()=>navigation.navigate("ElectronicsScreen",{slug:item.slug})}
    bg='white' 
    rounded='sm' p={2} 
    mx={4} borderWidth={1} 
    borderColor='gray.400'>
      <Text>{item.name}</Text>
    </Pressable>
    </Center>
    ;
  }

  const renderItem = ({item})=>{
    return( 
  //   <Pressable m={1} shadow={1} w={'31%'} 
  //  bg='white' rounded={'md'} p={1}

    // onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
    //   <Box alignItems='center'  flex={1} >
    //   <Box position={"relative"} py={1}
    //   bg="white" borderBottomColor={'orange.300'} >
    //     <Box bg='gray.10' rounded='md' w='100%'>
    //       <Image resizeMode='cover'
    //       rounded={'md'} 
    //       source={{uri:item?.image[0]}} 
    //       w={140} alt={''} 
    //       bg='gray.300' h={150} />
    //       <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
    //       position={"absolute"} right={10} 
    //       top={10}/>
    //   </Box>
    //   <Box>
    //     <Center>
    //     <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
    //    <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
    //    </Center>
    //   </Box>
    // </Box>
    // </Box>
    // </Pressable>

<>

<VStack>

{/* show categories */}
<ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
{categories?.data?.map((d,idx)=>(
        <Pressable  key={idx} maxHeight={70}
      onPress={()=>navigation.navigate("ElectronicsScreen",{slug:d.slug}) }
      bg='white' 
      rounded='sm' p={2} 
      mx={4} borderWidth={1} 
      borderColor='gray.400'>
        <Text>{d.name}</Text>
      </Pressable>

))}
</ScrollView>


      <Box px={4} mt={4} _text={{fontSize:16,fontWeight:'bold'}}>Sponsored</Box>
      <HStack flexWrap={'wrap'} >
    {posts?.data.slice(0,6).map((d,idx)=>(
        <Pressable key={idx} m={1} shadow={1} w={'31%'} 
            bg='white' rounded={'md'} p={1}
            onPress={()=>navigation.navigate("ProductDetails",{title:d.name,id:d._id,img:d?.image[0]})}>
              <Box alignItems='center'  flex={1} >
              <Box position={"relative"} py={1}
              bg="white" borderBottomColor={'orange.300'} >
                <Box bg='gray.10' rounded='md' w='100%'>
                  <Image resizeMode='cover'
                  rounded={'md'} 
                  source={{uri:d?.image[0]}} 
                  w={140} alt={''} 
                  bg='gray.300' h={150} />
                  <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                  position={"absolute"} right={10} 
                  top={10}/>
              </Box>
              <Box>
                <Center>
                <Text color='blueGray.600' letterSpacing='sm'>{item.name}</Text>
                <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(d.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </Center>
              </Box>
            </Box>
            </Box>
        </Pressable>

))}

</HStack>


{/* Electronics */}

<Box p={4} bg={'red.100'} mt={4} _text={{fontSize:16}} w='full'>Electronics</Box>

<HStack flexWrap={'wrap'} w='full' justifyContent={'center'}>
{electronics?.data.slice(0,4).map((d,idx)=>(
        <Pressable key={idx} m={1} shadow={1} w={'45%'} 
            bg='white' rounded={'md'} p={1}
            onPress={()=>navigation.navigate("ProductDetails",{title:d.name,id:d._id,img:d?.image[0]})}>
              <Box alignItems='center'  flex={1} >
              <Box position={"relative"} py={1}
              bg="white" borderBottomColor={'orange.300'} >
                <Box bg='gray.10' rounded='md' w='100%'>
                  <Image resizeMode='cover'
                  rounded={'md'} 
                  source={{uri:d?.image[0]}} 
                  w={140} alt={''} 
                  bg='gray.300' h={150} />
                  <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                  position={"absolute"} right={10} 
                  top={10}/>
              </Box>
              <Box>
                <Center>
                <Text color='blueGray.600' letterSpacing='sm'>{d.name}</Text>
                <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(d.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </Center>
              </Box>
            </Box>
            </Box>
        </Pressable>
        



))}
</HStack>




{/* Laptop and computer */}

<Box p={4} bg={'red.100'} mt={4} _text={{fontSize:16}} w='full'>Computer & Accessories</Box>

<ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
{laptops?.data?.map((d,idx)=>(
        <Pressable key={idx} m={1} shadow={1} 
            bg='white' rounded={'md'} p={1}
            onPress={()=>navigation.navigate("ProductDetails",{title:d.name,id:d._id,img:d?.image[0]})}>
              <Box alignItems='center'  flex={1} >
              <Box position={"relative"} py={1}
              bg="white" borderBottomColor={'orange.300'} >
                <Box bg='gray.10' rounded='md' w='100%'>
                  <Image resizeMode='cover'
                  rounded={'md'} 
                  source={{uri:d?.image[0]}} 
                  w={140} alt={''} 
                  bg='gray.300' h={150} />
                  <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                  position={"absolute"} right={10} 
                  top={10}/>
              </Box>
              <Box>
                <Center>
                <Text color='blueGray.600' letterSpacing='sm'>{d.name}</Text>
                <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(d.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </Center>
              </Box>
            </Box>
            </Box>
        </Pressable>
        



))}
</ScrollView>


{/* Mobile & Accessoris */}


<Box p={4} bg={'red.100'} mt={4} _text={{fontSize:16}} w='full'>Mobile & Accessoris</Box>

<HStack flexWrap={'wrap'} w='full' justifyContent={'center'}>
{mobiles?.data?.slice(0,4).map((d,idx)=>(
        <Pressable key={idx} m={1} shadow={1} w={'45%'} 
            bg='white' rounded={'md'} p={1}
            onPress={()=>navigation.navigate("ProductDetails",{title:d.name,id:d._id,img:d?.image[0]})}>
              <Box alignItems='center'  flex={1} >
              <Box position={"relative"} py={1}
              bg="white" borderBottomColor={'orange.300'} >
                <Box bg='gray.10' rounded='md' w='100%'>
                  <Image resizeMode='cover'
                  rounded={'md'} 
                  source={{uri:d?.image[0]}} 
                  w={140} alt={''} 
                  bg='gray.300' h={150} />
                  <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                  position={"absolute"} right={10} 
                  top={10}/>
              </Box>
              <Box>
                <Center>
                <Text color='blueGray.600' letterSpacing='sm'>{d.name}</Text>
                <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(d.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </Center>
              </Box>
            </Box>
            </Box>
        </Pressable>
        



))}
</HStack>



{/* house and real estate */}
<Box p={4} bg={'red.300'} mt={4} _text={{fontSize:16}} w='full'>House and real Estate</Box>
<ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
{houses?.data?.map((d,idx)=>(
        <Pressable key={idx} m={1} shadow={1} 
            bg='white' rounded={'md'} p={1}
            onPress={()=>navigation.navigate("ProductDetails",{title:d.name,id:d._id,img:d?.image[0]})}>
              <Box alignItems='center'  flex={1} >
              <Box position={"relative"} py={1}
              bg="white" borderBottomColor={'orange.300'} >
                <Box bg='gray.10' rounded='md' w='100%'>
                  <Image resizeMode='cover'
                  rounded={'md'} 
                  source={{uri:d?.image[0]}} 
                  w={140} alt={''} 
                  bg='gray.300' h={150} />
                  <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                  position={"absolute"} right={10} 
                  top={10}/>
              </Box>
              <Box>
                <Center>
                <Text color='blueGray.600' letterSpacing='sm'>{d.name}</Text>
                <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(d.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </Center>
              </Box>
            </Box>
            </Box>
        </Pressable>
        



))}
</ScrollView>


<Box p={4} bg={'green.100'} mt={4} _text={{fontSize:16}} w='full'>Clothes & Jewels</Box>

<HStack flexWrap={'wrap'} w='full' justifyContent={'center'}>
{jewels?.data?.slice(0,4).map((d,idx)=>(
        <Pressable key={idx} m={1} shadow={1} w={'45%'} 
            bg='white' rounded={'md'} p={1}
            onPress={()=>navigation.navigate("ProductDetails",{title:d.name,id:d._id,img:d?.image[0]})}>
              <Box alignItems='center'  flex={1} >
              <Box position={"relative"} py={1}
              bg="white" borderBottomColor={'orange.300'} >
                <Box bg='gray.10' rounded='md' w='100%'>
                  <Image resizeMode='cover'
                  rounded={'md'} 
                  source={{uri:d?.image[0]}} 
                  w={140} alt={''} 
                  bg='gray.300' h={150} />
                  <Icon  as={<MaterialIcons name="favorite-border"/>} size={6} 
                  position={"absolute"} right={10} 
                  top={10}/>
              </Box>
              <Box>
                <Center>
                <Text color='blueGray.600' letterSpacing='sm'>{d.name}</Text>
                <Text fontSize={14} fontWeight='bold'  letterSpacing='sm'>Tzs {parseFloat(d.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </Center>
              </Box>
            </Box>
            </Box>
        </Pressable>
        



))}
</HStack>


  <Box pb={10} mt={10}></Box>
    </VStack>

    </>
  )}

  




  const renderSlugGridData = ({item})=>{
    return (<Pressable   
      borderWidth={1}
      key={item._id}
      borderColor={'gray.200'}
      bg='white'
      shadow={.5}
      rounded={'xl'} 
      m={1}
      w={'48%'}
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
    </Pressable>)
  }


  const renderSlugData = ({item})=>{
    return (<Pressable   
      borderWidth={1}
      key={item._id}
      borderColor={'gray.200'}
      bg='white'
      shadow={1}
      rounded={'xl'} 
      m={1}
      w={150}
      onPress={()=>navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item?.image[0]})}>
      <Center p={2} alignItems='center'
       flex={1} >
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
    </Pressable>)
  }


  const HeaderTop = ()=>{
        return  <Box mb={10}
         >

<FlatListSlider
        data={promoted?.data}
        height={240}
        timer={5000}
        imageKey={'img'}
        onPress={item => navigation.navigate("ProductDetails",{title:item.name,id:item._id,img:item.img})}

        contentContainerStyle={{paddingHorizontal: 2}}
        indicatorContainerStyle={{position:'absolute', bottom: 10}}
        indicatorActiveColor={'#8e44ad'}
        indicatorInActiveColor={'#ffffff'}
        indicatorActiveWidth={30}
        animation
      />

    </Box> 
  }

  


  const renderFooter = () => {
    try {
      if (isPostLoading) {
        return (<Box>
          <ActivityIndicator />
        </Box>
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };


  const Preview1 = ({
    style,
    item,
    imageKey,
    onPress,
    index,
    active,
    local,
  }) => {
    return (
      <TouchableOpacity key={index}
        style={[styles.videoContainer]}
        onPress={() => onPress(item)}>
          <Image alt=""
            source={{uri: item[imageKey]}}
          />
        <Text style={styles.desc}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const Preview = ({
    style,
    item,
    imageKey,
    onPress,
    index,
    active,
    local,
  }) => {
    return (
      <TouchableOpacity key={index}
        style={[styles.videoContainer]}
        onPress={() => onPress(item)}>
        <View style={[styles.imageContainer, styles.shadow]}>
          <Image alt=""
            style={styles.videoPreview}
            source={{uri: item[imageKey]}}
          />
        </View>
        {/* <Text style={styles.desc}>{item.name}</Text> */}
      </TouchableOpacity>
    );
  };


  if(isPostLoading){
    return <Center flex={1}><ActivityIndicator /></Center>
  }

  return (
      <FlatList bg='red.100' py={2} w={"100%" }
      contentContainerStyle={{backgroundColor:'white'}}
        ListHeaderComponent={HeaderTop}
        renderItem={renderItem}
        data={Category}
        keyExtractor={item => item._id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom:100,
          marginBottom:10
        }}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<EmptyData />}
      /> 
  )
}


const styles = StyleSheet.create({
  videoContainer: {
    width: 140,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  videoPreview: {
    // width: 140,
    height: 240,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    // lineHeight: 24,
    backgroundColor:"#FFF",
    paddingVertical:4,
    width:'100%',
    paddingHorizontal:4,
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
