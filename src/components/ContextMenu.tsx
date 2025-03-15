import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface ContextMenuProps {
  children: React.ReactNode;
}

export default function ContextMenuComponent({ children }: ContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
