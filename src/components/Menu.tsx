import Link from 'next/link';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';
type MenuItem = {
  title: string;
  items: {
    icon: string;
    label: string;
    href: string;
    visible: string[];
  }[];
};

const menuItems: MenuItem[] = [
  {
    title: 'MENU',
    items: [
      {
        icon: '/home.png',
        label: 'Home',
        href: '/',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/teacher.png',
        label: 'Teachers',
        href: '/list/teachers',
        visible: ['admin', 'teacher'],
      },
      {
        icon: '/student.png',
        label: 'Students',
        href: '/list/students',
        visible: ['admin', 'teacher'],
      },
      {
        icon: '/parent.png',
        label: 'Parents',
        href: '/list/parents',
        visible: ['admin', 'teacher'],
      },
      {
        icon: '/subject.png',
        label: 'Subjects',
        href: '/list/subjects',
        visible: ['admin'],
      },
      {
        icon: '/class.png',
        label: 'Classes',
        href: '/list/classes',
        visible: ['admin', 'teacher'],
      },
      {
        icon: '/lesson.png',
        label: 'Lessons',
        href: '/list/lessons',
        visible: ['admin', 'teacher'],
      },
      {
        icon: '/exam.png',
        label: 'Exams',
        href: '/list/exams',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/assignment.png',
        label: 'Assignments',
        href: '/list/assignments',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/result.png',
        label: 'Results',
        href: '/list/results',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/attendance.png',
        label: 'Attendance',
        href: '/list/attendance',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/calendar.png',
        label: 'Events',
        href: '/list/events',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/message.png',
        label: 'Messages',
        href: '/list/messages',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/announcement.png',
        label: 'Announcements',
        href: '/list/announcements',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
    ],
  },
  {
    title: 'OTHER',
    items: [
      {
        icon: '/profile.png',
        label: 'Profile',
        href: '/profile',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/setting.png',
        label: 'Settings',
        href: '/settings',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
      {
        icon: '/logout.png',
        label: 'Logout',
        href: '/logout',
        visible: ['admin', 'teacher', 'student', 'parent'],
      },
    ],
  },
];
const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <>
      <Link
        href={'/'}
        className="flex items-center justify-center lg:justify-start gap-2"
      >
        <Image src={'/images/logo.png'} alt={'logo'} width={32} height={32} />
        <span className="hidden lg:block font-bold">School Management</span>
      </Link>
      <div className="mt-4 text-sm">
        {menuItems.map((menu) => (
          <div className="flex flex-col gap-2" key={menu.title}>
            <h1 className="hidden lg:block text-gray-400 font-light my-4">
              {menu.title}
            </h1>
            <ul className="flex flex-col gap-4">
              {menu.items.map((item) =>
                item.visible.includes(role) ? (
                  <li className="py-2 md:px-2 hover:bg-CSky" key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-center lg:justify-start 
                    text-gray-500 space-x-4"
                    >
                      <Image
                        src={`/images${item.icon}`}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                      <span className="hidden lg:block">{item.label}</span>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
