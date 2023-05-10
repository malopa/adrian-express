import { Box, Button, Center, Input, Pressable, Text } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-native-phone-number-input';
import { useMutation } from 'react-query';
import { AuthDialog } from '../components/AuthDialog';
import { signUp } from '../data/api';

export default function QuickSignup({navigation}) {

    const phoneInput = useRef(null);
    const [valid, setValid] = useState(false);
    const [mobile,setMobile] = useState(null);
    const [password,setPassword] = useState(null);
    const [cpassword,setCpassword] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const mutation = useMutation(signUp,{
        onSuccess:(data)=>{
            setIsOpen(!isOpen)
            if(data.status){
                navigation.navigate("Dashboard")            
            }
    }})


    useEffect(()=>{

    },[])


    const handleSignup = ()=>{
        if(password !== cpassword) return;
        alert(phoneInput)
        const checkValid = phoneInput.current?.isValidNumber();
           setValid(checkValid ? checkValid : false);
        if(!valid){
            alert("Wrong phone number")
            return;
        }


        setIsOpen(!isOpen)
        let data = {mobile,password}
            mutation.mutate(data)
    }

  return (
    <Center flex={1} p={4} bg='white'>
        <Box _text={{fontWeight:'bold',fontSize:24,my:4}}>Register</Box>

        <Box>
            <PhoneInput
                ref={phoneInput}
                defaultValue={mobile}
                defaultCode="TZ"
                onChangeFormattedText={(text) => {
                setMobile(text);
                }}
                fontSize={24}
                placeholder='Enter Your phone number'
                withDarkTheme
                autoFocus
                containerStyle={{borderWidth:1,margin:2,borderRadius:40, borderColor:'#bebfc8',width:'100%'}}
            />
        </Box>

        <Input 
            m={2}
            placeholder='Password'
            p={3}
            w='full'
            rounded='full'
            fontSize={16}
            _focus={{bg:'white'}}
            value={password}
            bg='white'
            onChangeText={text=>setPassword(text)}

        />
        <Input
            m={2}
            rounded='full'
            bg='white'
            placeholder='Confirm Password'
            p={3}
            w='full'
            _focus={{bg:'white'}}
            value={cpassword}
            onChangeText={text=>setCpassword(text)}
            fontSize={16}
        />

        <Button m={2} width='100%' onPress={handleSignup} py={4} rounded='full' bg='amber.600'>REGISTER</Button>


        <Pressable onPress={()=>navigation.navigate("Login")} 
        _text={{}}><Text p={3}>Log In</Text></Pressable>

        <AuthDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </Center>
  )
}
