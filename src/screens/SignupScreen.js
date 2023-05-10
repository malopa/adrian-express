import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Box, Button, Center, Heading, HStack, Image, Input, ScrollView, Text, VStack } from 'native-base'
import React, { useState,useRef,StatusBar } from 'react'
import { Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux';
import { AuthDialog } from '../components/AuthDialog';
import { signUp } from '../data/api';
import { _login } from '../features/userSlice';

// import {
//     SafeAreaView,
//     StyleSheet,
//     View,
//     StatusBar,
//     TouchableOpacity,
//   } from "react-native";
//   import PhoneInput from "react-native-phone-number-input";



export default function SignupScreen({navigation}) {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    // sign up
    const mutation = useMutation(signUp,{
        onSuccess:(data)=>{
            setIsOpen(false)
            if(data.status){
                dispatch(_login(data))
                navigation.navigate("Dashboard")            
            }else{
                setIsOpen(false)
                Alert.alert("Message","User with this phonenumber already exist")
            }
    }})

    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    const bphoneInput = useRef(null);

    const [mobile,setMobile] = useState(null);
    const [businesName,setBusinessName] = useState(null);
    const [businesNumber,setBusinessNumber] = useState(null);
    const [email,setEmail] = useState(null);
    const [username,setUsername] = useState(null);
    const [location,setBusinessLocation] = useState(null);
    const [password,setPassword] = useState(null);
    const [cpassword,setCpassword] = useState(null);


    const handleSignup = ()=>{
        if(password !== cpassword) return;
        if(!mobile)return;

        setIsOpen(!isOpen)
        let data = {username,mobile:+mobile,password}
            mutation.mutate(data)
    }

    return (
    <ScrollView p={4} bg='#FFF' flex={1}>
      <ExpoStatusBar bg='gold' 
      />

            <Center my={5}>
                <VStack justifyContent='center' alignItems='center'>
                    <Image width={20} 
                    rounded='full' 
                    alt='logo' 
                    height={20} 
                    source={require("../../assets/icon.png")} 
                    />  

                    <Text p={2}  
                    alignItems='center' 
                    justifyContent='center'
                    
                    >
                        REGISTER
                    </Text>

                </VStack>
            
     

        <PhoneInput
            ref={phoneInput}
            defaultValue={mobile}
            defaultCode="TZ"
            onChangeFormattedText={(text) => {
              setMobile(text);
            }}
            autoFocus={false}
            placeholder='Enter Your phone number'
            withDarkTheme
            containerStyle={{borderWidth:1, 
                margin:2,
                borderRadius:50, 
                borderRadius:4,borderColor:'#bebfc8',width:'100%'}}
        />


        <Input 
            m={2}
            mt={3}
            rounded='md'
            fontSize={16}
            _focus={{bg:'white'}}
            value={username}
            onChangeText={text=>setUsername(text)}
            placeholder='Enter Your name'
            p={2}
            w='94%'
            px={4}
            py={3}
        />

        {/* <Input 
            m={2}
            mt={3}
            p={3}
            w='94%'
            rounded='md'
            fontSize={16}
            _focus={{bg:'white'}}
            value={businesName}
            onChangeText={text=>setBusinessName(text)}
            placeholder='Enter Buisness Name'
        /> */}

        {/* <Input 
            m={2}
            p={4}
            w='full'
            fontSize={16}
            _focus={{bg:'white'}}
            value={businesNumber}
            onChangeText={text=>setBusinessNumber(text)}
            placeholder='Enter Buisness Number'
        /> */}

    

        {/* <Input
            m={2}
            fontSize={16}
            _focus={{bg:'white'}}
            value={email}
            w='90%'
            rounded='90%'
            onChangeText={text=>setEmail(text)}
            placeholder='Enter email'
            keyboardType='email'
            p={4}
        /> */}
{/* 
        <Input 
            m={2}
            fontSize={16}
            rounded='full'
            mt={3}
            _focus={{bg:'white'}}
            value={location}
            w='90%'
            onChangeText={text=>setBusinessLocation(text)}
            placeholder='Enter Location'
            p={4}
        /> */}


        <Input 
            m={2}
            placeholder='Password'
            p={3}
            fontSize={16}
            w='94%'
            rounded='md'
            size={16}
            _focus={{bg:'white'}}
            value={password}
            onChangeText={text=>setPassword(text)}

        />
        <Input
            m={2}
            placeholder='Confirm Password'
            p={3}
            w='94%'
            rounded='md'
            fontSize={16}
            _focus={{bg:'white'}}
            value={cpassword}
            onChangeText={text=>setCpassword(text)}
            size={16}
            keyboardType='password'
        />

        <Button m={2} width='94%' 
        onPress={handleSignup} py={4} 
        rounded='md' bg='amber.600'>REGISTER</Button>

        <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </Center> 

    </ScrollView>
  )
}
