import Head from 'next/head';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import MatchList from '../components/MatchList';
import ScoreCard from '../components/ScoreCard';

export default function Today({ liveMatches, matches }) {
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
          <Header page="Today" />
          {liveMatches.length > 0 &&
            liveMatches.map((match) => (
              <ScoreCard
                key={match.idEvent}
                homeTeam={match.strHomeTeam}
                homeScore={match.intHomeScore}
                awayTeam={match.strAwayTeam}
                awayScore={match.intAwayScore}
                date={'Live Now!'}
                time={match.strProgress + "'"}
                matchID={match.idEvent}
              />
            ))}
          <MatchList matches={matches} subtitle="Today" />
        </Layout>
      )}
      <Nav />
    </>
  );
}

export async function getServerSideProps() {
  // Get today's date and format it so it can be used in the request
  const todayDate = new Date();
  const today = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;

  // Request today's matches and pass the list of matches as props to the Home component above
  const todayRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/eventsday.php?d=${today}&l=English_Premier_League`
  );
  const todayData = await todayRes.json();

  // Request all live matches
  const liveRes = await fetch(
    `https://www.thesportsdb.com/api/v2/json/${process.env.SPORTS_DB_KEY}/livescore.php?s=Soccer`
  );
  const liveData = await liveRes.json();
  console.log(liveData);
  const premData = liveData.events.filter(
    (event) => parseInt(event.idLeague) === 4328
  );
  // If there is no live match data, then just return the events occurring today
  if (premData.length === 0) {
    return {
      props: { liveMatches: [], matches: todayData.events },
    };
  } else {
    return {
      props: { liveMatches: liveData.events, matches: todayData.events },
    };
  }
}
