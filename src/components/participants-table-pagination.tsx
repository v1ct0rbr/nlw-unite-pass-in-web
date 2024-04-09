import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

const perPage = 10;

export function ParticipantsTablePagination({
  pageIndex,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;
  return (
    <div className="border border-l-0 border-r-0 border-b-0 border-t-[1px] flex items-center justify-between w-full p-2">
      <div>
        <p className="text-sm text-gray-500">
          Página {pageIndex + 1} de {pages}
        </p>
      </div>
      <Pagination className="flex-none text-right">
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst onClick={() => onPageChange(0)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(pageIndex - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(pageIndex + 1)}
            >
              {pageIndex}
            </PaginationNext>
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              onClick={() => onPageChange(pages - 1)}
            ></PaginationLast>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
