import CircularProgressIndicator from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import { fetchCollections } from "@/services/collectionService";
import { ICollection } from "@/types/Collection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check, ChevronsUpDown, Upload } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props {
  collectionId?: number;
  customTrigger?: React.ReactNode;
}

export default function FileUploadAction({ collectionId, customTrigger }: Props) {
  const queryClient = useQueryClient();
  const { authenticatedUser } = useAuthContext();
  const [isOpen, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<number | undefined>(collectionId);
  const [_file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadComplete) {
      const timer = setTimeout(() => {
        setOpen(false);
        setUploadComplete(false);
        setProgress(0);
        setFile(null);
        setSelectedCollection(collectionId);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [uploadComplete, collectionId]);

  const upload = useMutation({
    mutationKey: ["upload"],
    mutationFn: async (file: File) => {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("file_name", file.name);
      formdata.append("collection", String(selectedCollection));
      return await api.post("/api/files/", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress(progressEvent) {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setProgress(percent);
          }
        },
      });
    },
    onSuccess: (res) => {
      toast.success("File uploaded successfully");
      setUploadComplete(true);
      queryClient.invalidateQueries();
      setTimeout(
        () => navigate(`/dashboard/collections/${res.data.collection}/files/${res.data.id}`),
        1000
      );
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError ? error.response?.data.file : "Failed to upload the file"
      );
    },
  });

  function onDrop(acceptedFiles: File[], fileRejection: FileRejection[]) {
    if (!selectedCollection) {
      toast.info("Please select collection first");
      return;
    }
    if (fileRejection.length) {
      const error = fileRejection[0]?.errors[0];
      toast.error(error?.message || "File upload failed");
      return;
    }
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setFileName(file.name);
    setFile(file);
    setProgress(0);
    setUploadComplete(false);
    upload.mutate(file);
  }

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: upload.isPending,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {customTrigger ? (
          customTrigger
        ) : (
          <Button size="default">
            <Upload className="size-4" /> Upload File
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        {upload.isPending || uploadComplete ? (
          <div className="flex flex-col items-center justify-center w-full py-10">
            <CircularProgressIndicator
              progress={progress}
              fileName={fileName || ""}
              complete={uploadComplete}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full mt-4">
            {!collectionId && (
              <div>
                <CollectionComboBox
                  userId={authenticatedUser?.id!}
                  value={selectedCollection}
                  onChange={setSelectedCollection}
                />
              </div>
            )}
            <div
              {...getRootProps()}
              className={
                "flex flex-col items-center justify-center w-full min-h-[250px] border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 " +
                (isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/30 bg-muted/50 hover:bg-muted/80 hover:border-muted-foreground/50")
              }
            >
              <div
                className={
                  "flex flex-col items-center justify-center pt-5 pb-6 " +
                  (isDragActive ? "text-primary" : "text-muted-foreground")
                }
              >
                <Upload
                  className={
                    "size-16 mb-4 " + (isDragActive ? "text-primary" : "text-muted-foreground/70")
                  }
                />
                <p className="mb-2 text-sm font-medium">
                  <span className="font-semibold">
                    {isDragActive ? "Drop the file here" : "Click to upload"}
                  </span>
                  {!isDragActive && " or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG, PDF etc. (MAX SIZE 100MB)
                </p>
              </div>
              <input {...getInputProps()} className="hidden" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CollectionComboBox({
  userId,
  value,
  onChange,
}: {
  userId: number;
  value?: number;
  onChange: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<ICollection[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadCollections = useCallback(
    async (searchTerm: string, pageNum: number) => {
      setLoading(true);
      try {
        const data = await fetchCollections(userId, pageNum, searchTerm);
        if (pageNum === 1) {
          setOptions(data.results);
        } else {
          setOptions((prev) => [...prev, ...data.results]);
        }
        setHasMore(Boolean(data.next));
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    loadCollections(search, 1);
    setPage(1);
  }, [search, loadCollections]);

  const handleSelect = (id: number) => {
    onChange(id);
    setOpen(false);
  };

  const selected = options.find((col) => col.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected ? selected.title : "Select Collection"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search collections..."
            value={search}
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No collections found.</CommandEmpty>
            <CommandGroup>
              {options.map((col) => (
                <CommandItem key={col.id} value={col.title} onSelect={() => handleSelect(col.id)}>
                  <Check
                    className={"h-4 w-4 " + (col.id === value ? "opacity-100" : "opacity-0")}
                  />
                  {col.title}
                </CommandItem>
              ))}
              {hasMore && (
                <CommandItem
                  disabled={loading}
                  onSelect={() => {
                    if (!loading && hasMore) {
                      const nextPage = page + 1;
                      setPage(nextPage);
                      loadCollections(search, nextPage);
                    }
                  }}
                >
                  {loading ? "Loading..." : "Load more"}
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
