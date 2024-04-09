import { api } from "@/lib/axios";

export type Atteendee = {
    id: number,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string,
}

interface ParticipantResponse {
    attendees: Atteendee[],
    total: number    
}


export type AttendeeBadge = {
    name: string
    email: string
    eventTitle: string,
    checkInURL: string,
}

interface ParticipanteBadgeResponse {
    badge: AttendeeBadge
}

export interface ParticipantsQuery {
    eventId: string,
    pageIndex?: number | null,
    query?: string | null,
}

export async function getAttendees({
    eventId, pageIndex,query
}: ParticipantsQuery) {
    const response = await api.get<ParticipantResponse>(`/events/${eventId}/attendees`, {
        params: {
            pageIndex,
            query,
        }
    })
    return response.data
}

export async function getParticipantBadge({
     attendeeId
}: { attendeeId: number }) {
    const response = await api.get<ParticipanteBadgeResponse>(`/attendees/${attendeeId}/badge`)
    return response.data
}