import { Button } from "@/components/ui/button";

interface Props {
  editLabel?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FileActionButton({ show, setShow, editLabel }: Props) {
  return (
    <>
      {!show ? (
        <Button
          onClick={() => setShow(true)}
          variant="link"
          className="cursor-pointer"
        >
          {editLabel ?? "Edit"}
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
    </>
  );
}
