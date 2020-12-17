import Head from 'next/head';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import MatchList from '../components/MatchList';

export default function Today({ matches }) {
  return (
    <>
      <Head>
        <title>PL Report: Today's Matches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {matches === null ? (
        <main className="h-screen">
          <header>
            <h1 className="my-4 text-center">PL Report</h1>
          </header>
          <div className="flex items-center justify-center text-lg font-medium h-5/6">
            <p>No games today 😔</p>
          </div>
        </main>
      ) : (
        <Layout>
          <MatchList matches={matches} subtitle="Today" />
        </Layout>
      )}
      <Nav />
    </>
  );
}

export async function getServerSideProps() {
  /*
   * Without paying for the api, this way works for getting today's matches
  const next15 = await fetch(
    ` https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/eventsnextleague.php?id=4328`
  );
  const next15Data = await next15.json();
  const { intRound, strSeason } = next15Data.events[0];
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/eventsround.php?id=4328&r=${intRound}&s=${strSeason}`
  );
  */

  // Get today's date and format it so it can be used in the request
  const todayDate = new Date();
  const today = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;

  // Request today's matches and pass the list of matches as props to the Home component above
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/eventsday.php?d=${today}&l=English_Premier_League`
  );
  const data = await res.json();
  return {
    props: { matches: data.events },
  };
}
