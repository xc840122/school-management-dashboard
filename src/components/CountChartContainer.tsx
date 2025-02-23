import Image from "next/image"
import CountChart from "./CountChart"
import { prisma } from "@/lib/prisma"

const CountChartContainer = async () => {

  const boys = await prisma.student.count({
    where: { sex: 'MALE' }
  });

  const girls = await prisma.student.count({
    where: { sex: 'FEMALE' }
  })

  const boysPercentage = Math.round(boys / (boys + girls) * 100);
  const girlsPercentage = Math.round(girls / (boys + girls) * 100);

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
      <CountChart boys={boys} girls={girls} />
      {/* Bottom */}
      <div className="flex justify-evenly">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-CSky rounded-full" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">{`Boys ${boysPercentage}%`}</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-CYellow rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">{`Girls ${girlsPercentage}%`}</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChartContainer