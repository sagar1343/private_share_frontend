import ExpirationAction from "@/components/ExpirationAction";
import ExpirationUpdateForm from "@/components/ExpirationUpdateForm";
import InfoButton from "@/components/InfoButton";
import { useState } from "react";

export default function ExpirationSection({ date }: { date: string | Date }) {
  const [show, setShow] = useState(false);
  const [expiration_time, setExpiration_time] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );

  return (
    <div>
      <h2 className="h-9 font-semibold flex items-center gap-2">
        Expiration Time
        <InfoButton
          message=" When the file will get expires, the file will be deleted and link
              will no longer work."
        />
        <ExpirationAction show={show} setShow={setShow} />
      </h2>
      {!show ? (
        <p className="h-[44px] font-light text-foreground/70">
          {expiration_time
            ? new Date(expiration_time).toLocaleString()
            : "No expiration"}
        </p>
      ) : (
        <ExpirationUpdateForm
          setShow={setShow}
          expiration_time={expiration_time}
          setExpiration_time={setExpiration_time}
        />
      )}
    </div>
  );
}
