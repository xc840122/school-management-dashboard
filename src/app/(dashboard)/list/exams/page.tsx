import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearchBar from '@/components/TableSearchBar';
import Image from 'next/image';
import FormModal from '@/components/FormModal';
import { Exam, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { currentUserId, role } from '@/lib/utils';

const columns = [
  {
    header: 'Subject Name',
    accessor: 'name',
  },
  {
    header: 'Class',
    accessor: 'class',
  },
  {
    header: 'Teacher',
    accessor: 'teacher',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  role === 'admin' || role === 'teacher' ? {
    header: 'Actions',
    accessor: 'action',
  } : null,
];

export type ExamItem = Exam & {
  lesson: {
    subject: { name: string },
    class: { name: string },
    teacher: { name: string, surname: string },
  }
};

const ExamListPage = async ({ searchParams
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {

  // Get search params
  const { page, ...queryParams } = await searchParams;

  // Get page number
  const pageNumber = page ? parseInt(page) : 1;

  // Query params visiting condition
  const query: Prisma.ExamWhereInput = {};

  query.lesson = {};

  // URL params visiting condition
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: 'insensitive' }
            };
            break;
          default:
            break;
        }
      }
    }
  };

  // Role condition
  switch (role) {
    case 'admin':
      break;
    case 'teacher':
      query.lesson.teacherId = currentUserId ?? '';
      break;
    case 'student':
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId ?? ''
          }
        }
      };
      break;
    case 'parent':
      query.lesson.class = {
        students: {
          some: {
            parentId: currentUserId ?? ''
          }
        }
      };
    default:
      break;
  }

  // fetch data and count from database
  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      // where: queryParams, //It doesn't limit params visiting according to roles and services
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1), // pagination,minimal page is 1 even no search params of page
    }),
    prisma.exam.count({ where: query }),
  ]);
  // function to render the row
  const renderRow = (item: ExamItem) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 bg-slate-50 hover:bg-CPurpleLight"
    >
      <td className="p-4">{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name + ' ' + item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-NZ").format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === 'admin' || role === 'teacher' ? (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
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
            {role === 'admin' ? <FormModal table="exam" type="create" /> : null}
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
export default ExamListPage;
