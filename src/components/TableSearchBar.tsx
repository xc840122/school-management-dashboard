import Image from 'next/image'
const SearchBar = async () => {
  return (
    // Search Bar ，ring doesn't have height weight, border has
    <div className="flex items-center w-full md:max-w-max space-x-2 
    text-xs rounded-full ring-[1.5px] ring-gray-300 " >
      <Image
        src="/images/search.png"
        alt="Search"
        width={14}
        height={14}
      />
      <input
        className="bg-transparent focus:outline-none w-52"
        type="text"
        placeholder="Search..." />
    </div>
  )
}

export default SearchBar