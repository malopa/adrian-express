import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { Box, FlatList, Image, Pressable, ScrollView, StatusBar } from 'native-base'
import React from 'react'

export default function ServiceScreen({navigation,route}) {

    let data = [
        {id:1,name:"Tax & Accountant",img:require('../../assets/service/tax.png'),slug:"Tax & Accountant"},
        {id:2,name:"Lawyers & Advocates",img:require("../../assets/service/lawyer.png"),slug:"Tax & Accountant"},
        {id:3,name:"Archtects",img:require("../../assets/service/architect.png"),slug:"Archtects"},
        {id:4,name:"ICT",img:require("../../assets/service/ict.jpeg"),slug:"ICT"},
        {id:5,name:"Electical Technicians",img:require("../../assets/service/electic.jpg"),slug:"Electical Technicians"},
        {id:6,name:"Car Hiring",img:require("../../assets/service/service.jpg"),slug:"Car Hiring"},
        {id:8,name:"Gerage Motor Technicians",img:require("../../assets/service/garage.png"),slug:"Gerage Motor Technicians"},
        {id:9,name:"Hospitals",img:require("../../assets/service/hospital.jpeg"),slug:"Hospitals"},
        {id:10,name:"Pharmacy",img:require("../../assets/service/pharmacy.jpg"),slug:"Pharmacy"},
        {id:11,name:"Security Services",img:require("../../assets/service/security.jpg"),slug:"Security Services"},
        {id:12,name:"Food & Catering",img:require("../../assets/service/fod.png"),slug:"Food & Catering"},
        {id:13,name:"Doctor Services",img:require("../../assets/service/doctor.jpeg"),slug:"Doctor Services"},
    ]


    const renderItem = ({item})=>{
        return <Pressable w='30%' 
        onPress={()=>navigation.navigate("ServiceDashboard",{slug:item.slug})}
        justifyContent={'center'} alignItems='center' m={1}>
                <Image source={item.img} borderWidth={1} borderColor="gray.200" width={100} height={100}  rounded="full" alt=''/>
                <Box p={2}   rounded='md' _text={{fontWeight:'bold',textAlign:'center', numberOfLines:2,ellipsizeMode:'tail', fontSize:16}} bg='white' my={1}>{item.name}</Box>
            </Pressable>
    }
  return (
    <Box p={2} bg='white'>
        <ExpoStatusBar />


        <FlatList
            _contentContainerStyle={{paddingBottom:16,justifyContent:'space-around',alignItems:'center'}}
            data={data}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
        />

    </Box>

  )
}
