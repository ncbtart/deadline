interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages = 0,
  onPageChange,
}: PaginationProps) => {
  // Génère un tableau de numéros de page
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length < 2) return <></>;

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      {currentPage > 1 && (
        <li>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      )}

      {pageNumbers.map((number) =>
        number === currentPage ? (
          <li
            key={number}
            className="block h-8 w-8 rounded border-rose-600 bg-gradient-to-r from-rose-600 from-10% to-pink-800 text-center leading-8 text-white"
          >
            {number}
          </li>
        ) : (
          <li key={number}>
            <button
              className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        )
      )}

      {currentPage < totalPages && (
        <li>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      )}
    </ol>
  );
};

export default Pagination;
