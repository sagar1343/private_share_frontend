import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { KeyboardEvent } from "react";

interface Props {
  emailInput: string;
  setEmailInput: (val: string) => void;
  onAddEmail: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function EmailInput({
  emailInput,
  setEmailInput,
  onAddEmail,
  onKeyPress,
}: Props) {
  return (
    <div className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter email address"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        onKeyPress={onKeyPress}
        className="flex-1"
      />
      <Button
        onClick={onAddEmail}
        variant="secondary"
        className="cursor-pointer"
        disabled={!emailInput.trim()}
      >
        <Plus />
      </Button>
    </div>
  );
}
