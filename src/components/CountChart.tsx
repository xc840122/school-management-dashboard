'use client';
import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const CountChart = ({
  boys = 0, girls = 0 }:
  {
    boys: number, girls: number
  }) => {

  const data = [
    {
      name: 'Total',
      count: boys + girls,
      fill: 'white',
    },
    {
      name: 'Girls',
      count: girls,
      fill: '#C3EBFA',
    },
    {
      name: 'Boys',
      count: boys,
      fill: '#FAE27C',
    },
  ];
  return (
    <div className="relative w-full h-3/4" >
      {/* Count Chart */}
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
      </ResponsiveContainer >
      <Image
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={'/images/maleFemale.png'}
        alt="MaleFemale"
        width={50}
        height={50}
      />
    </div >
  );
};

export default CountChart;
