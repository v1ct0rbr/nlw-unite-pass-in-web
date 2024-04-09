import { Atteendee } from "@/api/get-participansts";
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
import { ParticipantTableInfo } from "./participant-table-info";
import { ParticipantsTableMenu } from "./participants-table-menu";

interface ParticipantsTableListProps {
  attendees?: Atteendee[];
  handleDetails?: () => void;
  handleDelete?: () => void;
}

export function ParticipantsTableList({
  attendees,
  handleDelete,
  handleDetails,
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
        {attendees === undefined || attendees?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Nenhum participante encontrado
            </TableCell>
          </TableRow>
        ) : (
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
                {formatDistanceToNowString(participant.checkedInAt)}
              </TableCell>
              <TableCell className="text-right">
                <ParticipantsTableMenu
                  handleDetails={handleDetails}
                  handleDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
