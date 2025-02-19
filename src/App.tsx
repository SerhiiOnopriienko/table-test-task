import { useEffect } from "react";
import useStore from "./store";
import Table from "./table/Table";
import "./styles.css";
import PaginationControl from "./table/PaginationControl";

function App() {
  const {
    users,
    fetchUsers,
    sortUsersFromBigger,
    sortUsersFromLower,
    displayCount,
    setDisplayCount,
    currentPage,
  } = useStore();
  const tableHeaders = users.length > 0 ? Object.keys(users[0]) : [];
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const startIndex = (currentPage - 1) * displayCount;
  const paginatedUsers = users.slice(startIndex, startIndex + displayCount);

  return (
    <>
      <div className="tableControl">
        <div>
          <button onClick={sortUsersFromLower}>&uarr;</button>
          <button onClick={sortUsersFromBigger}>&darr;</button>
        </div>
        <div>
          <label htmlFor="userCount">Show: </label>
          <select
            id="userCount"
            value={displayCount}
            onChange={(e) => setDisplayCount(Number(e.target.value))}
          >
            <option value={5}>5 Users</option>
            <option value={10}>10 Users</option>
          </select>
        </div>
      </div>
      <Table tableHeaders={tableHeaders} tableData={paginatedUsers} />
      <PaginationControl />
    </>
  );
}

export default App;
