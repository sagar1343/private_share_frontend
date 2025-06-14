import clsx from "clsx";
import Collection from "./Collection";
import { ICollection } from "@/types/Collection";

interface Props {
  collection: ICollection;
  isActive: boolean;
  onClick: () => void;
}
export default function CollectionItem({ collection, isActive, onClick }: Props) {
  return (
    <li
      onClick={onClick}
      className={clsx(
        "rounded-md cursor-pointer transition-all",
        isActive ? "bg-primary/30 dark:bg-primary/30 shadow-lg" : "bg-transparent"
      )}
    >
      <Collection isActive={isActive} collection={collection} />
    </li>
  );
}
