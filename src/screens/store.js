import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import userSlice from '../features/userSlice';


const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  whitelist:['user']
}

const rootReducer = combineReducers({
  user:userSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

