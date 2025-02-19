import { User } from "../store";

interface TableRowProps {
  row: User;
}

function TableRow({ row }: TableRowProps) {
  const cels = Object.values(row);
  const emailRegex = /\b[\w]+@[\w]+\b/g;

  return (
    <tr className="row">
      {cels.map((cel) => {
        return (
          <td key={`${Math.random()}-${cel}`}>
            {typeof cel === "string" && cel.match(emailRegex) ? (
              <a href={`mailto:${cel}`}>{cel}</a>
            ) : (
              <p className="cel">
                {" "}
                {typeof cel === "object" ? JSON.stringify(cel) : cel}
              </p>
            )}
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
