// eslint-disable @typescript-eslint/unkn
import { Link, useRouteError } from 'react-router-dom'

const ERROR_TYPES = [
  {
    code: 404,
    message: 'Página não encontrada',
  },
  {
    code: 500,
    message: 'Erro interno do servidor',
  },
]

type Error = {
  status: number
}

export function ErrorPage() {
  const error = useRouteError() as Error

  const getMessageByCode = (code: number) => {
    return ERROR_TYPES.find((err) => err.code === code)?.message
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">{getMessageByCode(error.status)}</h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-400 dark:text-sky-600">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
