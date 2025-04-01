interface Props {
  maxDownloads: number;
}

export default function MaxDownlaodSection({ maxDownloads }: Props) {
  return (
    <div>
      <h2 className="font-semibold flex items-center">Maximum downloads</h2>
      <p className="text-foreground/70">{maxDownloads}</p>
    </div>
  );
}
