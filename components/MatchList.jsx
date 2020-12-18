import ScoreCard from './ScoreCard';

const MatchList = ({ matches, subtitle }) => {
  function parseUTCDate(utcDate) {
    const date = new Date(utcDate);
    const hours24 = date.getHours();
    const hours = hours24 >= 13 ? hours24 - 12 : hours24;
    const minutes =
      date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    const timeStr = `${hours === 0 ? 12 : hours}:${minutes}${
      hours24 <= 11 ? 'am' : 'pm'
    }`;
    const dateStr = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return [timeStr, dateStr];
  }

  function parseMatchdayDates(startDate, endDate) {
    const startList = startDate.match(/(\d*)-(\d*)-(\d*)/m);
    const endList = endDate.match(/(\d*)-(\d*)-(\d*)/m);
    return `${startList[2]}/${startList[3]}/${startList[1]} - ${endList[2]}/${endList[3]}/${endList[1]}`;
  }

  return (
    <>
      {subtitle !== 'Today' && (
        <p className="my-2 text-center text-gray-500">
          {parseMatchdayDates(
            matches[0].dateEvent,
            matches[matches.length - 1].dateEvent
          )}
        </p>
      )}
      {matches.map((match) => {
        const [time, date] = parseUTCDate(match.strTimestamp);
        return (
          <ScoreCard
            key={match.idEvent}
            homeTeam={match.strHomeTeam}
            homeScore={match.intHomeScore}
            awayTeam={match.strAwayTeam}
            awayScore={match.intAwayScore}
            status={match.strStatus}
            date={subtitle == 'Today' ? subtitle : date}
            time={time}
            matchID={match.idEvent}
          />
        );
      })}
    </>
  );
};

export default MatchList;
