import {
  Atteendee,
  ParticipantResponse,
  removeParticipants,
} from '@/api/participants'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Skeleton } from '@/components/ui/skeleton'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { MyAlertDialog } from '@/components/MyAlertDialog'
import { ParticipantTableRow } from './participant-table-row'

interface ParticipantsTableListProps {
  attendees?: Atteendee[]
  isFetching?: boolean
}

export function ParticipantsTableList({
  attendees,
  isFetching,
}: ParticipantsTableListProps) {
  const queryClient = useQueryClient()

  function updateCachedAttendeesOnDelete(participantIds: string[]) {
    const attendeesListCache = queryClient.getQueriesData<ParticipantResponse>({
      queryKey: ['participants'],
    })

    attendeesListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<ParticipantResponse>(cacheKey, {
        ...cacheData,
        attendees: cacheData.attendees.filter(
          (attendee) => !participantIds.includes(attendee.id),
        ),
      })
    })
  }

  const { mutateAsync: attendeeRemoveSelectedFn } = useMutation({
    mutationFn: removeParticipants,
    async onSuccess(_, attendeeIds) {
      updateCachedAttendeesOnDelete(attendeeIds)
      toast.success('Participantes removidos com sucesso')
    },
    async onError(error) {
      toast.error(error.message)
    },
  })

  function handleDeleteSelected() {
    const selectedAttendees =
      document.querySelectorAll<HTMLInputElement>('.check:checked')
    const attendeeIds = Array.from(selectedAttendees).map(
      (attendee) => attendee.id,
    )
    attendeeRemoveSelectedFn(attendeeIds)
  }

  function handleDeleteAteendee(attendeeId: string) {
    attendeeRemoveSelectedFn([attendeeId])
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox id="checkAll" className="check" />
            </TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Data da Inscrição</TableHead>
            <TableHead>Data do Check-in</TableHead>
            <TableHead className="text-right w-[100px]">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-600">
                    <Trash2 size={16} />
                    {'    '}Excluir selecionados
                  </Button>
                </AlertDialogTrigger>
                <MyAlertDialog
                  title="Atenção"
                  description="Deseja excluir os participantes selcionados?"
                  handleAction={handleDeleteSelected}
                />
              </AlertDialog>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell></TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[30px]" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              </TableRow>
            ))
          ) : attendees === undefined || attendees?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nenhum participante encontrado
              </TableCell>
            </TableRow>
          ) : (
            attendees.map((participant) => (
              <ParticipantTableRow
                handleDeleteAteendee={handleDeleteAteendee}
                participant={participant}
                key={participant.id}
              />
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}
