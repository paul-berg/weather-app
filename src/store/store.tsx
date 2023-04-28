import {
	configureStore,
	combineReducers,
	PreloadedState
} from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import {
	persistStore,
	persistReducer,
	FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import weatherReducer from "./reducers/weatherSlice";
import userReducer from "./reducers/userSlice";

const persistConfig = {
  key: 'root',
	storage
}

const rootReducer = combineReducers({
	weather: weatherReducer,
	user: userReducer
})

// export type DefaultMiddleware = ReturnType<typeof getDefaultMiddleware>


export const persistedReducer = persistReducer(persistConfig, rootReducer)
export const persistedMiddleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
getDefaultMiddleware({
	serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
	},
})

export const store = configureStore({
	reducer: persistedReducer,
	middleware: persistedMiddleware,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
		reducer: persistedReducer,
		middleware: persistedMiddleware,
    preloadedState
  })
}

export const persistor = persistStore(store) 

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch

