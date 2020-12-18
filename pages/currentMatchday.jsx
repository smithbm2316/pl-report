import Head from 'next/head';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import MatchList from '../components/MatchList';
import Error404 from '../components/Error404';

const CurrentMatchday = ({ matches }) => {
  return (
    <>
      <Head>
        <title>PL Report: Current Matchday</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header page="Matchday" matchInfo={matches[0]} />
        {matches === null ? (
          <Error404 />
        ) : (
          <MatchList matches={matches} subtitle="Matchday" />
        )}
      </Layout>
      <Nav />
    </>
  );
};

export async function getServerSideProps() {
  // Request next 15 matches to find out the upcoming matchday and current season
  const currentRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/eventsnextleague.php?id=4328`
  );
  const currentData = await currentRes.json();
  // Extract current matchday and season into variables
  const day = currentData.events[0].intRound;
  const season = currentData.events[0].strSeason;
  // Request matches on current matchday
  const matchesRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/eventsround.php?id=4328&r=${day}&s=${season}`
  );
  const matchesData = await matchesRes.json();
  return {
    props: { matches: matchesData.events },
  };
}

export default CurrentMatchday;
