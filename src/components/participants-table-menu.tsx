import { EllipsisIcon, Trash2, User2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";

interface ParticipantTableMenuProps {
  handleDetails: () => void;
  handleDelete: () => void;
}

export function ParticipantsTableMenu({
  handleDetails,
  handleDelete,
}: ParticipantTableMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button variant="ghost">
          <EllipsisIcon size={24} />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDetails}>
          <User2Icon size={16} className="mr-2" />
          Detalhes
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDelete}>
          <Trash2 size={16} className="mr-2" />
          Excluir
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
