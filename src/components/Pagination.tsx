import { FC } from 'react';

interface PaginationProps {
  pagination: {
    pages: number;
    prev: number | null;
    next: number | null;
  };
  page: number;
  changePage: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pagination, page, changePage }) => {
  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (pagination.pages <= 3) {
      for (let i = 1; i <= pagination.pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = page - 1;
      let endPage = page + 1;

      if (startPage <= 1) {
        startPage = 2;
        endPage = 3;
      } else if (endPage >= pagination.pages) {
        endPage = pagination.pages - 1;
        startPage = Math.max(2, endPage - 1);
      }

      if (startPage > 2) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < pagination.pages - 1) {
        pageNumbers.push('...');
      }
    }

    if (pagination.pages > 3) {
      pageNumbers.unshift(1);
      pageNumbers.push(pagination.pages);
    }

    return pageNumbers.map((pageNum, index) => (
      <span
        key={index}
        className={`pagination__page ${pageNum === page ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}
        onClick={() => typeof pageNum === 'number' && changePage(pageNum)}
      >
        {pageNum}
      </span>
    ));
  };

  return (
    <div className="pagination">
      <span className={`pagination__page ${pagination.prev === null ? 'disabled' : ''}`} onClick={() => changePage(page - 1)}>
        &laquo;
      </span>
      {renderPageNumbers()}
      <span className={`pagination__page ${pagination.next === null ? 'disabled' : ''}`} onClick={() => changePage(page + 1)}>
        &raquo;
      </span>
    </div>
  );
};

export default Pagination;