import React, { useState } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   //onPageChange: (page: number) => void;
// }
// function FilterPagination({
//   currentPage,
//   totalPages,
// }: PaginationProps) {
//     //const [currentPage, setCurrentPage] = useState(1);
//     const navigate = useNavigate();

//     const onPageChange = (page: number) => {
//       const searchParams = new URLSearchParams(location.search)
//       if(searchParams.get("page") && (parseInt(searchParams.get("page")!) === page)) {
//         return;
//       }
//       searchParams.set("page", page.toString());
//       //setCurrentPage(page);
//       navigate(`?${searchParams.toString()}`)
//     }
//   return (
//     <Pagination>
//     <PaginationContent>
//       <PaginationItem>
//           <PaginationPrevious onClick={() => {
            
//             navigate("?page=3")}
//             } />
//       </PaginationItem>
//       {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//         <PaginationItem key={page}>
//           <PaginationLink
//             onClick={() => onPageChange(page)}
//             isActive={currentPage === page}
//           >
//             {page + ":" +currentPage}
//           </PaginationLink>
//         </PaginationItem>
//       ))}
//       <PaginationItem>
//         <PaginationNext onClick={() => {navigate("?page=3")}} />
//       </PaginationItem>
//     </PaginationContent>
//   </Pagination>
//   )
// }

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
};

function FilterPagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  onPageChange,
}: PaginationProps) {
  
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  const handlePageChange = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      console.log(page)
      onPageChange(page);
    }
  };

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
            onClick={handlePageChange(currentPage - 1)}
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
              onClick={handlePageChange(page)}
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
            onClick={handlePageChange(currentPage + 1)}
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