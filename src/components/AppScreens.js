import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MainApp from '../screens/MainApp';
import ProductDetails from '../screens/ProductDetails';
import ShoperScreen from '../screens/ShoperScreen';
import AddProductScreen from '../screens/Products/AddProductScreen';
import SignupScreen from '../screens/SignupScreen';
import MyProductScreen from '../screens/Products/MyProductScreen';
import EditUserScreen from '../screens/EditUser';
import EditProductScreen from '../screens/EditProductScreen';
import QuickSignup from '../screens/QuickSignup';
import { ChatScreen } from '../screens/ChatScreen';
import Messaging from './Messaging';
import Chat from '../screens/Chat';
import RegisterService from '../screens/RegisterService';
import ServiceDashboard from '../screens/ServiceDashboard';
import { Box, Icon, Input, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import ServiceProfile from '../screens/ServiceProfile';
import ElectronicsScreen from '../screens/ElectronicsScreen';



const Stack = createNativeStackNavigator();

export default function AppScreens({navigation}) {

  return (
    <Stack.Navigator
    screenOptions={{
        headerShown:false,
        headerStyle:{elevation:0,shadowColor:'none'}
    }}
    >
        <Stack.Screen name='Login' component={LoginScreen} 
        options={{title:"Login",headerShown:false}} />

        <Stack.Screen name='Dashboard' component={MainApp} />
        <Stack.Screen name='ProductDetails' 
        component={ProductDetails} 
        options={({route})=>({headerShown: true,
          headerTransparent: true,title:route.params.title,headerTitleStyle: {
            color: 'white'
          }})} />


      {/* <Stack.Screen name='ChatScreen' 
        component={ChatScreen} 
        options={({route})=>({headerShown: true,
          headerTitleStyle: {
            color: 'black'
          }})} /> */}

      <Stack.Screen name='ShoperScreen' 
        component={ShoperScreen} 
        options={({route})=>({title:route.params.title,
          headerShown:true,headerStyle:{
            elevation:0,
        shadowColor:'none',
        shadowOpacity:0,
        borderBottomWidth:0}
        })
        } />

      <Stack.Screen name='AddProduct' 
        component={AddProductScreen} 
        options={({route})=>({title:"Add product",
          headerShown:true,
          headerStyle:{
            elevation:0,
            borderBottomWidth:0,
            shadowColor:'none'
          }
        })
        } />


        <Stack.Screen name='EditUserScreen' 
        component={EditUserScreen} 
          options={({route})=>({title:"Edit User",
            headerShown:true,
            headerStyle:{
              elevation:0,
              borderBottomWidth:0,
              shadowColor:'none'
            }
          })
          } 
          />


        <Stack.Screen name='EditProductScreen' 
        component={EditProductScreen} 
          options={({route})=>({title:"Edit Product",
            headerShown:true,
            headerStyle:{
              elevation:0,
              borderBottomWidth:0,
              shadowColor:'none'
            }
          })
          } 
          />


        <Stack.Screen name='SignUp' 
        component={SignupScreen} 
        options={({route})=>({title:"Sign up",
          headerShown:false,
          headerStyle:{
            elevation:0,
            borderBottomWidth:0,
            shadowColor:'none'
          }
        })
        } />

        <Stack.Screen name='QuickSignup' 
        component={QuickSignup} 
        options={({route})=>({title:"Sign up",
          headerShown:false,
          headerStyle:{
            elevation:0,
            borderBottomWidth:0,
            shadowColor:'none'
          }
        })
        } />


    <Stack.Screen name='MyProduct' 
        component={MyProductScreen} 
        options={({route})=>({title:"My Products",headerShown:true})} />

{/* 
    <Stack.Screen
                    name='Chat'
                    component={Chat}
                    options={{
                        title: "Chats",
                        headerShown: false,
                    }}
                />
    <Stack.Screen name='Messaging' component={Messaging} /> */}

    <Stack.Screen name='ServiceProfile' component={ServiceProfile} options={{headerShown:true}} />
    
    <Stack.Screen name='RegisterService' component={RegisterService} options={{headerShown:true}} />
    <Stack.Screen name='ElectronicsScreen' component={ElectronicsScreen} options={{headerShown:true}} />

    <Stack.Screen name='ServiceDashboard' component={ServiceDashboard} options={{headerShown:true,headerTitle:()=> <Box p={4} mt={6}>
            <Input w={320} marginLeft={-10} placeholder='search locations' _focus={{bg:'#FFF'}} 
            InputRightElement={<Pressable>
            <Icon color='blue.300' as={<MaterialIcons name="search" />} size={8}  mr="2" />
          </Pressable>}
            fontSize={18}/>
        </Box>}} />
        

    </Stack.Navigator>

   
   
  )

}
