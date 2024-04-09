import { getAttendees } from "@/api/get-participansts";
import { CustomInput } from "@/components/CustomInput";

import { ParticipantsTableList } from "@/components/participants-table-list";
import { ParticipantsTablePagination } from "@/components/participants-table-pagination";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import { z } from "zod";
export function ParticipantsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const participantName = searchParams.get("participantName");
  // const eventId = searchParams.get("eventId");
  const eventId = "9e9bd979-9d10-4915-b339-3786b1634f33";

  const pageIndex = z.coerce
    .number()
    .transform((page) => (page < 1 ? 0 : page - 1))
    .parse(searchParams.get("page") ?? "0");

  const { data: result } = useQuery({
    queryKey: ["participants", pageIndex, eventId, participantName],
    queryFn: () =>
      getAttendees({
        eventId: eventId,
        pageIndex,
        query: participantName,
      }),
    staleTime: 10000,
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <CustomInput
          className="pl-10"
          name="search"
          placeholder="Buscar participante"
        />
      </div>
      <div className="rounded-md border overflow-hidden">
        <ParticipantsTableList attendees={result?.attendees} />
        {result && (
          <ParticipantsTablePagination
            pageIndex={pageIndex}
            totalCount={result.total}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </>
  );
}
