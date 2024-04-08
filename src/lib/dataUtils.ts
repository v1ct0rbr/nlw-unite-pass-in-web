import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'


const currentLocale = ptBR

export function formatDateString(date: string) {
  return format(new Date(date), 'dd/MM/yyyy', {locale: currentLocale})
}

export function formatDistanceToNowString(date: string) {
  return formatDistanceToNow(new Date(date), {locale: currentLocale, addSuffix: true})
}