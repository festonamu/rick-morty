const Pagination = ({ pagination, page, changePage }) => {
  return (
    <div className="pagination">
      <span className={`${pagination.prev === null ? 'disabled' : ''}`} onClick={() => changePage(page - 1)}>
        &laquo;
      </span>
      {Array.from({ length: pagination.pages }, (_, index) => index + 1).map(p => (
        <span className={`${p === page ? 'active' : ''}`} key={p} onClick={() => changePage(p)}>
          {p}
        </span>
      ))}
      <span className={`${pagination.next === null ? 'disabled' : ''}`} onClick={() => changePage(page + 1)}>
        &raquo;
      </span>
    </div>
  );
};

export default Pagination;