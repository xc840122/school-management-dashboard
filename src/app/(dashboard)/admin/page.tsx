import CountChart from "@/components/CountChart"
import UserCard from "@/components/UserCard"

const AdminPage = async () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left */}
      <div className="flex flex-col gap-8 w-full lg:w-2/3">
        {/* UserCards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard schoolRole="student" />
          <UserCard schoolRole="teacher" />
          <UserCard schoolRole="parent" />
          <UserCard schoolRole="staff" />
        </div>
        {/* Middle charts */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Count chart */}
          <div className="w-full lg:w-1/3 h-[450px] rounded-2xl">
            <CountChart />
          </div>
          {/* Attendence chart */}
          <div className="w-full lg:w-2/3 h-[450px] rounded-2xl">

          </div>
        </div>
        {/* Bottom chart */}
        <div></div>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3"></div>
    </div>
  )
}

export default AdminPage