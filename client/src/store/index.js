import { configureStore } from "@reduxjs/toolkit";

// redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// project import
import reducers from "./reducers";

// The redux-persist library is used to store everything in the redux store
// to localStorage. So, when the page is refreshed, the store will remain As It Was.

// persist config
const persistConfig = {
  key: "chat-app",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// ============================== REDUX - MAIN STORE ==============================

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistedStore = persistStore(store);

export { persistedStore };
