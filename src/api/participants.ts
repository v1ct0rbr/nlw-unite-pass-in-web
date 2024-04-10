import { api } from '@/lib/axios'

export type Atteendee = {
  checked?: boolean
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string
}

export interface ParticipantResponse {
  attendees: Atteendee[]
  total: number
}

export type AttendeeBadge = {
  name: string
  email: string
  eventTitle: string
  checkInURL: string
}

interface ParticipanteBadgeResponse {
  badge: AttendeeBadge
}

export interface ParticipantsQuery {
  eventId: string
  pageIndex?: number | null
  query?: string | null
}

export async function getAttendees({
  eventId,
  pageIndex,
  query,
}: ParticipantsQuery) {
  const response = await api.get<ParticipantResponse>(
    `/events/${eventId}/attendees`,
    {
      params: {
        pageIndex,
        query,
      },
    },
  )
  return response.data
}

export async function getParticipantBadge(attendeeId: string) {
  const response = await api.get<ParticipanteBadgeResponse>(
    `/attendees/${attendeeId}/badge`,
  )
  return response.data
}

export async function checkInAttendee(attendeeId: string) {
  const response = await api.get(`/attendees/${attendeeId}/check-in`)
  return response.status
}

export interface RemoveParticipantsQuery {
  attendeeIds: string[]
}

export async function removeParticipants(attendeeIds: string[]) {
  const response = await api.delete('/attendees', {
    data: {
      attendeeIds,
    },
  })
  return response.status
}
