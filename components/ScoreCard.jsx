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
    <div className="w-full p-4 rounded-lg cursor-pointer bg-laserwave-night grid grid-cols-5 grid-rows-5 h-44 active:bg-laserwave-evening hover:bg-laserwave-evening">
      <p
        id="time"
        className="mx-auto mb-auto text-sm font-medium text-emerald-300 grid row-span-1 col-span-5 md:text-base"
      >
        {time}
      </p>
      <p className="my-auto mr-auto text-sm font-medium text-left grid row-span-3 col-span-2 md:text-base lg:font-semibold lg:pr-4">
        {homeTeam}
      </p>
      <p className="m-auto text-2xl font-bold grid row-span-3 col-span-1 lg:text-3xl">
        {homeScore === null && awayScore === null
          ? '⚽️'
          : `${homeScore} : ${awayScore}`}
      </p>
      <p className="my-auto ml-auto text-sm font-medium text-right grid row-span-3 col-span-2 md:text-base lg:font-semibold lg:pl-4">
        {awayTeam}
      </p>
      <p
        id="date"
        className="mx-auto mt-auto text-xs font-medium text-laserwave-blue grid row-span-1 col-span-5 md:font-medium md:text-sm"
      >
        {date}
      </p>
    </div>
  </Link>
);

export default ScoreCard;
