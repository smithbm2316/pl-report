import Head from 'next/head';
import Layout from '../components/Layout';
import HeaderIcon from '../components/HeaderIcon';
import ScoreCard from '../components/ScoreCard';

export default function Home({ matches }) {
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
    const currentMatchday = matches[0].matchday;
    const currentYear = matches[0].utcDate.substring(0, 4);
    // if direction is 'prev'
    if (direction === 'prev') {
      // if the currentMatchday is 1, then we want to go back a year to the last week
      if (currentMatchday === 1) {
        return `${parseInt(currentYear) - 1}-38`;
      }
      // else just go back a matchday
      else {
        return `${currentYear}-${currentMatchday - 1}`;
      }
    }
    // if direction is 'next'
    else {
      // check if the currently viewed year is the same as the current live season
      // if so, we want to redirect to a page that says 'sorry this is the future'
      // else, just move forward a matchday
      if (currentYear === matches[0].season.endDate.substring(0, 4)) {
        return 'future';
      } else {
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
      <Layout>
        {matches.length === 0 ? (
          <>
            <header>
              <h1 className="my-2 text-2xl text-center">PL Report</h1>
            </header>
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
            <p className="my-2 text-center text-gray-500">
              Matchday {matches[0].season.currentMatchday}
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
    </>
  );
}

export async function getServerSideProps() {
  const todayDate = new Date();
  const today = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;
  const res = await fetch(
    `https://api.football-data.org/v2/matches?competitions=PL&dateFrom=${today}&dateTo=${today}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.API_KEY,
      },
    }
  );
  const data = await res.json();
  const matches = data.matches;

  return {
    props: { matches },
  };
}
