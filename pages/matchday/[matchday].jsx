import Head from 'next/head';
import Layout from '../../components/Layout';
import Nav from '../../components/Nav';
import MatchList from '../../components/MatchList';
import Error404 from '../../components/Error404';

const Matchday = ({ matches }) => {
  return (
    <>
      <Head>
        <title>PL Report</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
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

export async function getServerSideProps({ query }) {
  const { matchday } = query;
  const [seasonBegin, seasonEnd, day] = matchday.split('-');
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/eventsround.php?id=4328&r=${day}&s=${seasonBegin}-${seasonEnd}`
  );
  const data = await res.json();
  return {
    props: { matches: data.events },
  };
}

export default Matchday;
