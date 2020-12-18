import Nav from '../../components/Nav';

const Match = ({ info, stats, homeLineup, awayLineup, homeImg, awayImg }) => {
  function parseUTCDate(utcDate) {
    const date = new Date(utcDate);
    const dateStr = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return dateStr;
  }

  function parseUTCTime(utcDate) {
    const date = new Date(utcDate);
    const hours24 = date.getHours();
    const hours = hours24 >= 13 ? hours24 - 12 : hours24;
    const minutes =
      date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    const timeStr = `${hours === 0 ? 12 : hours}:${minutes}${
      hours24 <= 11 ? 'am' : 'pm'
    }`;
    return timeStr;
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
          <header className="mx-auto my-6 grid grid-cols-3">
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 my-2"
                src={homeImg}
                alt={info.strHomeTeam}
              />
              <p className="flex-wrap text-center">{info.strHomeTeam} </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-3xl font-bold">
                <span
                  className={
                    parseInt(info.intHomeScore) > parseInt(info.intAwayScore)
                      ? 'text-pink-400'
                      : 'text-gray-100'
                  }
                >
                  {info.intHomeScore}
                </span>
                <span> : </span>
                <span
                  className={
                    parseInt(info.intAwayScore) > parseInt(info.intHomeScore)
                      ? 'text-pink-400'
                      : 'text-gray-100'
                  }
                >
                  {info.intAwayScore}
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 my-2"
                src={awayImg}
                alt={info.strAwayTeam}
              />
              <p className="flex-wrap text-center">{info.strAwayTeam} </p>
            </div>
          </header>
          <section
            className="flex flex-col items-center justify-center w-full my-6 text-gray-600"
            id="matchInfo"
          >
            <p>{parseUTCTime(info.strTimestamp)}</p>
            <p>{parseUTCDate(info.strTimestamp)}</p>
            <p>{info.strVenue}</p>
          </section>
          {homeLineup.length > 0 && awayLineup.length > 0 && (
            <section className="my-6 text-xs xs:text-sm grid grid-cols-2">
              <h3 className="mb-1 text-center col-span-2">Lineups</h3>
              <div>
                {homeLineup.map((player) => (
                  <div
                    key={player.idPlayer}
                    className="py-1 grid"
                    style={{ gridTemplateColumns: '2rem 1fr' }}
                  >
                    <p>{player.intSquadNumber}</p>
                    <p>{player.strPlayer}</p>
                  </div>
                ))}
              </div>
              <div className="text-right">
                {awayLineup.map((player) => (
                  <div
                    key={player.idPlayer}
                    className="py-1 grid "
                    style={{ gridTemplateColumns: '1fr 2rem' }}
                  >
                    <p>{player.strPlayer}</p>
                    <p>{player.intSquadNumber}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {stats === null ? (
            <section className="flex flex-col items-center justify-center my-6 text-center">
              <p className="font-medium">
                Match stats not available yet, check back again later!
              </p>
            </section>
          ) : (
            <section>
              <h3 className="mb-1 text-center">Match Stats</h3>
              {stats.map((stat) => (
                <div
                  className="flex justify-between text-xs xs:text-sm"
                  key={stat.idStatistic}
                >
                  <p>{stat.intHome}</p>
                  <p>{stat.strStat}</p>
                  <p>{stat.intAway}</p>
                </div>
              ))}
            </section>
          )}
          <div className="h-20 sm:h-24"></div>
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
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/lookupeventstats.php?id=${matchID}`
  );
  const statsData = await statsRes.json();

  const lineupRes = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_KEY}/lookuplineup.php?id=${matchID}`
  );
  const lineupData = await lineupRes.json();
  console.log(lineupData);

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
      homeLineup:
        lineupData.lineup === null || lineupData.lineup.length === 0
          ? []
          : lineupData.lineup.slice(0, 11),
      awayLineup:
        lineupData.lineup === null || lineupData.lineup.length === 0
          ? []
          : lineupData.lineup.slice(11),
      homeImg: `${homeTeamData.teams[0].strTeamBadge}`,
      awayImg: `${awayTeamData.teams[0].strTeamBadge}`,
    },
  };
}

export default Match;
