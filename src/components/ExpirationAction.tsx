import { Button } from "@/components/ui/button";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ExpirationAction({ show, setShow }: Props) {
  return (
    <>
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
    </>
  );
}
