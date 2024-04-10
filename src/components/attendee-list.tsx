import { CustomInput } from './CustomInput'
import { ParticipantsTableList } from '../pages/app/participants-list/components/participants-table-list'

export function AttendeeList() {
  return (
    <>
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <CustomInput
          className="pl-10"
          icon="search"
          placeholder="Buscar participante"
        />
      </div>
      <ParticipantsTableList />
    </>
  )
}
