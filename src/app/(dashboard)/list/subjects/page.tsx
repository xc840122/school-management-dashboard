import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearchBar from '@/components/TableSearchBar';
import Image from 'next/image';
import { role } from '../../../../../public/data/data';
import FormModal from '@/components/FormModal';
import { Prisma, Subject, Teacher } from '@prisma/client';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { prisma } from '@/lib/prisma';

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
type SubjectItem = Subject & { teachers: Teacher[] };

const SubjectListPage = async ({ searchParams
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {

  // Get search params
  const { page, ...queryParams } = await searchParams;

  // Get page number
  const pageNumber = page ? parseInt(page) : 1;

  // Query params visiting condition
  const query: Prisma.SubjectWhereInput = {};

  // URL params visiting condition
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: 'insensitive' }
            break;
          default:
            break;
        }
      }
    }

    // fetch data and count from database
    const [data, count] = await prisma.$transaction([
      prisma.subject.findMany({
        // where: queryParams, //It doesn't limit params visiting according to roles and services
        where: query,
        include: {
          teachers: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (pageNumber - 1), // pagination,minimal page is 1 even no search params of page
      }),
      prisma.subject.count({ where: query }),
    ]);

    // function to render the row
    const renderRow = (item: SubjectItem) => (
      <tr
        key={item.id}
        className="border-b border-gray-200 bg-slate-50 hover:bg-CPurpleLight"
      >
        <td className="p-4">{item.name}</td>
        <td className="hidden md:table-cell">{item.teachers.map(teacher => teacher.name).join(',')}</td>
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
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* Pagination */}
        <Pagination currentPage={pageNumber} count={count} />
      </div>
    );
  };
};
export default SubjectListPage;
