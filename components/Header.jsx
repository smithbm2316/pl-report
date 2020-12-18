import HeaderIcon from './HeaderIcon';

const Header = ({ page, matchInfo, subtitle }) => {
  function getMatchday(direction) {
    const currentMatchday = parseInt(matchInfo.intRound);
    const currentSeason = matchInfo.strSeason;
    const [seasonBegin, seasonEnd] = currentSeason.split('-');
    // if direction is 'prev'
    if (direction === 'prev') {
      // if the currentMatchday is 1, then we want to go back a year to the last week
      if (currentMatchday === 1) {
        return `${parseInt(seasonBegin) - 1}-${parseInt(seasonEnd) - 1}-38`;
      }
      // else just go back a matchday
      else {
        return `${currentSeason}-${currentMatchday - 1}`;
      }
    }
    // if direction is 'next'
    else {
      // if we are on the last matchday, then go to first matchday of next season
      if (currentMatchday === 38) {
        return `${parseInt(seasonBegin) + 1}-${parseInt(seasonEnd) + 1}-1`;
      }
      // else just go forward a matchday
      else {
        return `${currentSeason}-${currentMatchday + 1}`;
      }
    }
  }
  return (
    <>
      {page === 'Today' || page === 'Table' ? (
        <header className="md:col-span-2 md:mt-4 2xl:col-span-3">
          <h1 className="my-2 text-laserwave-hotPink">PL Report</h1>
          <h2 className="my-2">{subtitle}</h2>
        </header>
      ) : (
        <header className="w-full md:col-span-2 md:mt-4 2xl:col-span-3">
          <h1 className="my-2 text-laserwave-hotPink">PL Report</h1>
          <div className="flex items-center justify-between ">
            <h2 className="flex items-center">{`${page} ${matchInfo.intRound}`}</h2>
            <div className="flex items-center justify-between">
              <HeaderIcon icon={'leftArrow'} route={getMatchday('prev')} />
              <HeaderIcon icon={'rightArrow'} route={getMatchday('next')} />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
