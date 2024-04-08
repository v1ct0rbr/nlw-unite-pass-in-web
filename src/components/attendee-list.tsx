import { CustomInput } from "./CustomInput";
import { ParticipantsTableList } from "./participants-table-list";

export function AttendeeList() {
  return (
    <>
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <CustomInput
          className="pl-10"
          name="search"
          placeholder="Buscar participante"
        />
      </div>
      <ParticipantsTableList />
    </>
  );
}
