const Table = async <T,>({
  columns,
  renderRow,
  data,
}: {
  columns: ({
    header: string;
    accessor: string;
    className?: string;
  } | null)[];
  renderRow: (item: T) => React.ReactNode;
  data: T[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-gray-500 text-left text-sm">
          {columns.map((column) => (
            <th key={column?.accessor} className={column?.className}>
              {column?.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
