import Annoucements from "@/components/Annoucements"
import BigCalendar from "@/components/BigCalendar"
import PerformanceChart from "@/components/PerformanceChart"
import Image from "next/image"
import Link from "next/link"

const SingleTeacherPage = () => {
  return (
    <div className="flex flex-col flex-1 xl:flex-row p-4 gap-4">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* User Info Card */}
          <div className="flex flex-1 bg-CSky py-6 px-4 rouned-md">
            <div className="w-1/3">
              <Image
                src={"https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                alt="Portrait"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            {/* User Profiles */}
            <div className="flex flex-col justify-between w-2/3 gap-4">
              <h1 className="text-xl font-semibold">Peter Xu</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center justify-start gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src={"/images/blood.png"} alt="Blood" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="flex items-center justify-start gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src={"/images/date.png"} alt="Date" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center justify-start gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src={"/images/mail.png"} alt="Blood" width={14} height={14} />
                  <span>user@gmail.com+</span>
                </div>
                <div className="flex items-center justify-start gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src={"/images/phone.png"} alt="Phone" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>
          {/* Small Cards */}
          <div className="flex flex-1 justify-between flex-wrap gap-4">
            {/* Card */}
            <div className="flex gap-4 w-full rounded-md p-4 bg-white md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/images/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* Card */}
            <div className="flex gap-4 w-full rounded-md p-4 bg-white md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/images/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* Card */}
            <div className="flex gap-4 w-full rounded-md p-4 bg-white md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/images/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* Card */}
            <div className="flex gap-4 w-full rounded-md p-4 bg-white md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/images/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* Botton */}
        <div className="h-[800px] mt-4 p-4 bg-white rounded-md">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3 space-y-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex justify-start items-center flex-wrap gap-4 mt-4 text-gray-500">
            <Link
              className="p-3 rounded-md bg-CSkyLight"
              href="/list/teachers">Teacher&apos;s Classes</Link>
            <Link
              className="p-3 rounded-md bg-CPurpleLight"
              href="/list/students">Teacher&apos;s Students</Link>
            <Link
              className="p-3 rounded-md bg-CYellowLight"
              href="/list/lessons">Teacher&apos;s Lessons</Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href="/list/exams">Teacher&apos;s Exams</Link>
            <Link
              className="p-3 rounded-md bg-CSkyLight"
              href="/list/assignments">Teacher&apos;s Assignments</Link>
          </div>
        </div>
        <PerformanceChart />
        <Annoucements />
      </div>
    </div >
  )
}

export default SingleTeacherPage