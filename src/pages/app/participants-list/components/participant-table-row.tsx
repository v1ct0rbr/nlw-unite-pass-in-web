import { Atteendee } from '@/api/participants'
import { Checkbox } from '@/components/ui/checkbox'
import { TableCell, TableRow } from '@/components/ui/table'
import { ParticipantTableInfo } from './participants-table-info'
import { formatDistanceToNowString } from '@/lib/dataUtils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCheck, SquarePen, Trash2 } from 'lucide-react'
import { ParticipantDialog } from './participant-detail'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { MyAlertDialog } from '@/components/MyAlertDialog'
import { useState } from 'react'

interface ParticipantTableRowProps {
  participant: Atteendee
  handleDeleteAteendee: (attendeeId: string) => void
}

export function ParticipantTableRow({
  participant,
  handleDeleteAteendee,
}: ParticipantTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  function handleChangeDetailsOpen() {
    setIsDetailsOpen((state) => !state)
  }

  return (
    <TableRow key={participant.id}>
      <TableCell>
        <Checkbox className="check" />
      </TableCell>
      <TableCell>{participant.id}</TableCell>
      <TableCell className="font-medium">
        <ParticipantTableInfo
          name={participant.name}
          email={participant.email}
        />{' '}
      </TableCell>
      <TableCell>{formatDistanceToNowString(participant.createdAt)}</TableCell>
      <TableCell>
        {participant.checkedInAt
          ? formatDistanceToNowString(participant.checkedInAt)
          : '--'}
      </TableCell>
      <TableCell className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Dialog onOpenChange={handleChangeDetailsOpen}>
            <DialogTrigger asChild>
              {participant.checkedInAt ? (
                <Button
                  size="sm"
                  className="text-green-500"
                  variant="outline"
                  title="Checkin já foi realizado"
                >
                  <CheckCheck size={16} />
                </Button>
              ) : (
                <Button size="sm" variant="outline">
                  <SquarePen size={16} />
                </Button>
              )}
            </DialogTrigger>
            <ParticipantDialog
              open={isDetailsOpen}
              participantId={participant.id}
              allowCheckIn={participant.checkedInAt === null}
            />
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" className="text-red-600" variant="outline">
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <MyAlertDialog
              title="Atenção"
              description={`Deseja excluir o participante "${participant.name}"?`}
              handleAction={() => handleDeleteAteendee(participant.id)}
            />
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )
}
