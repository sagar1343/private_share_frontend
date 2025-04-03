import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./features/collection/collectionSlice";

const store = configureStore({
  reducer: {
    UserCollections: collectionReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
