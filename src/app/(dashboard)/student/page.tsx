import Annoucements from "@/components/Annoucements"
import BigCalendar from "@/components/BigCalendar"
import EventCalendar from "@/components/EventCalendar"


const StudentPage = async () => {
  return (
    <div className="flex flex-col min-h-screen xl:flex-row p-4 gap-4">
      {/* Left */}
      <div className="w-full xl:w-2/3 bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule (4A)</h1>
        <BigCalendar />
      </div>
      {/* Right */}
      <div className="flex flex-col gap-8 w-full lg:w-1/3">
        <EventCalendar />
        <Annoucements />
      </div>
    </div>
  )
}

export default StudentPage