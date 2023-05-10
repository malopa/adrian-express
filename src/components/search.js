import { Box, Center, Image } from 'native-base'
import React from 'react'

export default function SearchData() {
    return <Center p={8} flex={1}>
    <Image 
        source={require("../../assets/search.png")} 
        width={40}
        height={40}
        alt="" />
    <Box _text={{fontSize:16,color:"gray.400"}}>
        Search Product here
    </Box>
  </Center>

}
