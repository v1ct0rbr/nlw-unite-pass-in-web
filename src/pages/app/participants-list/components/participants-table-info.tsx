interface ParticipantTableInfoProps {
  name: string
  email: string
}

export function ParticipantTableInfo({
  name,
  email,
}: ParticipantTableInfoProps) {
  return (
    <div className="flex flex-col">
      <b className="font-semibold text-[14px] text-foreground">{name}</b>
      <span className="text-xs">{email}</span>
    </div>
  )
}
