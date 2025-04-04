import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  count: number;
  currentPage: number;
  pageSize: number;
  handleNext: () => void;
  handlePrevious: () => void;
}

export default function Pagination({
  currentPage,
  count,
  handleNext,
  handlePrevious,
  pageSize,
}: Props) {
  const totalPage = Math.ceil(count / pageSize);
  return (
    <>
      {totalPage > 1 && (
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            className="cursor-pointer"
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </Button>
          <span>
            Page {currentPage} of {totalPage}
          </span>
          <Button
            variant="secondary"
            onClick={handleNext}
            disabled={currentPage === totalPage}
            className="cursor-pointer"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </>
  );
}
