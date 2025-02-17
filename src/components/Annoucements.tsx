// TEMPORARY
const annoucements = [
  {
    id: 1,
    title: 'Lorem ipsum dolor',
    date: '2025-01-01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    date: '2025-01-01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor',
    date: '2025-01-01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Annoucements = async () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-gray-400 text-xs">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {annoucements.map((annoucements) => (
          <div
            key={annoucements.id}
            className="bg-CPurpleLight first:bg-CSkyLight last:bg-CYellowLight p-4 rounded-md shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{annoucements.title}</h2>
              <span className="text-gray-400 bg-white text-sm rounded-md p-1">
                {annoucements.date}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {annoucements.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Annoucements;
