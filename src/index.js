import React from 'react'
import { NativeBaseProvider, Box,Text } from "native-base"
import AppScreens from './components/AppScreens'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './screens/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
        <NativeBaseProvider>
          <NavigationContainer>
            <AppScreens />
          </NavigationContainer>
      </NativeBaseProvider>
  )
}
