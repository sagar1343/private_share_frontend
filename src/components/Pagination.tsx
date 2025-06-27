import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
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
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="secondary"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
