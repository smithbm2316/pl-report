import Head from 'next/head';
import Layout from '../components/Layout';
import ScoreCard from '../components/ScoreCard';

export default function Home({ matches }) {
  return (
    <>
      <Head>
        <title>Premier League Scores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="my-4 text-center">PL Report</h1>
        {matches.length === 0 ? (
          <>
            <p className="mx-auto my-auto text-lg font-medium">
              No games today 😔
            </p>
          </>
        ) : (
          matches.map((match) => {
            return (
              <ScoreCard
                key={match.id}
                homeTeam={match.homeTeam.name}
                homeScore={
                  match.score.fullTime.homeTeam === null
                    ? 'N'
                    : match.score.fullTime.homeTeam
                }
                awayTeam={match.awayTeam.name}
                awayScore={
                  match.score.fullTime.awayTeam === null
                    ? 'N'
                    : match.score.fullTime.awayTeam
                }
                date={match.season.startDate}
                time={match.status}
              />
            );
          })
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    'https://api.football-data.org/v2/matches?competitions=PL',
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
