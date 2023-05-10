import { Box, Heading, Icon, Input, VStack } from 'native-base'
import React, { useContext, useEffect } from 'react'
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import CartScreen from './CartScreen';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import SearchItem from '../components/SearchItems';
import { SearchContext } from '../context/SearchContext';
import ServiceScreen from './ServiceScreen';
import VideoScreen from './VideoScreen';
import { BackHandler } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainApp({navigation}) {

  const {clicked,setClicked,searchPhrase, setSearchPhrase} = useContext(SearchContext);



  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      headerShown={false}
      barStyle={{ paddingBottom:4,height: 80 }}
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarActiveTintColor: 'black',
      }}

      tabContainerStyle={{
        elevation:0,
        shadowColor:"none"
      }}
      backBehavior={"history"}
    >

      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
        tabBarLabel: 'Home',
        headerShown:false,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}


      />

      <Tab.Screen name="Video" component={VideoScreen} 
       options={{
        tabBarLabel: 'Video',
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon name="video-camera" color={color} size={26} />
        ),
      }}
      />

      
      <Tab.Screen name="Cart" component={CartScreen} 
      options={{
        title:"",
        tabBarLabel: 'Explore',
        headerStyle: {
          borderBottomWidth: 0,
          elevation:0,
          shadowColor:'none'
        },
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon name="search" color={color} size={26} />
        ),
        headerRight:()=>(
          <VStack alignSelf="center" w='90%' rounded='md'>
            <SearchItem
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />

       
      </VStack>
        )
      }}
      />


  

    {/* <Tab.Screen name="Service" component={ServiceScreen} 
       options={{
        tabBarLabel: 'Service',
        tabBarIcon: ({ color }) => (
          <AntDesign name="customerservice" color={color} size={26} />
        ),
      }}
      /> */}




      <Tab.Screen name="Settings" component={SettingsScreen} 
       options={{
        headerShown:false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
      />
    </Tab.Navigator>
  )
  
}
