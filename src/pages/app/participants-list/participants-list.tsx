import { AttendeeList } from '@/components/attendee-list';
import { Helmet } from 'react-helmet-async';
export function ParticipantsList(){
    return (
        <>
            <Helmet title="Dashboard" />
            <AttendeeList />
        </>
    )
}