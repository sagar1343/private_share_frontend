import { ICollection } from "@/types/Collection";
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  active?: boolean;
  collection: ICollection;
}

export default function Collection({ collection }: Props) {
  const navigate = useNavigate();

  return (
    <figure
      className="flex flex-col items-center cursor-pointer p-2 rounded-xl"
      onDoubleClick={() => navigate(`/collections/${collection.id}`)}
    >
      <Folder size={82} fill="#008CFC" stroke="1" />
      <figcaption className="max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {collection.title}
      </figcaption>
    </figure>
  );
}
