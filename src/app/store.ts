import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "../features/collection/collectionSlice";

const Store = configureStore({
  reducer: {
    UserCollections: collectionReducer,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
