interface Props {
  heading: string;
  content?: string;
}

export default function Heading({ heading, content }: Props) {
  return (
    <div>
      <h1 className="capitalize text-3xl font-bold">{heading}</h1>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
}
