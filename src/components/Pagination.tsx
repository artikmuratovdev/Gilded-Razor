import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationType = {
  page: number;
  setPage: (page: number) => void;
  prev: string | null;
  next: string | null;
};
const Pagination = ({ page, setPage, prev, next }: PaginationType) => {
  return (
    <div className="flex items-center justify-between p-3">
      <PaginationComponent className="justify-end">
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (prev) setPage(page - 1);
              }}
              disabled={prev === null}
              className={prev === null ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>
          {page > 2 && (
            <PaginationItem className="me-3">
              <PaginationLink onClick={() => setPage(1)}>{1}</PaginationLink>
            </PaginationItem>
          )}
          {prev && (
            <PaginationItem>
              <PaginationLink onClick={() => setPage(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive={page === page} disabled={!prev}>
              {page}
            </PaginationLink>
          </PaginationItem>
          {next && (
            <PaginationItem>
              <PaginationLink onClick={() => setPage(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
            <PaginationItem>
              <PaginationNext
                onClick={() => { if (next) setPage(page + 1); }}
                disabled={next === null}
                className={next === null ? 'opacity-50 pointer-events-none' : ''}
              />
            </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};

export default Pagination;
