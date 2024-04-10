import {
  ParticipantResponse,
  checkInAttendee,
  getParticipantBadge,
} from '@/api/participants'
import { Button } from '@/components/ui/button'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableCell, TableRow } from '@/components/ui/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface ParticipantDialogProps {
  participantId: string
  open: boolean
  allowCheckIn: boolean
}

export function ParticipantDialog({
  participantId,
  open,
  allowCheckIn,
}: ParticipantDialogProps) {
  const queryClient = useQueryClient()

  const { data: attendeeDetails } = useQuery({
    queryKey: ['attendee_event', participantId],
    queryFn: () => getParticipantBadge(participantId),
    enabled: open,
    staleTime: 1000,
  })

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

  const { mutateAsync: attendeeCheckInFn, isPending: isPendingChecking } =
    useMutation({
      mutationFn: checkInAttendee,
      async onSuccess(_, attendeeId) {
        updateCheckInOnCache(attendeeId, new Date())
        toast.success('Check-in realizado com sucesso')
      },
    })

  function handleCheckIn() {
    attendeeCheckInFn(participantId)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {attendeeDetails ? (
            <div className="flex items-center gap-2">
              <b>Evento:</b>
              <span> {attendeeDetails?.badge.eventTitle}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <b>Evento:</b>
              <span>
                <Skeleton className="h-4 w-[250px]" />
              </span>
            </div>
          )}
        </DialogTitle>
      </DialogHeader>
      {attendeeDetails ? (
        <div className="space-y-6">
          <Table>
            <TableRow>
              <TableCell className="text-foreground">
                Nome do participante
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {attendeeDetails?.badge.name}
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {attendeeDetails?.badge.email ?? 'Não informado'}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </Table>
          <div className="w-full flex items-center justify-center">
            {allowCheckIn ? (
              <Button
                variant="secondary"
                onClick={handleCheckIn}
                disabled={isPendingChecking}
              >
                {isPendingChecking ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Realizando check-in...</span>
                  </div>
                ) : (
                  'Fazer check-in'
                )}
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Checking realizado!
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Table>
            <TableRow>
              <TableCell className="text-foreground">
                Nome do participante
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    <Skeleton className="h-4 w-[250px]" />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </Table>
          <div className="w-full flex items-center justify-center">
            <Skeleton className="h-10 w-[250px]" />
          </div>
        </div>
      )}
    </DialogContent>
  )
}
