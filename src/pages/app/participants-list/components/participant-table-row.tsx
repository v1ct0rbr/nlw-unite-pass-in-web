import { Atteendee, ParticipantResponse } from '@/api/participants'
import { MyAlertDialog } from '@/components/MyAlertDialog'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDistanceToNowString } from '@/lib/dataUtils'
import { useQueryClient } from '@tanstack/react-query'
import { CheckCheck, SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ParticipantDialog } from './participant-detail'
import { ParticipantTableInfo } from './participants-table-info'

interface ParticipantTableRowProps {
  participant: Atteendee
  handleDeleteAteendee: (attendeeId: number) => void
}

export function ParticipantTableRow({
  participant,
  handleDeleteAteendee,
}: ParticipantTableRowProps) {
  const queryClient = useQueryClient()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  function handleChangeDetailsOpen() {
    setIsDetailsOpen((state) => !state)
  }

  function updateAttendeeOnCheckBoxChange(attendeeId: number) {
    const attendeesListCache = queryClient.getQueriesData<ParticipantResponse>({
      queryKey: ['participants'],
    })

    attendeesListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<ParticipantResponse>(cacheKey, {
        ...cacheData,
        attendees: cacheData.attendees.map((attendee) =>
          attendee.id === attendeeId
            ? { ...attendee, checked: !attendee.checked }
            : attendee,
        ),
      })
    })
  }

  function handleCheckBoxChange(attendeeId: number) {
    updateAttendeeOnCheckBoxChange(attendeeId)
  }

  return (
    <TableRow key={participant.id}>
      <TableCell>
        <Checkbox
          name="attendeeId"
          onCheckedChange={() => handleCheckBoxChange(participant.id)}
          checked={participant.checked ? participant.checked : false}
          value={participant.id}
          className="check"
        />
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
