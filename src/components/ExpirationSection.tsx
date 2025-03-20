import InfoButton from "./InfoButton";

export default function ExpirationSection({ date }: { date: string }) {
  return (
    <div>
      <h2 className="font-semibold flex items-center gap-2">
        Expiration date{" "}
        <InfoButton
          message=" When the file will get expires, the file will be deleted and link
              will no longer work."
        />
      </h2>
      <p className="font-light text-foreground/70">
        {new Date(date).toDateString()}
      </p>
    </div>
  );
}
