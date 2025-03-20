import { useEffect, useState } from "react";
import InfoButton from "./InfoButton";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";

export default function FilePermissions({ fileId }: { fileId: number }) {
  const [isEdit, setEdit] = useState(false);
  useFetch(`api/files/${fileId}/permissions`);

  return (
    <div>
      <h2 className="font-semibold flex items-center gap-2">
        Set file permissions
        <InfoButton message="Grant permission to limited users only." />
        {!isEdit && (
          <Button
            onClick={() => setEdit(true)}
            variant="link"
            className="cursor-pointer"
          >
            Edit
          </Button>
        )}
      </h2>
      <div>
        
      </div>
    </div>
  );
}
