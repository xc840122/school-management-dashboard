import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearchBar from '@/components/TableSearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { role } from '../../../../../public/data/data';
import FormModal from '@/components/FormModal';
import { Grade, Student } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';

type StudentList = Student & { grade: Grade };

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Student ID',
    accessor: 'studentId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Grade',
    accessor: 'grade',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Address',
    accessor: 'address',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'action',
  },
];

const StudentListPage = async ({
  searchParams }: {
    searchParams: Promise<{ [key: string]: string }>;
  }) => {

  // Get page params (string)
  const { page } = await searchParams;

  // Convert to page number (number),if not carry page value, default value is 1
  const pageNumber = parseInt(page) || 1

  // fetch data and count from database
  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      include: {
        grade: true,
      },
      take: ITEM_PER_PAGE,
      skip: (pageNumber - 1) * ITEM_PER_PAGE,
    }),
    prisma.student.count(),
  ]);

  // function to render the row
  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 bg-slate-50 hover:bg-CPurpleLight"
    >
      <td className="flex item-center gap-4 p-4">
        <Image
          src={item.img || '/images/noAvatar.png'}
          alt="photo"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.grade.level}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={'/list/teachers/${teacher.id}'}>
            <button className="flex items-center justify-center rounded-full bg-CSky w-7 h-7">
              <Image
                src={'/images/view.png'}
                alt="View"
                width={16}
                height={16}
              />
            </button>
          </Link>
          {role === 'admin' ? (
            <FormModal table="student" type="delete" />
          ) : null}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 bg-white p-4 m-4 mt-0 rounded-md">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
              <FormModal table="student" type="create" />
            ) : null}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={students} />
      {/* Pagination */}
      <Pagination currentPage={pageNumber} count={count} />
    </div>
  );
};

export default StudentListPage;
