import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

const perPage = 10

export function ParticipantsTablePagination({
  pageIndex,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
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
            <PaginationFirst
              size="sm"
              className="dark:text-white text-gray-700"
              disabled={pageIndex === 0}
              variant="outline"
              onClick={() => onPageChange(0)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              className="dark:text-white text-gray-700"
              variant="outline"
              disabled={pageIndex === 0}
              onClick={() => onPageChange(pageIndex - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              size="sm"
              className="dark:text-white text-gray-700"
              variant="outline"
              disabled={pageIndex === pages - 1}
              onClick={() => onPageChange(pageIndex + 1)}
            >
              {pageIndex}
            </PaginationNext>
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              size="sm"
              className="dark:text-white text-gray-700"
              variant="outline"
              disabled={pageIndex === pages - 1}
              onClick={() => onPageChange(pages - 1)}
            ></PaginationLast>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
