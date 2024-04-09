import { Atteendee } from "@/api/participants";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ParticipantDialogProps {
    attendee: Atteendee;
    handleCheckIn?: (attendee: Atteendee) => void;
}

export function ParticipantDialog({attendee, handleCheckIn}: ParticipantDialogProps) {
    return (
        <Dialog>
        <ContextMenu>
          <ContextMenuTrigger>Right click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Open</ContextMenuItem>
            <ContextMenuItem>Download</ContextMenuItem>
            <DialogTrigger asChild>
              <ContextMenuItem>
                <span>Delete</span>
              </ContextMenuItem>
            </DialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this file from our servers?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => handleCheckIn && handleCheckIn(attendee)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    )
}