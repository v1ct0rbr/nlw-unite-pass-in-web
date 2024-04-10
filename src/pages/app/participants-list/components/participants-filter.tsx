import { CustomInput } from '@/components/CustomInput'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const TableFilterSchema = z.object({
  participantName: z.string().optional(),
})

type FilterType = z.infer<typeof TableFilterSchema>

/* const eventId = "9e9bd979-9d10-4915-b339-3786b1634f33"; */

export function ParticipantsFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const participantName = searchParams.get('participantName')

  const {
    /* reset, */
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FilterType>({
    resolver: zodResolver(TableFilterSchema),
    defaultValues: {
      participantName: participantName ?? '',
    },
  })

  /*  function handleClearFilters() {
        setSearchParams((state) => {
          state.delete('participantName')          
          state.set('page', '1')
          return state
        })
        reset(
          {
             participantName: '',            
          },
          { keepDefaultValues: true },
        )
      } */

  function handleSubmitFilter({ participantName }: FilterType) {
    setSearchParams((state) => {
      state.set('page', '1')
      if (participantName) state.set('participantName', participantName)
      else state.delete('participantName')

      return state
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitFilter)}>
      <Controller
        control={control}
        name="participantName"
        render={({ field: { name, onChange, value } }) => (
          <CustomInput
            className="pl-10"
            name={name}
            icon="search"
            disabled={isSubmitting}
            placeholder="Buscar participante"
            value={value ?? ''}
            onChange={onChange}
          />
        )}
      />
    </form>
  )
}
