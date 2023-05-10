import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
// import { useQueryClient } from '@tanstack/react-query';
import { Box, Button, Center, FlatList, HStack, Icon, Image, Input, Pressable, Radio, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useMutation, useQuery,useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { getProductDetails, _promoteProduct } from '../data/api';

export default function EditProductScreen({route,navigations}) {
    const user = useSelector(state=>state.user);
    const refRBSheet = useRef();
    const [value, setValue] = React.useState('1');
    const [timeLeft, setTimeLeft] = React.useState();


    
    let params = route.params 
    const {isLoading,data:details} = useQuery({queryKey:['products-detals'], queryFn:()=>getProductDetails(params.id)})

    const [product,setProduct]  = useState(details?.data.name)
    const [price,setPrice]  = useState(details?.data.price)
    const [cquantity,setQuantity]  = useState(details?.data.quantity)
    let queryClient = useQueryClient()
    const mutation = useMutation({mutationFn:_promoteProduct,
    onSuccess:(data)=>{
      refRBSheet.current.close()
      if(data.status){  
        queryClient.invalidateQueries("images")
        Alert.alert("Message","Product promoted successfully")
      }
      queryClient.invalidateQueries("products-detals")
    }})


    useEffect(()=>{
      if(details?.data?.promotion_status){
        let date1 = new Date(details?.data?.promotion_date);
        let date2 = new Date(details?.data?.end_date);

        var Difference_In_Time = +(date2.getTime()) - +(date1.getTime());
      
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          
        //To display the final no. of days (result)
        console.log("Total number of days between dates  <br>"
                  + date1 + "<br> and <br>" 
                  + date2 + " is: <br> " 
                  + Difference_In_Days);

                  setTimeLeft(Difference_In_Days);

      }
      
    },[details])

    const showAlert = () =>
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete?',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'Image deleted successfully.',
        ),
    },
  );


  const promoteProduct = ()=>{
    let data = {id:params.id,promote:value}
    // alert(JSON.stringify(data))
    mutation.mutate(data)
  }


  const BottomDialog = ()=>{
    return (
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <Box>Test items</Box>

      </RBSheet>
    )
  }

    const renderItem = ({item})=>{
        return (<Box borderWidth={1} borderColor={'gray.300'}
        bg='white' p={2}
        rounded='md'
        position='relative' key={item} m={2}>
            <Pressable 
            position='absolute'
            top={-9}
            zIndex={10}
            left={1}
            onPress={showAlert}>
                <Box rounded='full' 
                borderWidth={1}
                borderColor='red.500'
                backgroundColor='white'
                width={10}
                height={10}
                justifyContent="center"
                alignItems='center'
                
                _text={{fontSize:18,fontWeight:'bold'}}
                >
                    X
                </Box>
            </Pressable>
            <Image source={{uri:item}}  height={300} width={250} alt=''/>
        </Box>)
    }


    if(isLoading){
      return <Center>
        <Box p={4} _text={{color:"gray.400",fontSize:16}}>
          Loading...
        </Box>
      </Center>
    }

  return (
    <ScrollView 
    pb={8}
    showsVerticalScrollIndicator={false}
    flex={1}>





    <VStack borderWidth={1} borderColor={'gray.200'} bg='white' m={2} rounded='md' p={2}>
        <Box m={2} >
            <Text mb={2} fontSize={16}>Product Name</Text>
            <Input
            py={3} 
                _focus={{backgroundColor:'white'}}
                placeholder='product name'
                fontSize={16}
                bg='white'
                value={product}
            />
        </Box>

        <Box m={2}>
            <Text fontSize={16} mb={2}>Price</Text>
            <Input
                py={3} 
                _focus={{backgroundColor:'white'}}
                placeholder='product name'
                fontSize={16}
                bg='white'
                value={price}
            />
        </Box>

        <Box borderWidth={1} py={4} px={2} mx={2} mt={2} borderStyle='dashed' borderColor='gray.400' rounded='md'>
          <VStack>
            <HStack>
              <Text p={2} color='gray.500'>Promotion Status: <Text fontWeight='bold' color='green.500'>{details?.data.promotion_status?"Promoted":"Not Promoted"}</Text></Text>
            </HStack>
            <Text p={2} color='gray.500'>Promotion Date: <Text fontWeight='bold'>{moment(details?.data.promotion_date).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
            <Text p={2} color='gray.500'>End Date:<Text  px={2} fontWeight={'bold'}>{moment(details?.data.end_date).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
            <Text p={2} color='gray.500'>Days Left:<Text  px={2} fontWeight={'bold'}>{moment(details?.data.end_date).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
            <Text p={2} color='gray.500'>Promotion Type:<Text  px={2} mx={2} color='black' fontSize={16} fontWeight={'bold'}> {(details?.data.promotion_type?.toUpperCase())}
            </Text>
            </Text>

              <Box>
                <HStack>
                    <Text color='gray.600'>Days Left: 
                    <Text px={4} color='black' fontWeight={'bold'}>{timeLeft}</  Text>
                    </Text> 
                  
                </HStack>
              </Box>
      
          </VStack>
        </Box>
        </VStack>
        <FlatList 
        contentContainerStyle={{p:2}}
        horizontal
        data={details?.data?.image}
        renderItem = {renderItem}
        showsHorizontalScrollIndicator={false}
        />

        <Box rounded='md' m={2} bg='white' p={4} borderWidth={1} borderColor={'gray.300'}>
            <Button 
            p={3}
            rounded='full'
            backgroundColor='gold'
            _text={{fontWeight:'bold',
            color:'blue.400'}}
            >
                Edit
            </Button>

            <Button 
            mt={4}
            p={3}
            rounded='full'
            backgroundColor='green.400'
            _text={{fontWeight:'bold',color:'blue.400'}}
            onPress={() => refRBSheet.current.open()}
            >
                Promote
            </Button>

        </Box>


        <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
   
   <Box p={4}>
  

   <Radio.Group defaultValue="1" 
      size="lg" 
      name="exampleGroup" 
      accessibilityLabel="pick a choice"
      value={value}
      onChange={nextValue => {
        setValue(nextValue);
      }}
      >
      <Radio _text={{
        mx: 2
      }} 
        colorScheme="green" value="1" 
        icon={<Icon 
          as={<MaterialCommunityIcons 
            name="alien" />} />} 
          size="lg"
          my={1}>
          10,000 - Silver
      </Radio>

      <Radio 
        mt={4}
        _text={{
        mx: 2
        }} colorScheme="red" value="2" 
        size="lg"
        icon={<Icon as={<MaterialCommunityIcons name="fire" />} />} my={1}>
        20,000 - Gold
      </Radio>
     
    </Radio.Group>

    <Button bg='gold'
     rounded='full' mt={4} 
     onPress={promoteProduct}
     _text={{color:'black.600',fontSize:16, fontWeight:'bold'}}>
      {mutation.isLoading?"Processing":"Promote"}</Button>


    </Box>
    
      </RBSheet>


    </ScrollView>
  )
}
