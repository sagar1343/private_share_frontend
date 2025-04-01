import PasswordActions from "@/components/FileActionButton";
import InfoButton from "@/components/InfoButton";
import { useState } from "react";
import PasswordUpdateForm from "./PasswordUpdateForm";

interface Props {
  isProtected: boolean;
}

export default function PasswordSection({ isProtected }: Props) {
  const [show, setShow] = useState(false);
  const [is_protected, setProtected] = useState(isProtected);

  return (
    <div>
      <h2 className="font-semibold flex items-center gap-2">
        Password
        <InfoButton message="Set password to control who has access to this file." />
        <PasswordActions
          show={show}
          setShow={setShow}
          editLabel={is_protected ? "Change Password" : "Set Password"}
        />
      </h2>
      {show && (
        <PasswordUpdateForm setShow={setShow} setProtected={setProtected} />
      )}
      {is_protected && !show && (
        <p className="text-sm text-foreground/70 h-11">
          Encrypted with password
        </p>
      )}
    </div>
  );
}
