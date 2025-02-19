import useStore from "../store";

function PaginationControl() {
  const { users, displayCount, currentPage, prevPage, nextPage } = useStore();

  const totalPages = Math.ceil(users.length / displayCount);
  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        {" "}
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default PaginationControl;
