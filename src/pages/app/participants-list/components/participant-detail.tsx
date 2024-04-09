import {getParticipantBadge } from "@/api/participants";
import { Button } from "@/components/ui/button";


import {DialogContent, DialogHeader, DialogTitle,  } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";


interface ParticipantDialogProps {
    participantId: string
    open: boolean
}

export function ParticipantDialog({participantId, open}: ParticipantDialogProps) {

    const { data: orderDetails } = useQuery({
        queryKey: ['attendee_event', participantId],
        queryFn: () => getParticipantBadge(participantId),
        enabled: open,
        staleTime: 10000,
      })

    return (
        <div>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {orderDetails ? (
                <div className="flex items-center justify-between"><span> <b>Evento:</b> {orderDetails?.badge.eventTitle}</span></div>
            ): (
                <div className="flex items-center "><b>Evento:</b> <Skeleton className="h-4 w-[250px]" /></div>
            
            )}
            
            
            </DialogTitle>
          
        </DialogHeader>
        {orderDetails ? (
             <div className="space-y-6">
             <Table>
               <TableRow>
                 <TableCell className="text-foreground">Nome do participante</TableCell>
                 <TableCell className="flex justify-end">
                   <div className="flex items-center gap-2">
                     <span className="font-medium text-muted-foreground">
                       {orderDetails?.badge.name}
                     </span>
                   </div>
                 </TableCell>
               </TableRow>
               <TableRow>
                 <TableCell className="text-foreground">E-mail</TableCell>
                 <TableCell className="flex justify-end">
                   <div className="flex items-center gap-2">
                     <span className="font-medium text-muted-foreground">
                       {orderDetails?.badge.email ?? 'Não informado'}
                     </span>
                   </div>
                 </TableCell>
               </TableRow>  
              
               
             </Table>
             <div className="w-full flex items-center justify-center">
             <Button variant="secondary">Fazer check-in</Button>
             </div>
            
           </div>) : (
             <div className="space-y-6">
             <Table>
               <TableRow>
                 <TableCell className="text-foreground">Nome do participante</TableCell>
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
           )
        }
       
      </DialogContent>
    </div>
      
    )
}