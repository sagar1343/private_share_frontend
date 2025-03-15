import { Folder } from "lucide-react";

interface Props {
  title?: string;
}

export default function Collection({ title }: Props) {
  return (
    <figure className="flex flex-col items-center">
      <Folder size={82} fill="#008CFC" stroke="1" />
      <figcaption className="max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {title}
      </figcaption>
    </figure>
  );
}
