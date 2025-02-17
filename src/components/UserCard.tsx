import Image from 'next/image';

const UserCard = async ({ schoolRole }: { schoolRole: string }) => {
  return (
    <div className="rounded-2xl odd:bg-CPurple even:bg-CYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-green-600 bg-white px-2 py-1 rounded-full">
          2024/25
        </span>
        <Image src={'/images/more.png'} alt="More" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">
        {schoolRole}s
      </h2>
    </div>
  );
};

export default UserCard;
