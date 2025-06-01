import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function UserItem({
  email,
  onRemove,
}: {
  email: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
      <Avatar className="h-6 w-6">
        <AvatarImage />
        <AvatarFallback className="text-xs">
          {email.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <span className="text-sm flex-1 truncate">{email}</span>

      <Button
        onClick={onRemove}
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
