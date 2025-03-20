import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface Props {
  message: string;
}

export default function InfoButton({ message }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Info size="20" className="cursor-pointer" />
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-xs">{message}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
