import Head from 'next/head';
import Layout from '../components/Layout';
import Nav from '../components/Nav';

const Table = ({ table }) => (
  <>
    <Head>
      <title>PL Report: Table</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <h1 className="my-4 text-center">PL Table</h1>
      <table className="w-full text-sm text-left">
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
          {table.map((teamInfo) => {
            const name = teamInfo.team.name.replace(/FC/, '').trim().split(' ');
            let teamName;
            if (name.length >= 2 && name[1] !== 'United') {
              teamName = name.map((word) =>
                word.substring(0, 1).match(/\w/) ? word.substring(0, 1) : ''
              );
            } else {
              teamName = name[0].substring(0, 3).toUpperCase();
            }

            return (
              <tr key={teamInfo.team.id}>
                <td>{teamInfo.position}</td>
                <td className="flex items-center">
                  <img
                    className="w-8 h-8 px-1"
                    src={teamInfo.team.crestUrl}
                    alt={teamInfo.team.name}
                  />
                  <span className="px-1">{teamName}</span>
                </td>
                <td>{teamInfo.points}</td>
                <td>{teamInfo.goalDifference}</td>
                <td>{teamInfo.won}</td>
                <td>{teamInfo.draw}</td>
                <td>{teamInfo.lost}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
    <Nav />
  </>
);

export async function getServerSideProps() {
  const res = await fetch(
    'https://api.football-data.org/v2/competitions/2021/standings?standingType=TOTAL',
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_DATA_KEY,
      },
    }
  );
  const data = await res.json();
  const table = data.standings[0].table;
  return {
    props: { table },
  };
}

export default Table;
