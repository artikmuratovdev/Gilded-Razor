import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationType = {
  page: number;
  setPage: (page: number) => void;
  prev:boolean;
  next:boolean;
}
const Pagination = ({page, setPage, prev, next}: PaginationType) => {
  return (
    <div className='flex items-center justify-between p-3'>
      <PaginationComponent className='justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(page - 1)} disabled={!prev} />
        </PaginationItem>
        {prev && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page - 1)}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive={page === page} disabled={!prev}>
            {page}
          </PaginationLink>
        </PaginationItem>
        {next && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={() => setPage(page + 1)} disabled={!next} />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
    </div>
  );
};

export default Pagination;
