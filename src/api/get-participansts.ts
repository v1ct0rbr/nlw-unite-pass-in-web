import { api } from "@/lib/axios";

interface ParticipantResponse {
    id: number,
    name: string,
    email: string,
    createdAt: Date,
    checkedInAt: Date,
}

export interface ParticipantsQuery {
    eventId: number,
    pageIndex?: number | null,
    query?: string | null,
}

export async function getAttendees({
    eventId, pageIndex,query
}: ParticipantsQuery) {
    const response = await api.get<ParticipantResponse[]>(`/events/${eventId}/participants`, {
        params: {
            pageIndex,
            query,
        }
    })
    return response.data
}