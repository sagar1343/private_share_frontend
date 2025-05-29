import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import UserItem from "./UserItem";

interface Props {
  allowedUsers: string[];
  removeEmail: (email: string) => void;
  showAll: boolean;
  setShowAll: (show: boolean) => void;
}

export default function AllowedUsers({
  allowedUsers,
  removeEmail,
  showAll,
  setShowAll,
}: Props) {
  const displayedUsers = showAll ? allowedUsers : allowedUsers.slice(0, 2);
  const hasMoreUsers = allowedUsers.length > 2;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Allowed users ({allowedUsers.length})
      </p>

      <div className="space-y-2">
        {showAll ? (
          <div className="max-h-48 overflow-y-auto space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {allowedUsers.map((email) => (
              <UserItem
                key={email}
                email={email}
                onRemove={() => removeEmail(email)}
              />
            ))}
          </div>
        ) : (
          <>
            {displayedUsers.map((email) => (
              <UserItem
                key={email}
                email={email}
                onRemove={() => removeEmail(email)}
              />
            ))}
          </>
        )}

        {hasMoreUsers && (
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground hover:text-foreground"
          >
            <Eye className="h-4 w-4 mr-1" />
            {showAll ? "Show less" : `View ${allowedUsers.length - 2} more`}
          </Button>
        )}
      </div>
    </div>
  );
}
