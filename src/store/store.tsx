import { configureStore, combineReducers } from "@reduxjs/toolkit";
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

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
})
export const persistor = persistStore(store) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch