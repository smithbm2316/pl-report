import Head from 'next/head';
import Layout from '../../components/Layout';
import HeaderIcon from '../../components/HeaderIcon';
import ScoreCard from '../../components/ScoreCard';
import FutureError from '../../components/FutureError';
import RestrictedError from '../../components/RestrictedError';

const Matchday = ({ matches, errorCode }) => {
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
    const currentMatchday = parseInt(matches[0].matchday);
    const currentYear = parseInt(matches[0].season.startDate.substring(0, 4));
    // if direction is 'prev'
    if (direction === 'prev') {
      // if the currentMatchday is 1, then we want to go back a year to the last week
      if (currentMatchday === 1) {
        return `${currentYear - 1}-38`;
      }
      // else just go back a matchday
      else {
        return `${currentYear}-${currentMatchday - 1}`;
      }
    }
    // if direction is 'next'
    else {
      // if currentMatchday is the last one, then go to the next year's first matchday
      if (currentMatchday === 38) {
        return `${currentYear + 1}-1`;
      }
      // else, just move forward a matchday
      else {
        return `${currentYear}-${currentMatchday + 1}`;
      }
    }
  }

  return (
    <>
      <Head>
        <title>Premier League Scores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {errorCode !== 0 ? (
        <>
          {errorCode === 403 ? (
            <RestrictedError />
          ) : (
            <FutureError matches={matches} />
          )}
        </>
      ) : (
        <Layout>
          {matches.length === 0 ? (
            <>
              <p className="mx-auto my-auto text-lg font-medium">
                No games today 😔
              </p>
            </>
          ) : (
            <>
              <header className="flex items-center justify-between w-full">
                <HeaderIcon icon={'leftArrow'} route={getMatchday('prev')} />
                <h1 className="text-2xl">PL Report</h1>
                <HeaderIcon icon={'rightArrow'} route={getMatchday('next')} />
              </header>
              <p className="my-2 text-sm text-center text-gray-500">
                Matchday {matches[0].matchday}
              </p>
              {matches.map((match) => {
                const [time, date] = parseUTCDate(match.utcDate);
                return (
                  <ScoreCard
                    key={match.id}
                    homeTeam={match.homeTeam.name.replace(/FC/, '')}
                    homeScore={
                      match.score.fullTime.homeTeam === null
                        ? 'N'
                        : match.score.fullTime.homeTeam
                    }
                    awayTeam={match.awayTeam.name.replace(/FC/, '')}
                    awayScore={
                      match.score.fullTime.awayTeam === null
                        ? 'N'
                        : match.score.fullTime.awayTeam
                    }
                    date={date}
                    time={time}
                  />
                );
              })}
            </>
          )}
        </Layout>
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { matchday } = query;
  const [year, day] = matchday.split('-');
  const res = await fetch(
    `https://api.football-data.org/v2/competitions/2021/matches?season=${year}&matchday=${day}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.API_KEY,
      },
    }
  );
  const data = await res.json();

  if (Object.keys(data).includes('matches')) {
    return {
      props: { matches: data.matches, errorCode: 0 },
    };
  } else {
    console.log(data);
    const newRes = await fetch(
      `https://api.football-data.org/v2/competitions/PL/matches?matchday=38`,
      {
        method: 'GET',
        headers: {
          'X-Auth-Token': process.env.API_KEY,
        },
      }
    );
    const newData = await newRes.json();
    console.log(data.errorCode);
    return {
      props: {
        errorCode: data.errorCode || data.error,
        matches: newData.matches,
      },
    };
  }
}

export default Matchday;
