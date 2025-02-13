import SearchBar from "@/components/SearchBar"

const TeacherList = async () => {
  return (
    <div className="flex-1 bg-white p-4 m-4 mt-0 rounded-md">
      {/* Top */}
      <div>
        <h1>All Teachers</h1>
        <div>
          <SearchBar />
        </div>
      </div>
      {/* List */}
      <div>List</div>
      {/* Pagination */}
      <div>Pagination</div>
    </div>
  )
}

export default TeacherList