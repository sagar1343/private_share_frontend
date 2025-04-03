import { AppDispatch } from "@/app/store";
import { useAuthContext } from "@/context/AuthContext";
import {
  CollectionActionStatus,
  fetchCollections,
} from "@/app/features/collection/collectionSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useFetchCollections(
  actionStatus: CollectionActionStatus
) {
  const { authenticatedUser } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (authenticatedUser?.id && actionStatus === CollectionActionStatus.IDLE) {
      dispatch(fetchCollections(authenticatedUser.id));
    }
  }, [authenticatedUser, actionStatus, dispatch]);
}
