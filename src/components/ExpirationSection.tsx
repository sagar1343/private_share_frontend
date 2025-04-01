import { DateTimePicker } from "@/components/DateTimePicker";
import InfoButton from "@/components/InfoButton";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Params, useParams } from "react-router";
import { toast } from "sonner";

export default function ExpirationSection({ date }: { date: string | Date }) {
  const { id }: Params = useParams();
  const [expiration_time, setExpiration_time] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );
  const [show, setShow] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(expiration_time);

  async function updateExpirationTime() {
    if (currentTimer === expiration_time) {
      toast.warning("No changes detected");
      return;
    }
    try {
      const response = await api.patch(`api/files/${id}/`, {
        expiration_time: expiration_time ? expiration_time : null,
      });
      setExpiration_time(response.data.expiration_time);
      setCurrentTimer(response.data.expiration_time);
      toast.success("Updated expiration timer");
    } catch (error) {
      toast.error("Failed to update the expiry");
    } finally {
      setShow(false);
    }
  }

  return (
    <div>
      <h2 className="h-9 font-semibold flex items-center gap-2">
        Expiration Time{" "}
        <InfoButton
          message=" When the file will get expires, the file will be deleted and link
              will no longer work."
        />
        {!show ? (
          <Button
            onClick={() => setShow(true)}
            variant="link"
            className="cursor-pointer"
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={() => setShow(false)}
            variant="link"
            className="cursor-pointer text-foreground"
          >
            Cancel
          </Button>
        )}
      </h2>
      {!show ? (
        <p className="h-[44px] font-light text-foreground/70">
          {expiration_time
            ? new Date(expiration_time).toLocaleString()
            : "No expiration"}
        </p>
      ) : (
        <div className="mt-2 max-w-60 space-x-2 flex">
          <DateTimePicker
            value={expiration_time}
            onChange={(date) => setExpiration_time(date)}
            setDefault={expiration_time === undefined}
          />
          {show && (
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setExpiration_time(undefined)}
            >
              <X />
            </Button>
          )}
          <Button className="cursor-pointer" onClick={updateExpirationTime}>
            <SendHorizontal />
          </Button>
        </div>
      )}
    </div>
  );
}
