import { Folder } from "lucide-react";
import ContextMenuComponent from "../components/ContextMenu";

interface Props {
  title?: string;
  collectionId: number;
}

export default function Collection({ title, collectionId }: Props) {
  return (
    <ContextMenuComponent collectionId={collectionId}>
      <figure className="flex flex-col items-center">
        <Folder size={82} fill="#008CFC" stroke="1" />
        <figcaption className="max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title}
        </figcaption>
      </figure>
    </ContextMenuComponent>
  );
}
