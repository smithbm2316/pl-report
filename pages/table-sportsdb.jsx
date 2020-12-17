import Head from 'next/head';
import Layout from '../components/Layout';

const TableSportsDB = ({ table }) => (
  <>
    <Head>
      <title>PL Report: Table</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <h1 className="my-4 text-center">PL Table</h1>
      <table className="text-sm text-left">
        <thead>
          <tr>
            <th>Position</th>
            <th>Club</th>
            <th>Points</th>
            <th>GD</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          {table.map((teamInfo, index) => {
            return (
              <tr key={teamInfo.teamid}>
                <td>{index + 1}</td>
                <td>{teamInfo.name}</td>
                <td>{teamInfo.total}</td>
                <td>{teamInfo.goalsdifference}</td>
                <td>{teamInfo.win}</td>
                <td>{teamInfo.draw}</td>
                <td>{teamInfo.loss}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  </>
);

export async function getServerSideProps() {
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/lookuptable.php?l=4328&s=2020-2021`
  );
  const data = await res.json();
  return {
    props: { table: data.table },
  };
}

export default TableSportsDB;
