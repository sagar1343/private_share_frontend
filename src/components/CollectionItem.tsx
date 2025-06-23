import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useUpdateCollection } from "@/services/collectionService";
import { Color, type ICollection } from "@/types/Collection";
import { Check, Edit, ExternalLink, Folder, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionRenameDialog from "./CollectionRenameDialog";
import DeleteCollectionDialog from "./DeleteCollectionModal";

interface Props {
  collection: ICollection;
}

const colorMap: Record<string, string> = {
  [Color.YELLOW]: "#f5a623",
  [Color.RED]: "#e00",
  [Color.GREEN]: "#22c55e",
  [Color.PURPLE]: "#a855f7",
  [Color.PINK]: "#ff0080",
  [Color.BLUE]: "#0389FA",
};

export default function CollectionItem({ collection }: Props) {
  const navigate = useNavigate();
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [optimisticColor, setOptimisticColor] = useState<Color | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const updateCollectionMutation = useUpdateCollection();

  useEffect(() => {
    if (optimisticColor && collection.color === optimisticColor) {
      setOptimisticColor(null);
    }
  }, [collection.color, optimisticColor]);

  function handleDoubleClick() {
    if (!updateCollectionMutation.isPending) {
      navigate(`/dashboard/collections/${collection.id}`);
    }
  }

  function handleColorChange(color: Color) {
    setOptimisticColor(color);

    updateCollectionMutation.mutate(
      {
        userId: collection.user,
        collectionId: collection.id,
        data: { color },
      },
      {
        onError: () => {
          setOptimisticColor(null);
        },
      }
    );
  }

  const currentColor = optimisticColor
    ? colorMap[optimisticColor]
    : collection.color
    ? colorMap[collection.color]
    : colorMap[Color.BLUE];

  const handleOpen = () => {
    navigate(`/dashboard/collections/${collection.id}`);
  };

  const handleRename = () => {
    setIsRenameDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDialogOpen(true);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <li className="relative rounded-lg transition-all group select-none">
          <figure
            className="flex flex-col items-center cursor-pointer rounded-lg p-3 hover:bg-accent/50 transition-colors"
            onDoubleClick={handleDoubleClick}
            onTouchEnd={(e) => {
              e.preventDefault();
              setShowMobileMenu(true);
            }}
          >
            <Folder
              size={80}
              fill={currentColor}
              stroke="0"
              className="drop-shadow-sm transition-all group-hover:scale-105"
            />
            <figcaption className="max-w-[80px] capitalize overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium mt-2 text-center">
              {collection.title}
            </figcaption>
          </figure>

          {showMobileMenu && (
            <div
              className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center"
              onClick={() => setShowMobileMenu(false)}
            >
              <div
                className="bg-background border rounded-lg shadow-lg p-2 min-w-[200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 p-3 border-b">
                  <Folder size={24} fill={currentColor} stroke="0" />
                  <span className="font-medium">{collection.title}</span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleOpen();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </button>

                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleRename();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Rename
                  </button>

                  <div className="px-3 py-2">
                    <div className="text-xs text-muted-foreground mb-2">Color</div>
                    <div className="space-y-1">
                      {Object.entries(Color).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => {
                            handleColorChange(value);
                            setShowMobileMenu(false);
                          }}
                          disabled={updateCollectionMutation.isPending}
                          className="w-full flex items-center gap-3 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors focus:outline-none focus:bg-accent disabled:opacity-50"
                        >
                          <div
                            className="relative w-3 h-3 rounded-full border border-border flex-shrink-0"
                            style={{ backgroundColor: colorMap[value] }}
                          >
                            {(optimisticColor ? optimisticColor : collection.color) === value && (
                              <Check className="w-2.5 h-2.5 text-white absolute inset-0 m-auto drop-shadow-sm" />
                            )}
                          </div>
                          <span className="capitalize">{value.toLowerCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleDelete();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </li>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={handleOpen} className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Open
        </ContextMenuItem>

        <ContextMenuItem onClick={handleRename} className="gap-2">
          <Edit className="w-4 h-4" />
          Rename
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger className="gap-2">
            <div
              className="w-3 h-3 rounded-full border border-border"
              style={{ backgroundColor: currentColor }}
            />
            Color
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="p-2">
            <div className="space-y-1">
              {Object.entries(Color).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleColorChange(value)}
                  disabled={updateCollectionMutation.isPending}
                  className="w-full flex items-center gap-3 px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors focus:outline-none focus:bg-accent disabled:opacity-50"
                >
                  <div
                    className="relative w-3 h-3 rounded-full border border-border flex-shrink-0"
                    style={{ backgroundColor: colorMap[value] }}
                  >
                    {(optimisticColor ? optimisticColor : collection.color) === value && (
                      <Check className="w-2.5 h-2.5 text-white absolute inset-0 m-auto drop-shadow-sm" />
                    )}
                  </div>
                  <span className="capitalize">{value.toLowerCase()}</span>
                </button>
              ))}
            </div>
            {updateCollectionMutation.isPending && (
              <div className="text-xs text-muted-foreground mt-2 text-center">Updating...</div>
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuItem onClick={handleDelete} className="gap-2">
          <Trash2 className="w-4 h-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>

      <DeleteCollectionDialog
        collectionId={collection.id}
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      />
      <CollectionRenameDialog
        open={isRenameDialogOpen}
        onOpenChange={setIsRenameDialogOpen}
        collection={collection}
      />
    </ContextMenu>
  );
}
