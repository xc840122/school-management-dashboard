const Pagination = async () => {
  return (
    <div className="flex justify-between items-center p-4 text-gray-500">
      <button disabled className="py-2 px-4 rounded-md bg-slate-200 
      font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed">
        Prev
      </button>
      <div className="flex justify-between items-center text-sm gap-2">
        <button className="px-2 rounded-sm bg-CSky">1</button>
        <button className="px-2 rounded-sm">2</button>
        <button className="px-2 rounded-sm">3</button>
        ...
        <button className="px-2 rounded-sm">10</button>
      </div>
      <button className="py-2 px-4 rounded-md bg-slate-200 
      font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  )
}

export default Pagination