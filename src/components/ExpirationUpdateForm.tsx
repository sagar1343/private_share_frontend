import { DateTimePicker } from "@/components/DateTimePicker";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Params, useParams } from "react-router";
import { toast } from "sonner";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  expiration_time: Date | undefined;
  setExpiration_time: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function ExpirationUpdateForm({
  expiration_time,
  setExpiration_time,
  setShow,
}: Props) {
  const { id }: Params = useParams();
  const [currentTimer, setCurrentTimer] = useState(expiration_time);

  async function updateExpirationTime() {
    if (currentTimer === expiration_time) {
      toast.info("No changes detected");
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
    <div className="mt-2 max-w-60 space-x-2 flex">
      <DateTimePicker
        value={expiration_time}
        onChange={(date) => setExpiration_time(date)}
        setDefault={expiration_time === undefined}
      />
      <Button
        variant="secondary"
        className="cursor-pointer"
        onClick={() => setExpiration_time(undefined)}
      >
        <X />
      </Button>
      <Button className="cursor-pointer" onClick={updateExpirationTime}>
        <SendHorizontal />
      </Button>
    </div>
  );
}
