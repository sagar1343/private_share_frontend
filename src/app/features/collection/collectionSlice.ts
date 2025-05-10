import api from "@/services/api";
import { ICollection } from "@/types/Collection";
import { PaginatedResponse } from "@/types/Pagination";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export enum CollectionActionStatus {
  IDLE = "idle",
  CREATING = "creating",
  DELETING = "deleting",
  RENAMING = "renaming",
}

export interface ICollectionState {
  isLoading: boolean;
  paginatedCollections: PaginatedResponse<ICollection> | null;
  actionStatus: CollectionActionStatus;
}

const initialState: ICollectionState = {
  isLoading: false,
  paginatedCollections: null,
  actionStatus: CollectionActionStatus.IDLE,
};

export const fetchCollections = createAsyncThunk("fetchCollections", async ({ userId, page = 1 }: { userId: number; page: number }) => {
  const response = await api.get<PaginatedResponse<ICollection>>(`api/users/${userId}/collections/?page=${page}`);
  return response.data;
});

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
        state.paginatedCollections = action.payload;
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
