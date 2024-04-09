import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex justify-end", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/* type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">; */

  interface PaginationButtonProps extends ButtonProps {} 

/* const PaginationLink = ({
  className,
  isActive,
  
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    role="button"
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink"; */
const PaginationButton = ({
  className,
  disabled,
  variant,
  size = "icon",
  ...props
}: PaginationButtonProps) => (
  <Button
    disabled={disabled}
   
    className={cn(
      buttonVariants({
        variant: variant,
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationButton.displayName = "PaginationLink";

const PaginationFirst = ({
  className,
  
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    
    aria-label="Go to first page"
    size="default"
    className={cn("", className)}
    {...props}
  >
    <ChevronsLeft className="h-4 w-4" />    
  </PaginationButton>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to last page"
    size="default"
    className={cn("", className)}
    {...props}
  >
    <ChevronsRight className="h-4 w-4" />
  </PaginationButton>
);

PaginationLast.displayName = "PaginationLast";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn("", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    
  </PaginationButton>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    size="default"
    className={cn("", className)}
    {...props}
  >
       <ChevronRight className="h-4 w-4" />
  </PaginationButton>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton as PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast
};
