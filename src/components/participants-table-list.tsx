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

type Participant = {
  code: string;
  name: string;
  email: string;
  inscriptionDate: string;
  checkInDate: string;
};

const participants = [
  {
    code: "001",
    name: "John Doe",
    email: "johndoe@gmail.com",
    inscriptionDate: "2021-10-01",
    checkInDate: "2021-10-01",
  },
  {
    code: "002",
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    inscriptionDate: "2021-10-01",
    checkInDate: "2021-10-01",
  },
  {
    code: "003",
    name: "Alice Smith",
    email: "alice.smith@gmail.com",
    inscriptionDate: "2021-10-02",
    checkInDate: "2021-10-02",
  },
  {
    code: "004",
    name: "Bob Johnson",
    email: "bob.johnson@gmail.com",
    inscriptionDate: "2021-10-02",
    checkInDate: "2021-10-02",
  },
  {
    code: "005",
    name: "Eva Davis",
    email: "eva.davis@gmail.com",
    inscriptionDate: "2021-10-03",
    checkInDate: "2021-10-03",
  },
  {
    code: "006",
    name: "Michael Wilson",
    email: "michael.wilson@gmail.com",
    inscriptionDate: "2021-10-03",
    checkInDate: "2021-10-03",
  },
  {
    code: "007",
    name: "Olivia Taylor",
    email: "olivia.taylor@gmail.com",
    inscriptionDate: "2021-10-04",
    checkInDate: "2021-10-04",
  },
  {
    code: "008",
    name: "William Anderson",
    email: "william.anderson@gmail.com",
    inscriptionDate: "2021-10-04",
    checkInDate: "2021-10-04",
  },
  {
    code: "009",
    name: "Sophia Martinez",
    email: "sophia.martinez@gmail.com",
    inscriptionDate: "2021-10-05",
    checkInDate: "2021-10-05",
  },
  {
    code: "010",
    name: "James Brown",
    email: "james.brown@gmail.com",
    inscriptionDate: "2021-10-05",
    checkInDate: "2021-10-05",
  },
  {
    code: "011",
    name: "Emma Thompson",
    email: "emma.thompson@gmail.com",
    inscriptionDate: "2021-10-06",
    checkInDate: "2021-10-06",
  },
  {
    code: "012",
    name: "Alexander Clark",
    email: "alexander.clark@gmail.com",
    inscriptionDate: "2021-10-06",
    checkInDate: "2021-10-06",
  },
] as Participant[];

export function ParticipantsTableList() {
  const [allChecked, setAllChecked] = useState(false);

  function handleDetails() {
    console.log("Details");
  }
  function handleDelete() {
    console.log("Delete");
  }
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
          {participants.map((participant) => (
            <TableRow key={participant.code}>
              <TableCell>
                <Checkbox className="check" checked={allChecked} />
              </TableCell>
              <TableCell>{participant.code}</TableCell>
              <TableCell className="font-medium">
                <ParticipantTableInfo
                  name={participant.name}
                  email={participant.email}
                />{" "}
              </TableCell>
              <TableCell>
                {formatDistanceToNowString(participant.inscriptionDate)}
              </TableCell>
              <TableCell>
                {formatDistanceToNowString(participant.checkInDate)}
              </TableCell>
              <TableCell className="text-right">
                <ParticipantsTableMenu
                  handleDetails={handleDetails}
                  handleDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    
  );
}
