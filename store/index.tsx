import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import systemReducer from "./system";
import systemPersistReducer from "./system_persist";
import { appEnv } from "@/configs/env";

const rootReducer = combineReducers({
  system: systemReducer,
  systemPersist: systemPersistReducer
});

const persistConfig = {
  key: "myakawo",
  storage: AsyncStorage,
  // whitelist: ['key1', 'key2'],//Things you want to persist
  blacklist: ["system"] //Things you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: appEnv.isDev,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
