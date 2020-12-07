const ScoreCard = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
}) => (
  <div className="w-full p-4 my-4 bg-gray-800 rounded-lg grid grid-cols-5 grid-rows-5 h-44">
    <p
      id="date"
      className="mx-auto mb-auto text-xs font-medium text-gray-500 grid row-span-1 col-span-5"
    >
      {date}
    </p>
    <p className="my-auto mr-auto text-xs font-medium grid row-span-3 col-span-2">
      {homeTeam}
    </p>
    <p className="m-auto text-3xl font-bold grid row-span-3 col-span-1">
      {homeScore}:{awayScore}
    </p>
    <p className="my-auto ml-auto text-xs font-medium grid row-span-3 col-span-2">
      {awayTeam}
    </p>
    <p
      id="time"
      className="mx-auto mt-auto text-sm font-medium text-green-300 grid row-span-1 col-span-5"
    >
      {time}
    </p>
  </div>
);

export default ScoreCard;
