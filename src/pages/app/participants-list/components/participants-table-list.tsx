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

import { MyAlertDialog } from '@/components/MyAlertDialog'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
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

  function updateCachedAttendeesOnDelete(participantIds: number[]) {
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

  function updateAttendeesOnCheckAll(checked: boolean) {
    const attendeesListCache = queryClient.getQueriesData<ParticipantResponse>({
      queryKey: ['participants'],
    })

    attendeesListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<ParticipantResponse>(cacheKey, {
        ...cacheData,
        attendees: cacheData.attendees.map((attendee) => ({
          ...attendee,
          checked,
        })),
      })
    })
  }

  const {
    mutateAsync: attendeeRemoveSelectedFn,
    isPending: isPendingRemoveAttendees,
  } = useMutation({
    mutationFn: removeParticipants,
    async onSuccess(_, attendeeIds) {
      updateCachedAttendeesOnDelete(attendeeIds)
      toast.success('Participantes removidos com sucesso')
    },
    async onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else toast.error('Erro ao remover participantes')
    },
  })

  function handleDeleteSelected() {
    const form = document.getElementById(
      'form_delete_selected_attendees',
    ) as HTMLFormElement

    const formData = new FormData(form)
    const attendeeIds = formData.getAll('attendeeId')

    // attendeeIds.map((id) => console.log(id))
    if (attendeeIds.length === 0) {
      toast.error('Selecione pelo menos um participante')
      return
    }
    const ids = attendeeIds.map((id) => Number(id))

    attendeeRemoveSelectedFn(ids)
  }

  function handleDeleteAteendee(attendeeId: number) {
    attendeeRemoveSelectedFn([attendeeId])
  }

  function handleCheckAll(event: CheckedState) {
    updateAttendeesOnCheckAll(event === true)
  }

  return (
    <>
      <form onSubmit={handleDeleteSelected} id="form_delete_selected_attendees">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  id="checkAll"
                  className="check"
                  onCheckedChange={(e) => handleCheckAll(e)}
                />
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
                      Excluir selecionados
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
            {isFetching || isPendingRemoveAttendees ? (
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
      </form>
    </>
  )
}
