import Nav from '../../components/Nav';

const Match = ({ info, stats, homeImg, awayImg }) => {
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
      {info === null && stats === null ? (
        <main className="flex flex-col items-center justify-center w-screen h-screen px-4 text-center">
          <h2>Oops, something went wrong</h2>
          <p className="my-2 font-medium">
            We weren't able to load the data that you wanted to view for this
            match 😔
          </p>
        </main>
      ) : (
        <main className="w-11/12 mx-auto">
          <header className="mx-auto my-4 grid grid-rows-1 grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <img
                className="w-12 h-12 my-2"
                src={homeImg}
                alt={info.strHomeTeam}
              />
              <p>{info.strHomeTeam} </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="w-12 h-12 my-2"
                src={awayImg}
                alt={info.strAwayTeam}
              />
              <p>{info.strAwayTeam} </p>
            </div>
          </header>
          <section
            className="w-full my-4 text-gray-600 grid grid-rows-1 grid-cols-2"
            id="matchInfo"
          >
            <div className="flex flex-col items-center justify-center">
              <p>{parseUTCDate(info.strTimestamp)[0]}</p>
              <p>{parseUTCDate(info.strTimestamp)[1]}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{info.strVenue}</p>
            </div>
          </section>
          <section className="stats">
            {stats === null ? (
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-medium">Match data was not found 😔</p>
              </div>
            ) : (
              stats.map((stat) => (
                <div className="flex justify-between" key={stat.idStatistic}>
                  <p>{stat.intHome}</p>
                  <p>{stat.strStat}</p>
                  <p>{stat.intAway}</p>
                </div>
              ))
            )}
          </section>
        </main>
      )}
      <Nav />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { matchID } = query;
  // Request match information
  const infoRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/lookupevent.php?id=${matchID}`
  );
  const infoData = await infoRes.json();

  // Request match stats
  const statsRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_PUB_KEY}/lookupeventstats.php?id=${matchID}`
  );
  const statsData = await statsRes.json();

  // Request home team data to get image art
  const homeTeamRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/lookupteam.php?id=${infoData.events[0].idHomeTeam}`
  );
  const homeTeamData = await homeTeamRes.json();

  // Request away team data to get image art
  const awayTeamRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/lookupteam.php?id=${infoData.events[0].idAwayTeam}`
  );
  const awayTeamData = await awayTeamRes.json();

  return {
    props: {
      info: infoData.events[0],
      stats: statsData.eventstats,
      homeImg: `${homeTeamData.teams[0].strTeamBadge}/preview`,
      awayImg: `${awayTeamData.teams[0].strTeamBadge}/preview`,
    },
  };
}

export default Match;
