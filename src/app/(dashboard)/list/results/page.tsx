import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearchBar from '@/components/TableSearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { currentUserId, role } from '@/lib/utils';

const columns = [
  {
    header: "Title",
    accessor: "title",
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
  role === 'admin' || role === 'teacher' ? {
    header: 'Actions',
    accessor: 'action',
  } : null,
];

export type ResultItem = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
} | null;

const ResultListPage = async ({ searchParams
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {

  // Get search params
  const { page, ...queryParams } = await searchParams;

  // Get page number
  const pageNumber = page ? parseInt(page) : 1;

  // Query params visiting condition
  const query: Prisma.ResultWhereInput = {};

  // URL params visiting condition
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }

    // Role condition
    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.OR = [
          { exam: { lesson: { teacherId: currentUserId ?? '' } } },
          { assignment: { lesson: { teacherId: currentUserId ?? '' } } },
        ]
        break;
      case "student":
        query.studentId = currentUserId ?? '';
        break;
      case "parent":
        query.student = { parentId: currentUserId ?? '' };
        break;
    }

    // Get data and count
    const [dataResponse, count] = await prisma.$transaction([
      prisma.result.findMany({
        // where: queryParams, //It doesn't limit params visiting according to roles and services
        where: query,
        include: {
          student: { select: { name: true, surname: true } },
          exam: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
          assignment: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (pageNumber - 1), // pagination,minimal page is 1 even no search params of page
      }),
      prisma.result.count({ where: query }),
    ]);

    // Merge the results of assignment and extm
    const data = dataResponse.map((item) => {

      // Get the assessment
      const assessment = item.exam || item.assignment;
      // If there is no assessment, return null
      if (!assessment) return null;
      // Check if the assessment is an exam (has a start time), an assignment otherwise (has a start date)
      const isExam = "startTime" in assessment;

      return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        score: item.score,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : assessment.startDate,
      };
    });

    // function to render the row
    const renderRow = (item: ResultItem) => (
      <tr
        key={item?.id}
        className="border-b border-gray-200 bg-slate-50 hover:bg-CPurpleLight"
      >
        <td className="p-4">{item?.title}</td>
        <td>{item?.studentName + " " + item?.studentSurname}</td>
        <td className="hidden md:table-cell">{item?.score}</td>
        <td className="hidden md:table-cell">
          {item?.teacherName + ' ' + item?.teacherSurname}</td>
        <td className="hidden md:table-cell">{item?.className}</td>
        <td className="hidden md:table-cell">
          {new Intl.DateTimeFormat('en-NZ').format(item?.startTime)}
        </td>
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
            {role === 'admin' || role === 'teacher' ? (
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
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* Pagination */}
        <Pagination currentPage={pageNumber} count={count} />
      </div>
    );
  };
};
export default ResultListPage;
