import Head from 'next/head';
import Layout from '../../components/Layout';
import HeaderIcon from '../../components/HeaderIcon';
import ScoreCard from '../../components/ScoreCard';
import { useRouter } from 'next/router';

const Gameweek = ({ matches }) => {
  const router = useRouter();
  const { matchday } = router.query;

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

  return (
    <>
      <Head>
        <title>Premier League Scores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <HeaderIcon
                icon={'leftArrow'}
                route={`${matches[0].utcDate.substring(0, 4)}-${
                  matches[0].matchday - 1
                }`}
              />
              <h1 className="text-2xl">PL Report</h1>
              <HeaderIcon
                icon={'rightArrow'}
                route={`${matches[0].utcDate.substring(0, 4)}-${
                  matches[0].matchday + 1
                }`}
              />
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
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { matchday } = query;
  const matchdayNum = matchday.split('-')[1];
  const res = await fetch(
    `https://api.football-data.org/v2/competitions/2021/matches?matchday=${matchdayNum}`,
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

export default Gameweek;
