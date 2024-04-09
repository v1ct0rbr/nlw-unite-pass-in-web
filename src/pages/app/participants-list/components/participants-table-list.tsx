import { Atteendee } from "@/api/participants";
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
import { ParticipantsTableMenu } from "./participants-table-menu";
import { ParticipantTableInfo } from "./participants-table-info";
import { Skeleton } from "@/components/ui/skeleton";

interface ParticipantsTableListProps {
  attendees?: Atteendee[];
  isFetching?: boolean;
  handleDetails?: () => void;
  handleDelete?: () => void;
  handleCheckIn?: (attendee: Atteendee) => void
  handleCancelCheckIn?: (attendee: Atteendee) => void
}

export function ParticipantsTableList({
  attendees,
  handleDelete,
  handleDetails,
  isFetching,
 
}: ParticipantsTableListProps) {
  const [allChecked, setAllChecked] = useState(false);

  function handleCheckAll() {
    setAllChecked(!allChecked);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox id="checkAll" onChange={handleCheckAll} />
          </TableHead>
          <TableHead>Código</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Data da Inscrição</TableHead>
          <TableHead>Data do Check-in</TableHead>
          <TableHead className="text-right"></TableHead>
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
                <TableCell className="text-right">
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
                <Checkbox className="check" checked={allChecked} />
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
              <TableCell className="text-right">
                <ParticipantsTableMenu
                  handleDetails={handleDetails}
                  handleDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
