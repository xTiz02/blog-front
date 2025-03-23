import React, { useEffect, useState } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PostOrderDateBy, PostOrderType } from '@/model/model';

interface FilterProps {
  selectDate: PostOrderDateBy
  selectOrder: PostOrderType
}



type PaginationProps = {
  filter: FilterProps;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
};

function FilterPagination({
  filter,
  totalPages,
  paginationItemsToDisplay = 5,
  onPageChange,
}: PaginationProps) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
    //onChangeRange: (page) => {console.log("Se actualiza la página y rangos:", page)}
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleAddPageChange = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      const page = currentPage + 1;
      console.log("handleAddPageChange",page)
      onPageChange(page);
      setCurrentPage(page);
    }
  };

  const handleReducePageChange = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      const page = currentPage - 1;
      console.log("handleReducePageChange",page)
      onPageChange(page);
      setCurrentPage(page);
    }
  }

  const handlePageChange = (page: number,e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      console.log("handlePageChange",page)
      onPageChange(page);
      setCurrentPage(page);
    }
    
  }

  return (
    <Pagination>
      <PaginationContent className="inline-flex gap-0 -space-x-px rounded-lg border-2 shadow-sm shadow-black/5 rtl:space-x-reverse">
        <PaginationItem className="[&:first-child>a]:rounded-s-lg [&:last-child>a]:rounded-e-lg">
          <PaginationLink
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "rounded-none border-0 shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
            )}
            href="#"
            onClick={handleReducePageChange}
            aria-label="Go to previous page"
            aria-disabled={currentPage === 1}
          >
            <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>

        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationLink
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "pointer-events-none rounded-none border-0 shadow-none",
              )}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "rounded-none border-0 shadow-none focus-visible:z-10",
                page === currentPage && "bg-accent hover:bg-accent/80",
              )}
              href="#"
              onClick={(e) => handlePageChange(page,e)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showRightEllipsis && (
          <PaginationItem>
            <PaginationLink
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "pointer-events-none rounded-none border-0 shadow-none",
              )}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem className="[&:first-child>a]:rounded-s-lg [&:last-child>a]:rounded-e-lg">
          <PaginationLink
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "rounded-none border-0 shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
            )}
            href="#"
            onClick={handleAddPageChange}
            aria-label="Go to next page"
            aria-disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default FilterPagination;