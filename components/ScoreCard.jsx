import Link from 'next/link';

const ScoreCard = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
  matchID,
}) => (
  <Link href={`/match/${matchID}`} passHref>
    <div className="w-full p-4 my-3 bg-gray-800 rounded-lg cursor-pointer grid grid-cols-5 grid-rows-5 h-44 active:bg-gray-700 hover:bg-gray-700">
      <p
        id="time"
        className="mx-auto mb-auto text-sm font-medium text-green-300 grid row-span-1 col-span-5"
      >
        {time}
      </p>
      <p className="my-auto mr-auto text-xs font-medium text-left grid row-span-3 col-span-2">
        {homeTeam}
      </p>
      <p className="m-auto text-2xl font-bold grid row-span-3 col-span-1">
        {homeScore === null && awayScore === null
          ? '⚽️'
          : `${homeScore} : ${awayScore}`}
      </p>
      <p className="my-auto ml-auto text-xs font-medium text-right grid row-span-3 col-span-2">
        {awayTeam}
      </p>
      <p
        id="date"
        className="mx-auto mt-auto text-xs font-medium text-gray-500 grid row-span-1 col-span-5"
      >
        {date}
      </p>
    </div>
  </Link>
);

export default ScoreCard;
