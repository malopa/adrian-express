import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, Box,Text } from "native-base"
import { NavigationContainer } from '@react-navigation/native';
import AppScreens from './src/components/AppScreens';
import {
  QueryClient,
  QueryClientProvider,

} from 'react-query'
import { Provider } from 'react-redux';
import { persistor, store } from './src/screens/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SearchContextProvider } from './src/context/SearchContext';

const queryClient = new QueryClient()

export default function App() {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <SearchContextProvider>
            {/* <MyForm /> */}
              <AppScreens />
            </SearchContextProvider>
            </QueryClientProvider>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}
