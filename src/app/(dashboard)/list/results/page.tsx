import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearchBar from '@/components/TableSearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { resultsData, role } from '../../../../../public/data/data';

export type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: string;
  date: string;
  score: number;
};

const columns = [
  {
    header: 'Subject Name',
    accessor: 'name',
  },
  {
    header: 'Student',
    accessor: 'student',
  },
  {
    header: 'Score',
    accessor: 'score',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Teacher',
    accessor: 'teacher',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Class',
    accessor: 'class',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'action',
  },
];

const ResultListPage = async () => {
  // function to render the row
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 bg-slate-50 hover:bg-CPurpleLight"
    >
      <td className="p-4">{item.subject}</td>
      <td>{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={'/list/teachers/${teacher.id}'}>
            <button className="flex items-center justify-center rounded-full bg-CSky w-7 h-7">
              <Image
                src={'/images/edit.png'}
                alt="Edit"
                width={16}
                height={16}
              />
            </button>
          </Link>
          {role === 'admin' ? (
            <button className="flex items-center justify-center rounded-full bg-CPurple w-7 h-7">
              <Image
                src={'/images/delete.png'}
                alt="Delete"
                width={16}
                height={16}
              />
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 bg-white p-4 m-4 mt-0 rounded-md">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearchBar />
          <div className="flex items-center gap-4">
            <button className="grid place-items-center w-8 h-8 bg-CYellow rounded-full">
              <Image
                src="/images/filter.png"
                width={14}
                height={14}
                alt="filter"
              />
            </button>
            <button className="grid place-items-center w-8 h-8 bg-CYellow rounded-full">
              <Image
                src="/images/sort.png"
                width={14}
                height={14}
                alt="filter"
              />
            </button>
            <button className="grid place-items-center w-8 h-8 bg-CYellow rounded-full">
              <Image
                src="/images/plus.png"
                width={14}
                height={14}
                alt="filter"
              />
            </button>
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={resultsData} />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default ResultListPage;
