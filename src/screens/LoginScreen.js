import { FontAwesome } from '@expo/vector-icons';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar.js';
import { Box, Button, Center, HStack, Icon, Image, Input, StatusBar, Text, VStack } from 'native-base'
import React, { useRef, useState } from 'react'
import PhoneInput from 'react-native-phone-number-input';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { AuthDialog } from '../components/AuthDialog.js';
import { login } from '../data/api.js';
import { data } from '../data/data';
import { _login } from '../features/userSlice.js';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Alert } from 'react-native';



// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

export default function LoginScreen({navigation}) {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDiabled] = useState(false);

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user);
  const phoneInput = useRef(null);


    const mutation = useMutation(login,{
      onSuccess:(data)=>{
        setDiabled(!disabled)

      if(data.status){
        dispatch(_login(data))
        setIsOpen(false);
        setPassword("")
        setMobile("")
        navigation.navigate("Dashboard")
      }else{
        setDiabled(!disabled)

        Alert.alert("Message","Wrong username|password")
        setIsOpen(false);

      }
    }})
    const [mobile,setMobile] = useState(null);
    const [password,setPassword] = useState(null);

    const handleLogin = async ()=>{
        let data = {mobile,password}
        if(!mobile || !password){
          return;
        }
        setIsOpen(!isOpen);
        setDiabled(!disabled)
        mutation.mutate(data);
    }

    if(user.isLoggedIn){
      return navigation.navigate("Dashboard")
    }

  return (
    <Box flex={1} bg="white" p={4}>
      <ExpoStatusBar bg='gold'/> 

        <Center flex={1} bg='red' p={4}>

        <Box p={4}>
        <Image width={20} rounded='full' alt='logo' height={20} source={require("../../assets/logo.png")} />  
        </Box>


          <Button rounded='full' bg='black' w='full'> 
          <HStack >
            <Icon color='amber.400' size={6} rounded='full' as={<FontAwesome name='google' />}/> 
            <Text color='white' px={2}>Signin with google</Text>
          </HStack>
          </Button>

            <Text p={4}>--Or--</Text> 

            <PhoneInput
            ref={phoneInput}
            defaultValue={mobile}
            defaultCode="TZ"
            autoFocus={false}
            onChangeFormattedText={(text) => {
              setMobile(text);
            }}
            placeholder='Enter Your phone number'
            withDarkTheme
            autoFocus
            containerStyle={{borderWidth:1, margin:2, 
                borderRadius:4,borderColor:'#bebfc8',width:'94%'}}
        />


            <Input placeholder='password' 
              type='password' mt={2} 
              size='lg'
              py={3}
              _focus={{bg:'white',borderWidth:1,borderColor:'amber.800'}} 
              activeUnderlineColor={"#000"}
              underlineColor={'#333'} 
              value={password}
              fontSize={16}
              px={4}
              rounded='full'
              onChangeText={text=>setPassword(text)}
              label="Password" 
              />

            <VStack w='full' justifyContent='space-between'>
            <Button 
            isDisabled={disabled}
            
            onPress={handleLogin} rounded={'full'} 
            mt={4} width='full'
              py={3}  
              bg='#020143' >
                <Text fontWeight='bold' color='white'>Log In</Text>
              </Button>

              <Button w='full' 
              onPress={()=>navigation.navigate("SignUp")} 
              rounded={'full'} borderColor='gray.500' 
              borderWidth={1} mt={4} py={3}  bg='white' >
                <Text color='black' fontWeight='bold'>Sign Up</Text></Button>
              
              <Button w='full' 
              _onFocus={{bg:'white'}}
              onPress={()=>navigation.navigate("Dashboard")} 
                rounded={'full'} borderColor='gray.500' 
                borderWidth={1} mt={4} py={3}  bg='white' >
                <Text color='black' fontWeight='bold'>Signup Later > > </Text>
              </Button>
              

            </VStack>

        <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            

        </Center>
    </Box>
  )
}
