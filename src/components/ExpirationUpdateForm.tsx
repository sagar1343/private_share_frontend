import { DateTimePicker } from "@/components/DateTimePicker";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const expirationMutation = useMutation({
    mutationFn: async (time: Date | undefined) => {
      const response = await api.patch(`api/files/${id}/`, {
        expiration_time: time || null,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setExpiration_time(data.expiration_time);
      setCurrentTimer(data.expiration_time);
      toast.success("Updated expiration timer");
      setShow(false);
      queryClient.invalidateQueries({ queryKey: ["files", { id }] });
    },
    onError: () => {
      toast.error("Failed to update the expiry");
      setShow(false);
    },
  });

  function handleUpdate() {
    if (currentTimer?.toISOString() === expiration_time?.toISOString()) {
      toast.info("No changes detected");
      return;
    }
    expirationMutation.mutate(expiration_time);
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
        disabled={expirationMutation.isPending}
      >
        <X />
      </Button>
      <Button
        className="cursor-pointer"
        onClick={handleUpdate}
        disabled={expirationMutation.isPending}
      >
        <SendHorizontal />
      </Button>
    </div>
  );
}
