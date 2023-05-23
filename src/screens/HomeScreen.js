import 'react-native-gesture-handler';
import React from 'react'

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import ElectronicsScreen from './ElectronicsScreen';
import { Box, HStack, Icon, Image, Input, Pressable, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import OtherScreen from './categories/OtherScreen';
import LapcomputerScreen from './categories/LapcomputerScreen';
import ClothJewelScreen from './categories/ClothJewelScreen';
import HouseEstateScreen from './categories/HouseEstateScreen';
import FunirtureScreen from './categories/FunirtureScreen';
import MobilePhoneScreen from './categories/MobilePhoneScreen';
import Carspares from './categories/Carspares';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();



function CustomDrawerContent(props) {
const user = useSelector(state=>state.user);


  return (
    <DrawerContentScrollView {...props}>
      <Box p={4}>
        <HStack justifyContent='flex-start' alignItems='center'>
            <Icon as={<MaterialIcons name='person'  />} size={10}/>
            <Box ml={2}>
                <Text fontSize={14} color='gray.500'>Welcome</Text>
                <Text fontSize={14}>{user?.user?.name} / {user?.user?.mobile}</Text>
            </Box>
        </HStack>
      </Box>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


export default function HomeScreen(props) {
  return (
    // <Drawer.Navigator>
    <Drawer.Navigator 
    screenOptions={{
      headerStyle: {
        borderBottomWidth: 0,
        elevation:0,
        shadowColor:'none'
      }
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Dashboard" 
    options={{slug:'ElectronicsScreen',headerTitle: () => (
      <Input rounded={'full'} placeholder="Search product here" fontSize={14} width={300} 
      borderColor='black' 
      InputRightElement={<Pressable onPress={() => props.navigation.navigate("SearchScreen")} rounded='full' bg='black' p={2} justifyContent='center'
      alignItems={'center'}
      >
            <Icon as={<MaterialIcons name={"search"} p={2} />} size={5}  mr={2} color="white" bg='black'  />
          </Pressable>}
      my={2}
      
      />
    ),headerTitleAlign:"center"}} component={MainScreen} />
      <Drawer.Screen name="Electronics" 
      component={ElectronicsScreen}
      initialParams={{slug:'ElectronicsScreen'}} 
      />
      <Drawer.Screen name="Laptop & Computer" 
      component={ElectronicsScreen} 
      initialParams={{slug:'LapcomputerScreen'}} 
      
      />
      <Drawer.Screen name="Clothes & Jewels" component={ElectronicsScreen} 
      initialParams={{slug:'ClothJewelScreen'}} 
      
      />
      <Drawer.Screen name="House & Real Estate" component={ElectronicsScreen} 
      initialParams={{slug:'HouseEstateScreen'}} 
      />
      <Drawer.Screen name="Funirtures" component={ElectronicsScreen} 
      initialParams={{slug:'Funirtures'}}
      />
      <Drawer.Screen name="Mobile phone & Accessories" component={MobilePhoneScreen} 
      initialParams={{slug:'MobilePhoneAccessories'}}
      />
      <Drawer.Screen name="Cars & Spares" component={Carspares} 
      initialParams={{slug:'Cars'}}
      
      />
      <Drawer.Screen name="Hardware & building materials" component={ElectronicsScreen} 
      initialParams={{slug:'HardWare'}}
      
      />
      <Drawer.Screen name="Others" component={OtherScreen} />
       
    </Drawer.Navigator>

    
  );
}


