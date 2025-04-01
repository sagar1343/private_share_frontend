interface Props {
  totalDownloads: number;
}

export default function DownlaodSection({ totalDownloads }: Props) {
  return (
    <div>
      <h2 className="font-semibold flex items-center">Total downloads</h2>
      <p className="text-foreground/70">{totalDownloads}</p>
    </div>
  );
}
