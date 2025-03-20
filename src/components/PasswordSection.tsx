import InfoButton from "./InfoButton";
import { Button } from "./ui/button";

export default function PasswordSection() {
  return (
    <div>
      <h2 className="font-semibold flex items-center gap-2">
        Password
        <InfoButton message="Set password to control who has access to this file." />
      </h2>

      <Button variant="link" className="px-0 cursor-pointer">
        Set password
      </Button>
    </div>
  );
}
