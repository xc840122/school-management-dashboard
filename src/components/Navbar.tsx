import Image from "next/image"

const Navbar = async () => {
  return (
    <nav className="flex items-center justify-between p-4">
      {/* Search Bar ，ring doesn't have height weight, border has*/}
      <div className="hidden md:flex items-center space-x-2 text-xs rounded-full ring-[1.5px] ring-gray-300">
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
      {/* Icons and User */}
      <div className="flex items-center justify-end w-full space-x-6">
        <div className="flex justify-center items-center 
        rounded-full w-7 h-7 cursor-pointer bg-white">
          <Image
            src="/images/message.png"
            alt="Message"
            width={20}
            height={20}
          />
        </div>
        <div className="flex justify-center items-center 
        rounded-full w-7 h-7 cursor-pointer bg-white relative">
          <Image
            src="/images/announcement.png"
            alt="Announcement"
            width={20}
            height={20}
          />
          <div className="grid place-items-center absolute -top-3 -right-3 w-5 h-5 
          text-center bg-purple-500 rounded-full text-xs text-white">1</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Peter Xu</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <Image
          className="rounded-full"
          src="/images/avatar.png"
          alt="Avatar"
          width={36}
          height={36}
        />
      </div >
    </nav>
  )
}

export default Navbar