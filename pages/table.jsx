import Head from 'next/head';
import Header from '../components/Header';
import Nav from '../components/Nav';

const Table = ({ table }) => (
  <>
    <Head>
      <title>PL Report: Table</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="w-11/12 mx-auto lg:w-5/6 xl:w-1024">
      <Header page="Table" subtitle="Premier League Table" />
      <table className="w-full my-4 text-sm text-left md:my-6">
        <thead className="text-sm font-medium sm:text-base md:font-semibold md:text-lg">
          <tr>
            <th className="w-8 py-1">#</th>
            <th className="py-1">Club</th>
            <th className="py-1">Points</th>
            <th className="py-1">GD</th>
            <th className="py-1">W</th>
            <th className="py-1">D</th>
            <th className="py-1">L</th>
          </tr>
        </thead>
        <tbody className="font-medium md:text-base">
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
                <td className="w-8">{teamInfo.position}</td>
                <td className="flex items-center py-1">
                  <img
                    className="w-8 h-auto mr-1 sm:w-10 sm:mr-4 md:w-12"
                    src={teamInfo.team.crestUrl}
                    alt={teamInfo.team.name}
                  />
                  <span className="px-1">{teamName}</span>
                </td>
                <td className="py-1">{teamInfo.points}</td>
                <td className="py-1">{teamInfo.goalDifference}</td>
                <td className="py-1">{teamInfo.won}</td>
                <td className="py-1">{teamInfo.draw}</td>
                <td className="py-1">{teamInfo.lost}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-20 sm:h-24"></div>
    </main>
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
