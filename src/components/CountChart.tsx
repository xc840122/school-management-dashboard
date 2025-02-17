'use client';
import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count: 106,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 53,
    fill: '#C3EBFA',
  },
  {
    name: 'Boys',
    count: 53,
    fill: '#FAE27C',
  },
];

const CountChart = () => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4">
      {/* Title and button */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image
          src="/images/moreDark.png"
          alt="MoreDark"
          width={20}
          height={20}
        />
      </div>
      {/* Chart */}
      <div className="relative w-full h-3/4">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={'/images/maleFemale.png'}
          alt="MaleFemale"
          width={50}
          height={50}
        />
      </div>
      {/* Bottom */}
      <div className="flex justify-evenly">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-CSky rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-CYellow rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
