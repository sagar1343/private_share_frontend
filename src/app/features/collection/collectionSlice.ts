import api from "@/services/api";
import { ICollection } from "@/types/Collection";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export enum CollectionActionStatus {
  IDLE = "idle",
  CREATING = "creating",
  DELETING = "deleting",
  RENAMING = "renaming",
}

export interface ICollectionState {
  isLoading: boolean;
  collections: ICollection[];
  actionStatus: CollectionActionStatus;
}

const initialState: ICollectionState = {
  isLoading: false,
  collections: [],
  actionStatus: CollectionActionStatus.IDLE,
};

export const fetchCollections = createAsyncThunk(
  "fetchCollections",
  async (userId: number) => {
    const response = await api.get(`api/users/${userId}/collections`);
    return response.data;
  }
);

export const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setActionStatus: (state, action) => {
      state.actionStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collections = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export const { setActionStatus } = CollectionSlice.actions;

export default CollectionSlice.reducer;
