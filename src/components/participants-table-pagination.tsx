import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ParticipantsTablePagination() {
  return (
    <div className="border border-l-0 border-r-0 border-b-0 border-t-[1px] flex items-center justify-between w-full p-2">
      <div>
        <p className="text-sm text-gray-500">
          Mostrando 1-10 de 100 participantes
        </p>
      </div>
      <Pagination className="flex-none text-right">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
