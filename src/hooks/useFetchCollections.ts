import { AppDispatch } from "@/app/store";
import { useAuthContext } from "@/context/AuthContext";
import {
  CollectionActionStatus,
  fetchCollections,
} from "@/app/features/collection/collectionSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useFetchCollections(
  actionStatus: CollectionActionStatus,
  page: number
) {
  const { authenticatedUser } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (authenticatedUser?.id && actionStatus === CollectionActionStatus.IDLE) {
      dispatch(fetchCollections({ userId: authenticatedUser.id, page }));
    }
  }, [authenticatedUser, actionStatus, dispatch, page]);
}
