import { Input } from "@/components/ui/input";
import { CollectionFormData } from "@/types/CollectionFormData";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues?: CollectionFormData | null;
  onSubmit: (data: CollectionFormData) => Promise<void>;
}

export default function CollectionInput({
  defaultValues = null,
  onSubmit,
}: Props) {
  const { register, handleSubmit } = useForm<CollectionFormData>({
    defaultValues: defaultValues ?? { title: "" },
  });

  const handleFormSubmit = async (data: CollectionFormData) => {
    const formattedData = {
      ...data,
      title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
    };
    await onSubmit(formattedData);
  };

  return (
    <figure className="flex flex-col items-center">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          {...register("title")}
          autoFocus
          className="max-w-[100px] focus-visible:ring-0"
        />
      </form>
    </figure>
  );
}
