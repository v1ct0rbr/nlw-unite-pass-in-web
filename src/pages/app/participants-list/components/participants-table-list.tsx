import { Atteendee, ParticipantResponse } from "@/api/participants";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNowString } from "@/lib/dataUtils";
import { useState } from "react";
/* import { ParticipantTableInfo } from "./participants-table-info"; */

import { ParticipantTableInfo } from "./participants-table-info";
import { Skeleton } from "@/components/ui/skeleton";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, CheckCheck } from "lucide-react";
import { ParticipantDialog } from "./participant-detail";
import { useQueryClient } from "@tanstack/react-query";



interface ParticipantsTableListProps {
  attendees?: Atteendee[];
  isFetching?: boolean;

}

export function ParticipantsTableList({
  attendees, 
  isFetching,
 
}: ParticipantsTableListProps) {
  
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()
  
  function updateOrderStatusOnCache(participantId: string, checkInDate: Date) {
    const ordersListCache = queryClient.getQueriesData<ParticipantResponse>({
      queryKey: ['participants'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<ParticipantResponse>(cacheKey, {
        ...cacheData,
        attendees: cacheData.attendees.map((attendee) => {
          if (attendee.id === participantId) {
            return { ...attendee, checkedInAt: checkInDate.toISOString()}
          }

          return attendee
        }),
      })
    })
  }

  /* const { mutateAsync: aproveOrderFn, isPending: isAprovingOrder } =
  useMutation({
    mutationFn: aproveOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  }) */

  return (
    <>
     <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox id="checkAll" />
          </TableHead>
          <TableHead>Código</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Data da Inscrição</TableHead>
          <TableHead>Data do Check-in</TableHead>
          <TableHead className="text-right w-[100px]">
            <Button variant="destructive" >
              <Check size={16} />
              Check-in de selecionados
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching ? (
            Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>                 
                </TableCell>
                <TableCell><Skeleton className="h-4 w-[30px]" /></TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  </TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              </TableRow>
          ))) : 
          attendees === undefined || attendees?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nenhum participante encontrado
              </TableCell>
            </TableRow>
          ) :           
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
                />{" "}
              </TableCell>
              <TableCell>
                {formatDistanceToNowString(participant.createdAt)}
              </TableCell>
              <TableCell>
                {participant.checkedInAt ? formatDistanceToNowString(participant.checkedInAt) : "--"}                            
              </TableCell>
              <TableCell className="flex items-center justify-center">
              {participant.checkedInAt ? (
                 <Button className=" text-green-500" variant="outline" disabled={true} title="Checkin já foi realizado">
                 <CheckCheck size={16}  />                        
                  </Button>
              ) : (
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogTrigger asChild>
                    <Button className="text-green-500" variant="secondary">
                       <Check size={16}  />                        
                        </Button>
                        </DialogTrigger>
                  <ParticipantDialog open={isDetailsOpen} participantId={participant.id} />
                </Dialog>
              )
              
              }  
              
               
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
   
    </>
   

  );
}
