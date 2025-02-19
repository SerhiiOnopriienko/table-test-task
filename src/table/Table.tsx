import { User } from "../store";
import TableRow from "./TableRow";

interface PropsType {
  tableHeaders: string[];
  tableData: User[];
}

function Table({ tableHeaders, tableData }: PropsType) {
  return (
    <table>
      <thead className="tableheader">
        <tr>
          {tableHeaders.map((tableHeader) => {
            return (
              <th
                className="tableHeaderCel"
                key={`${Math.random()}-${tableHeader}`}
              >
                <p className="cel" key={`${Math.random()}-${tableHeader}`}>
                  {tableHeader}{" "}
                </p>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => {
          return <TableRow row={row} key={`${Math.random()}-${row.id}`} />;
        })}
      </tbody>
    </table>
  );
}

export default Table;
