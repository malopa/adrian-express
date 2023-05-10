import { Actionsheet, Box, Button, Input, Select, StatusBar, Text, TextArea, useDisclose } from 'native-base'
import React, { useState } from 'react'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { saveServiceData } from '../data/api';


let data = [
    {id:1,name:"Tax & Accountant"},
    {id:2,name:"Lawyers & Advocates"},
    {id:3,name:"Archtects"},
    {id:4,name:"ICT"},
    {id:5,name:"Electirc Technicians"},
    {id:6,name:"Car Hiring"},
    {id:8,name:"Gerage Motor Technicians"},
    {id:9,name:"Hospitals"},
    {id:10,name:"Pharmacy"},
    {id:11,name:"Security Services"},
    {id:12,name:"Food & Catering"},
    {id:14,name:"Doctor Services"},
]

export default function RegisterService(props) {

    const user = useSelector(state=>state.user)
    const [disabled,setDisabled] = useState(false)
    const [experience,setExperience] = useState();
    const [service,setService] = useState();
    const [level,setLevel] = useState();
    const [location,setLocation] = useState();
    const [name,setName] = useState();
    const [working,setWorking] = useState();
    const [biography,setBiography] = useState()


    const mutation = useMutation(saveServiceData,
        {onSuccess:(data)=>{
            setDisabled(false)
            Alert.alert("success",data.msg)
            props.navigation.navigate("ServiceProfile",{user:data.data})

        }

        }
    )


    const handleSave = ()=>{
        if(!experience && service && level)return;
        
        let data = {experience,service,level,location,working,biography,token:user.token,name}

        setDisabled(true)

        mutation.mutate(data)

    }

  return (
    <SafeAreaView>
        <ScrollView >
    <Box flex={1} bg="white">
        <StatusBar />

        <Box p={2}>

        
        <Box p={2} >
            <Text>Name</Text>
            <Input 
            value={name}
            _focus={{bg:'white'}}
            onChangeText={(text)=>setName(text)}
            placeholder="Business Name or your name" fontSize={14} />
        </Box>

        <Box p={2} >
            <Text>Level</Text>
            <Input 
            value={level}
            _focus={{bg:'white'}}
            onChangeText={(text)=>setLevel(text)}
            placeholder="Enter level" fontSize={14} />
        </Box>

        <Box p={2}>
            <Text>Experience</Text>
            <Input fontSize={14} 
            value={experience}
            onChangeText={text=>setExperience(text)}
            placeholder="Write your experience" _focus={{bg:'white'}}/>
        </Box>


        <Box p={2} >
            <Text>Business Location</Text>
            <Input placeholder="eg. Dar es salaam , kariakoo uhuru street" 
            fontSize={14}
            _focus={{bg:'white'}}
            value={location}
            onChangeText={text=>setLocation(text)}
            />
        </Box>
        

        <Box p={2}>
            <Box>Select Service</Box>
            <Select
            _focus={{bg:'white'}}
                w='full'
                fontSize={14}
                my={2}
                selectedValue={service} 
                placeholder="Pick Service"
                width={150}
                onValueChange={(itemValue) => setService(itemValue)}
                >
                    {data.map(d=><Select.Item label={d.name} value={d.name} key={d.id} />)}
                
            </Select>
        </Box>


        <Box my={1} p={2}>
            <Text>Working Hours</Text>
            <Input placeholder="Enter working hours"  
            value={working}
            _focus={{bg:'white'}}
            onChangeText={text=>setWorking(text)}
            fontSize={14} />
        </Box>

        <Box p={2} my={2}>
            <Text>Biography</Text>
            <TextArea fontSize={14} 
            value={biography}
            _focus={{bg:'white'}}
            onChangeText={text=>setBiography(text)}
            placeholder="Write your biography"></TextArea>
        </Box>

        <Button 
        onPress={handleSave}
        isDisabled={disabled}
        fontSize={18} py={3}>Save</Button>

        </Box>



   
        
    </Box>
    </ScrollView>
    </SafeAreaView>
  )
}
