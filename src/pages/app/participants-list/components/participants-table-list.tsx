import {
  Atteendee,
  ParticipantResponse,
  checkInAttendee,
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
import { formatDistanceToNowString } from '@/lib/dataUtils'
import { useState } from 'react'
/* import { ParticipantTableInfo } from "./participants-table-info"; */

import { ParticipantTableInfo } from './participants-table-info'
import { Skeleton } from '@/components/ui/skeleton'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, CheckCheck, Trash2 } from 'lucide-react'
import { ParticipantDialog } from './participant-detail'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { MyAlertDialog } from '../../../../components/MyAlertDialog'

interface ParticipantsTableListProps {
  attendees?: Atteendee[]
  isFetching?: boolean
}

export function ParticipantsTableList({
  attendees,
  isFetching,
}: ParticipantsTableListProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateCheckInOnCache(participantId: string, checkInDate: Date) {
    const attendeesListCache = queryClient.getQueriesData<ParticipantResponse>({
      queryKey: ['participants'],
    })

    attendeesListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<ParticipantResponse>(cacheKey, {
        ...cacheData,
        attendees: cacheData.attendees.map((attendee) => {
          if (attendee.id === participantId) {
            return { ...attendee, checkedInAt: checkInDate.toISOString() }
          }

          return attendee
        }),
      })
    })
  }

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

  const { mutateAsync: attendeeCheckInFn, isPending } = useMutation({
    mutationFn: checkInAttendee,
    async onSuccess(_, attendeeId) {
      updateCheckInOnCache(attendeeId, new Date())
      setIsDetailsOpen(false)
      toast.success('Check-in realizado com sucesso')
    },
  })

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
                  <Button variant="destructive">
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
                <TableCell>
                  {formatDistanceToNowString(participant.createdAt)}
                </TableCell>
                <TableCell>
                  {participant.checkedInAt
                    ? formatDistanceToNowString(participant.checkedInAt)
                    : '--'}
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    {participant.checkedInAt ? (
                      <Button
                        size="sm"
                        className="text-green-500"
                        variant="outline"
                        disabled={true}
                        title="Checkin já foi realizado"
                      >
                        <CheckCheck size={16} />
                      </Button>
                    ) : (
                      <Dialog
                        open={isDetailsOpen}
                        onOpenChange={setIsDetailsOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="text-green-500"
                            variant="secondary"
                          >
                            <Check size={16} />
                          </Button>
                        </DialogTrigger>
                        <ParticipantDialog
                          open={isDetailsOpen}
                          participantId={participant.id}
                          checkInFn={attendeeCheckInFn}
                          isPending={isPending}
                        />
                      </Dialog>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <MyAlertDialog
                        title="Atenção"
                        description={`Deseja excluir o participante "${participant.name}"?`}
                        handleAction={() =>
                          handleDeleteAteendee(participant.id)
                        }
                      />
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}
