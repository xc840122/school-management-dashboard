import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearchBar from '@/components/TableSearchBar';
import Image from 'next/image';
import { role, subjectsData } from '../../../../../public/data/data';
import FormModal from '@/components/FormModal';

export type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: 'Subject Name',
    accessor: 'name',
  },
  {
    header: 'Teachers',
    accessor: 'Teachers',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'action',
  },
];

const SubjectListPage = async () => {
  // function to render the row
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 bg-slate-50 hover:bg-CPurpleLight"
    >
      <td className="p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(',')}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === 'admin' ? (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          ) : null}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 bg-white p-4 m-4 mt-0 rounded-md">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
            {role === 'admin' ? (
              <FormModal table="subject" type="create" />
            ) : null}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SubjectListPage;
