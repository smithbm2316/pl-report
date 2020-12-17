import HeaderIcon from './HeaderIcon';
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

  function getMatchday(direction) {
    const currentMatchday = parseInt(matches[0].intRound);
    const currentSeason = matches[0].strSeason;
    const [seasonBegin, seasonEnd] = currentSeason.split('-');
    // if direction is 'prev'
    if (direction === 'prev') {
      // if the currentMatchday is 1, then we want to go back a year to the last week
      if (currentMatchday === 1) {
        return `${parseInt(seasonBegin) - 1}-${parseInt(seasonEnd) - 1}-38`;
      }
      // else just go back a matchday
      else {
        return `${currentSeason}-${currentMatchday - 1}`;
      }
    }
    // if direction is 'next'
    else {
      // if we are on the last matchday, then go to first matchday of next season
      if (currentMatchday === 38) {
        return `${parseInt(seasonBegin) + 1}-${parseInt(seasonEnd) + 1}-1`;
      }
      // else just go forward a matchday
      else {
        return `${currentSeason}-${currentMatchday + 1}`;
      }
    }
  }

  return (
    <>
      <header className="flex items-center justify-between w-full">
        <HeaderIcon icon={'leftArrow'} route={getMatchday('prev')} />
        <h1>PL Report</h1>
        <HeaderIcon icon={'rightArrow'} route={getMatchday('next')} />
      </header>
      <p className="my-2 text-center text-gray-500">
        {subtitle === 'Today' ? 'Today' : `${subtitle} ${matches[0].intRound}`}
      </p>
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
            date={date}
            time={time}
            matchID={match.idEvent}
          />
        );
      })}
    </>
  );
};

export default MatchList;
